# <center>Safer-Gambling-App</center>

## Setup Instructions

### Node.js Setup
1. Ensure `node_modules` is present after cloning the project.
2. If not, run:
   ```
   npm install
   ```

### Docker Setup (Optional)
**Note:** If you're experiencing issues with Docker installation or WSL upgrade, you can skip this section and proceed with the manual setup.

If Docker is successfully installed:
1. Build the image:
   ```
   docker-compose build --no-cache
   ```
2. Run the image:
   ```
   docker-compose up --watch
   ```
   (`--watch` enables live updates for development)

### Flask/Pygame Setup
For the Flask/Pygame component, you'll need to set up a Python environment:

1. Install Poetry (recommended):
   ```
   (Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | python -
   ```
   Add Poetry to your Windows PATH (restart terminal/IDE after):
   - Search for "environment variables"
   - Edit system environment variables
   - Click "Environment Variables"
   - Find "PATH" under System variables
   - Click "Edit" > "New"
   - Paste the Poetry installation directory

2. Install dependencies:
   ```
   poetry install
   ```

3. Run the application:
   ```
   poetry run python app.py
   ```

Alternatively, if not using Poetry, install:

`pip install pygame`

`pip install flask`

`pip install async`

`pip install flask-cors`

`pip install Flask-SQLAlchemy mysqlclient`

`pip install Flask-JWT-Extended`
 

## Running the Application

1. Database Setup:
   - Install MySQL: https://dev.mysql.com/downloads/installer/          
   - In a terminal with administrator rights, run: 
    ```
    mysqld --init-file C:\path\to\safer-gambling-app\init.sql --console
     ```
     (It needs to be the absolute path; default password: 'admin')

2. Start Flask server (if not using poetry):
   ```
   python app.py
   ```

3. Start React app (if not using Docker):
   ```
   npm start