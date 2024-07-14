from flask import Flask, jsonify
from flask_cors import CORS

import subprocess

app = Flask(__name__)
CORS(app, origins='*')



@app.route('/start_game', methods=['GET'])
def start_game():    
    try:        
        # Execute the game file (game_take_8.py)
        subprocess.Popen(['python', 'game_take_9.py'])
            
        return jsonify({"message": "Game started successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)