import os
import time
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import OperationalError

# Access environment variables
pma_host = os.environ.get('PMA_HOST')
pma_port = os.environ.get('PMA_PORT')
mysql_password = os.environ.get('MYSQL_ROOT_PASSWORD')

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://root:{mysql_password}@{pma_host}:{pma_port}/test'


db = SQLAlchemy(app)

class User (db.Model):
    __tablename__ = 'users'  # This explicitly sets the table name to 'users'
    
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)    
    password = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    games = db.relationship('Game', backref='player', lazy=True)
    
    def __init__(self, name, password, age):        
        self.name = name
        self.password = '1234'
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

@app.route('/')
def hello():
    return "Hello, World!"

if __name__ == '__main__':
    print(f"PMA_HOST: {pma_host}")
    print(f"PMA_PORT: {pma_port}")
    print(f"MYSQL_ROOT_PASSWORD: {mysql_password}")
    print(f"SQLALCHEMY_DATABASE_URI: {app.config['SQLALCHEMY_DATABASE_URI']}")    
    #connect_with_retry()  # Attempt to connect to the database with retries
    
    app.run(host='0.0.0.0', port=5000, debug=True)