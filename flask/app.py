from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import subprocess
import ast
import os
from datetime import datetime


# Access environment variables
pma_host = os.environ.get('PMA_HOST', 'localhost')
pma_port = os.environ.get('PMA_PORT', 3306)
mysql_password = os.environ.get('MYSQL_ROOT_PASSWORD', 'admin')



app = Flask(__name__)
CORS(app, origins='*')
BASE_OXYGEN_SHALLOWS = 0
BASE_OXYGEN_MID = 20
BASE_OXYGEN_DEEP = 40

app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://root:{mysql_password}@{pma_host}:{pma_port}/test'
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Change this in production

db = SQLAlchemy(app)
jwt = JWTManager(app)

class User (db.Model):
    __tablename__ = 'users'  # This explicitly sets the table name to 'users'
    
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)    
    password = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    games = db.relationship('Game', backref='player', lazy=True)
    
    def __init__(self, name, password, age):        
        self.name = name
        self.password = generate_password_hash(password)
        self.age = age
    
    def __str__(self):
        return f"User(ID: {self.user_id}, Name: {self.name}, Age: {self.age})"
class Game (db.Model):
    __tablename__ = 'games'
        
    game_id = db.Column(db.Integer, primary_key=True)    
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)    
    score = db.Column(db.Integer)
    risk_score = db.Column(db.Integer)
    zone1_duration = db.Column(db.Time)
    zone2_duration = db.Column(db.Time)
    zone3_duration = db.Column(db.Time)
    time_played = db.Column(db.Date)
    
    def __init__(self, user_id, score, risk_score, zone1_duration, zone2_duration, zone3_duration, time_played):                
        self.score = score
        self.user_id = user_id
        self.risk_score = risk_score
        self.zone1_duration = zone1_duration
        self.zone2_duration = zone2_duration
        self.zone3_duration = zone3_duration
        self.time_played = time_played
        
with app.app_context():
    db.create_all()
    
@app.route('/login', methods=['POST'])
def login():
    global logged_in_user
    data = request.get_json()
    print('request: ', data)
    user = User.query.filter_by(name=data['usermail']).first()
    if user and check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.user_id)
        logged_in_user = user
        print('login: ',user)
        return jsonify({
            'access_token': access_token,
            'user_name': user.name
            }), 200    
    return jsonify({"msg": "Bad username or password"}), 401
    
@app.route('/users', methods=['GET'])
async def get_users():
    users = User.query.all() 
    return jsonify([{ 'id':user.user_id, 'name': user.name, 'age': user.age } for user in users])

@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.get_json()  # Get JSON data from the request
    new_user = User(name=data['userName'], age=data['age'], password=data['password'])  # Create a new User instance
    db.session.add(new_user)  # Add the user to the session
    db.session.commit()  # Commit the session to save the user to the database
    access_token = create_access_token(identity=new_user.user_id)
    logged_in_user = new_user        
    return jsonify({
        'access_token': access_token,
        'user_name': new_user.name
        }), 201
    

@app.route('/delete_user', methods=['DELETE'])
@jwt_required()
def delete_user():
    current_user = get_jwt_identity()    
    user = db.session.get(User, current_user)  # Query the user by ID
    if current_user is None:
        return jsonify({'error': 'User not authenticated'}), 401  # Check if user is authenticated
    if user:
        db.session.delete(user)  # Delete the user from the session
        db.session.commit()  # Commit the session to save changes
        return jsonify({'message': 'User deleted successfully'}), 200
    return jsonify({'error': 'User not found'}), 404

@app.route('/start_game', methods=['GET'])
@jwt_required()
async def start_game():    
    try:       
        # Execute the game file (game_take_8.py)
        result = subprocess.run(['python', 'game_v3.0.py'], capture_output=True, text=True) 
        print('line114: ', result.stdout.splitlines()[2:])
        lines = result.stdout.splitlines()
        data = ast.literal_eval("\n".join(lines[2:]))
        print('line117: ', data)  
        for game in data:
            risk_score=0
            for zone_event in game['entered_zones']:
                for zone_name, oxygen in zone_event.items():                    
                    if(zone_name=='ShallowEnter'):
                        risk_score+=100-oxygen
                    elif(zone_name=='MidEntered'):
                        risk_score+=2*(100-oxygen)
                    elif(zone_name=='DeepEntered'):
                        risk_score+=3*(100-oxygen)
                    # base level is placeholder for a safe amount of oxygen to return to the surface
                    elif(zone_name=='ShallowExit'):
                        if (oxygen<BASE_OXYGEN_SHALLOWS):
                            risk_score+=150
                        else:
                            risk_score+=1/((oxygen-BASE_OXYGEN_SHALLOWS)/100)
                    elif(zone_name=='MidExit'):
                        if (oxygen<BASE_OXYGEN_MID):
                            risk_score+=300
                        else:
                            risk_score+=2/((oxygen-BASE_OXYGEN_MID)/100)
                    else :
                        if (oxygen<BASE_OXYGEN_MID):
                            risk_score+=500
                        else:
                            risk_score+=3/((oxygen-BASE_OXYGEN_DEEP)/100)
            print('risk_score: ', risk_score)
            print('data["time_spent_in_zones"]["Shallow"]: ', game['time_spent_in_zones']['Shallow'])
            print('data["time_spent_in_zones"]["Mid"]: ', game['time_spent_in_zones']['Mid'])
            print('data["time_spent_in_zones"]["Deep"]: ', game['time_spent_in_zones']['Deep'])
            print(get_jwt_identity())
            current_user = get_jwt_identity()
            new_game = Game(
                user_id=current_user, 
                score=game['score'], 
                risk_score=risk_score, 
                zone1_duration=game['time_spent_in_zones']['Shallow'], 
                zone2_duration=game['time_spent_in_zones']['Mid'], 
                zone3_duration=game['time_spent_in_zones']['Deep'],
                time_played=game['time_played']
                )
            db.session.add(new_game)
            db.session.commit()
        
        """ amountPlayed = len(result.stdout.splitlines()[2:])                      
        games = []
        for score in result.stdout.splitlines()[2:]:
            new_game = Game(timePlayed, score, current_user)
            games.append(new_game) 
        for game in games:
            db.session.add(game)
        db.session.commit()  """
        """ return jsonify({"user with id: ": current_user,
                        "scores": result.stdout.splitlines()[2:],
                        "amountPlayed": amountPlayed,
                        "timePlayed": f"{timePlayed:.1f}"}), 200 """
        return jsonify({"message": "played"})
    except subprocess.CalledProcessError as e:
        print(e)
        return jsonify({"error": f"Game execution failed: {str(e)}"}), 500
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500

