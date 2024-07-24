# safer-gambling-app



######  Notes for setup ######
## Make sure node_modules is present when you clone the project, if not then run
npm install
## if you have Docker installed, you can build the image with
docker build -t react .
## 'react' is the name of the image which must be used in the second command
## and then run the image with 
docker-compose up --watch 
## the second '3000' would be the port the react page responds to (the first is the outgoing port - 3000 is the default for react)

## there is no image for the flask/pygame since container can't easily access graphics output
 
## Make sure you have the library installed:
pip install pygame
pip install flask
pip install flask-cors
 
 
###### Running the Application ######
## To start the application so that the game and react work together you need to open 2 terminals (split terminal) and do the commands in this order:
## Terminal 1: Python - This executes Flask making the game have an API call:
python app.py
 
## Terminal 2: React - This opens the react app. All being well, when you go to the deep diver game the game will open up (the docker image will start the react app automatically):
npm run start