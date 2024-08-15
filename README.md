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

<ins><strong>It is strongly suggested to use Poetry (which is similar to npm) to install all python dependencies:</strong></ins>

`pip install poetry`

and then: 

`poetry install`

If any new dependencies will be added, `poetry install` has to be reentered.

If you don't want to install Poetry, you have to install all dependencies manually:

`pip install pygame`

`pip install flask`

`pip install async`

`pip install flask-cors`

`pip install Flask-SQLAlchemy mysqlclient`

`pip install Flask-JWT-Extended`

`pip install bcrypt`
 
## Running the Application
**To start the application so that the game and react work together you need to open 2 terminals (split terminal) and do the commands in this order:**

**To start the database, install MySQL: https://dev.mysql.com/downloads/installer/**

**Start the MySQL server with:**

`mysqld`

**Running the docker command is also starting the database making the previous commad superfluous.** 

**If you start the database for the first time, you should run:**

`mysql -h localhost -u root -p -e "source ./init.sql"`

**to set up the root password and create the tables (the password in the dev environment is: 'admin').**

**Terminal 1: Python - This executes Flask making the game have an API call:**

`python app.py`
 
**Terminal 2: React (the docker image will start the react app automatically making this step superfluous) - This opens the react app.**

`npm start`