@app.route('/add_games', methods=['POST'])
@jwt_required()
def add_games():
    data = request.get_json()  # Get JSON data from the request
    current_user = get_jwt_identity()
    print('line 195: ',data, flush=True)
    for game in data['data']:
        print(game, flush=True)
        risk_score = 0
        risk_score_shallow = 0
        risk_score_mid = 0
        risk_score_deep = 0
        deep_entered = 0
        shallow_entered = 0
        mid_entered = 0
        risk_score_exited_shallow = 0
        risk_score_exited_mid = 0
        risk_score_exited_deep = 0
        deep_exited = 0
        shallow_exited = 0
        mid_exited = 0
        for zone_event in game['entered_zones']:
            for zone_name, oxygen in zone_event.items():                    
                if(zone_name=='ShallowEnter'):
                    if (game['score']==0):
                        risk_score+=100
                    else:
                        shallow_entered+=1
                        risk_score_shallow+=(100-oxygen)                    
                elif(zone_name=='MidEntered'):
                    if (game['score']==0):
                        risk_score+=200
                    else:
                        mid_entered+=1
                        risk_score_mid+=2*(100-oxygen)                        
                elif(zone_name=='DeepEntered'):                    
                    if (game['score']==0):
                        risk_score+=300
                    else:
                        deep_entered+=1
                        risk_score_deep+=3*(100-oxygen)
                # base level is placeholder for a safe amount of oxygen to return to the surface
                elif(zone_name=='ShallowExit'):
                    if (oxygen<BASE_OXYGEN_SHALLOWS):
                        risk_score+=50
                    else:
                        shallow_exited+=1
                        risk_score_exited_shallow+=1/((oxygen-BASE_OXYGEN_SHALLOWS)/100)
                elif(zone_name=='MidExit'):
                    if (oxygen<BASE_OXYGEN_MID):
                        risk_score+=150
                    else:
                        mid_exited+=1
                        risk_score_exited_mid+=1/((oxygen-BASE_OXYGEN_MID)/100)
                else :
                    if (oxygen<BASE_OXYGEN_MID):
                        risk_score+=300
                    else:
                        deep_exited+=1
                        risk_score_exited_deep+=1/((oxygen-BASE_OXYGEN_DEEP)/100)
        risk_score += (risk_score_shallow / shallow_entered) if shallow_entered > 0 else 0
        risk_score += (risk_score_mid / mid_entered) if mid_entered > 0 else 0
        risk_score += (risk_score_deep / deep_entered) if deep_entered > 0 else 0
        risk_score += (risk_score_exited_shallow / shallow_exited) if shallow_exited > 0 else 0
        risk_score += (risk_score_exited_mid / mid_exited) if mid_exited > 0 else 0
        risk_score += (risk_score_exited_deep / deep_exited) if deep_exited > 0 else 0
        new_game = Game(user_id=current_user,
                score=game['score'], 
                risk_score=risk_score, 
                zone1_duration=game['time_spent_in_zones']['Shallow'], 
                zone2_duration=game['time_spent_in_zones']['Mid'], 
                zone3_duration=game['time_spent_in_zones']['Deep'],
                time_played=game['time_played']
                )  # Create a new User instance
        db.session.add(new_game)  # Add the user to the session
        db.session.commit()    
        
    return jsonify({
        "message":"games added"
        }), 201
    
@app.route('/get_games', methods=['GET'])
@jwt_required()
def get_games():
    current_user_id = get_jwt_identity()
    
    games = Game.query.filter_by(user_id=current_user_id, time_played=datetime.now().strftime('%Y-%m-%d')).all()
    
    games_list = [{'game_id': game.game_id, 'score': game.score, 'risk_score': game.risk_score} for game in games]
    print(games_list, flush=True)
    return jsonify(games_list), 200
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)