from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import time
import subprocess

app = Flask(__name__)
CORS(app, origins='*')



app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:admin@localhost/gamblers'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    surname = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    
    def __init__(self, name, surname, email, password, age):        
        self.name = name
        self.surname = surname
        self.email = email
        self.password = password
        self.age = age
    
    def __str__(self):
        return f"User(ID: {self.id}, Name: {self.name}, Surname: {self.surname}, Age: {self.age})"

with app.app_context():
    db.create_all()
    
@app.route('/users', methods=['GET'])
async def get_users():
    users = User.query.all()    
    return jsonify([{'id': user.id, 'name': user.name, 'surname': user.surname, 'email': user.email} for user in users])

@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.get_json()  # Get JSON data from the request
    new_user = User(name=data['name'], surname=data['surname'], age=data['age'], email=data['email'], password=data['password'])  # Create a new User instance
    db.session.add(new_user)  # Add the user to the session
    db.session.commit()  # Commit the session to save the user to the database
    return jsonify({'message': 'User added successfully', 'id': new_user.id}), 201

@app.route('/delete_user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)  # Query the user by ID
    if user:
        db.session.delete(user)  # Delete the user from the session
        db.session.commit()  # Commit the session to save changes
        return jsonify({'message': 'User deleted successfully'}), 200
    return jsonify({'error': 'User not found'}), 404

@app.route('/start_game', methods=['GET'])
async def start_game():    
    try:        
        start_time = time.perf_counter()
        # Execute the game file (game_take_8.py)
        result = subprocess.run(['python', 'game take 14.py'], check=True, capture_output=True, text=True)
        end_time = time.perf_counter()
        amountPlayed = len(result.stdout.splitlines()[2:])
        timePlayed = end_time - start_time
        return jsonify({"scores": result.stdout.splitlines()[2:],
                        "amountPlayed": amountPlayed,
                        "timePlayed": f"{timePlayed:.1f}"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
""" with app.app_context():
    db.session.delete(newUser)
    db.session.commit() """

if __name__ == '__main__':
    app.run(debug=True)    