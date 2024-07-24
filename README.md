# <center>Safer-Gambling-App</center>




##  Notes for setup 
**Make sure node_modules is present when you clone the project, if not then run** 

`npm install`

**if you have Docker installed, in the folder you cloned the app, you can build the image  with**

`docker build -t react .`

**where 'react' is the name of the image**
**and then run the image with:**

`docker-compose up --watch`

**`--watch` enables life update for developing**

**there is no image for the flask/pygame since container can't easily access graphics output**
 
<ins><strong>For Flask/Pygame make sure you have the python dependencies installed:</strong></ins>

`pip install pygame`

`pip install flask`

`pip install flask-cors`
 
 
## Running the Application
**To start the application so that the game and react work together you need to open 2 terminals (split terminal) and do the commands in this order:**

**Terminal 1: Python - This executes Flask making the game have an API call:**

`python app.py`
 
**Terminal 2: React (the docker image will start the react app automatically making this step superflous) - This opens the react app.**

`npm start`

**If everything worked, the game will open up once you reached the game page.**