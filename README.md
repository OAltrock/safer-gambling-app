# <center>Safer-Gambling-App</center>




##  Notes for setup 
**Make sure node_modules is present when you clone the project, if not then run** 

`npm install`

**if you have Docker installed, in the folder you cloned the app, you can build the image  with:**

`docker-compose build --no-cache`

**and then run the image with:**

`docker-compose up --watch`

**make sure the docker engine is running**

**`--watch` enables life update for developing**

**there is no image for the flask/pygame since container can't easily access graphics output**
 
<ins><strong>For Flask/Pygame make sure you have the python dependencies installed:</strong></ins>

`pip install pygame`

`pip install flask`

`pip install flask-cors`

`pip install Flask-SQLAlchemy mysqlclient`

`pip install Flask-JWT-Extended`
 
 
## Running the Application
**To start the application so that the game and react work together you need to open 2 terminals (split terminal) and do the commands in this order:**

**To start the database, install MySQL: https://dev.mysql.com/downloads/installer/**

**Start the MySQL server with:**

`mysqld`

**Running the docker command is also starting the database. If you start the database for the first time, you should run:**

`mysql -h localhost -u root -p -e "source ./init.sql"`

**to set up the root password, create the tables and populate them with 100 examples (the password in the dev environment is: 'admin').**

**Terminal 1: Python - This executes Flask making the game have an API call:**

`python app.py`
 
**Terminal 2: React (the docker image will start the react app automatically making this step superflous) - This opens the react app.**

`npm start`

**The 'start_game'-enpoint is protected in this version. For now, you need to login via Postman on the '/login'-endpoint (POST) using {"usermail": "jane.smith@example.com", "password": "password456"} as Body. With the JWT-token you get as return, you can access the '/start_game'-endpoint (GET). For this add an 'Authorization'-key with value: 'Bearer {JWT-token}' to the Postman Headers.**

**Backend accessibility will be added to the frontend shortly.**