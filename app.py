from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import subprocess

app = Flask(__name__)
CORS(app, origins='*')



app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:admin@localhost:3306/test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
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
    duration = db.Column(db.Double, nullable=False)
    score = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    
    def __init__(self, duration, score, user_id):        
        self.duration = duration
        self.score = score
        self.user_id = user_id
        
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
    print(users)
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
    print(current_user)
    user = User.query.get(current_user)  # Query the user by ID
    if user:
        db.session.delete(user)  # Delete the user from the session
        db.session.commit()  # Commit the session to save changes
        return jsonify({'message': 'User deleted successfully'}), 200
    return jsonify({'error': 'User not found'}), 404

@app.route('/start_game', methods=['GET'])
@jwt_required()
async def start_game():    
    try:        
        current_user = get_jwt_identity()
        print(get_jwt_identity())        
        # Execute the game file (game_take_8.py)
        result = subprocess.run(['python', 'game_v3.0.py'], capture_output=True, text=True)
        print('after game')        
        """ amountPlayed = len(result.stdout.splitlines()[2:]) """             
        print("Error output:", result.stderr)
        """ games = []
        for score in result.stdout.splitlines()[2:]:
            new_game = Game(timePlayed, score, current_user)
            games.append(new_game)
        for game in games:
            db.session.add(game)
        db.session.commit() 
        return jsonify({"user with id: ": current_user,
                        "scores": result.stdout.splitlines()[2:],
                        "amountPlayed": amountPlayed,
                        "timePlayed": f"{timePlayed:.1f}"}), 200"""
        return jsonify({"message": "played"})
    except subprocess.CalledProcessError as e:
        print(e)
        return jsonify({"error": f"Game execution failed: {str(e)}"}), 500
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)    