from flask import Flask, jsonify
from flask_cors import CORS
import asyncio

import subprocess

app = Flask(__name__)
CORS(app, origins='*')



@app.route('/start_game', methods=['GET'])
async def start_game():    
    try:        
        # Execute the game file (game_take_8.py)
        subprocess.Popen(['python', 'game take 14.py'])
        await asyncio.sleep(30)    
        result = -1
        while result<0:
            with open("score.txt", "r") as scoreFile:
                result = int(scoreFile.read())
            await asyncio.sleep(3)             
        return jsonify({"score": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)