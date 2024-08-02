from flask import Flask, jsonify
from flask_cors import CORS
import time
import subprocess

app = Flask(__name__)
CORS(app, origins='*')

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

if __name__ == '__main__':
    app.run(debug=True)    