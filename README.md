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

   (alternatively):
   ```
   docker-compose up -d
   ```
   this will not occupy your terminal but disables live updates
3. No other step necessary: the app can be accessed by typing 'localhost:3000' in your browser

### Flask/Pygame Setup
For the Flask/Pygame component, you'll need to set up a Python environment:

Run:

`pip install --upgrade pip && pip install --no-cache-dir -r ./flask/requirements.txt`

Alternatively use a python environment manager (Poetry):
1. Install Poetry:
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
3. Apply the virtual environment globally:
   ```
   poetry config virtualenvs.in-project true
   ```
4. Run the application:
   ```
   poetry run python app.py
   ``` 

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
   ```