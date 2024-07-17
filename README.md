# safer-gambling-app



######  Notes for setup ######
## Make sure node_modules is present when you clone the project, if not then run
npm install
npm install react-router-dom
npm install react-redux
npm install react-fontawesome
 
## Make sure you have the library installed:
pip install pygame
pip install flask
pip install flask-cors
 
 
###### Running the Application ######
## To start the application so that the game and react work together you need to open 2 terminals (split terminal) and do the commands in this order:
## Terminal 1: Python - This executes Flask making the game have an API call:
python app.py
 
## Terminal 2: React - This opens the react app. All being well, when you go to the deep diver game the game will open up:
npm run start
 
 
 
## Known bug(s):
## As react renders pages twice, the game will appear twice when you move to the page, but will render once when a user clicks 'Play Again'