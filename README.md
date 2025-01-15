# <center>Safer-Gambling-App</center>

## Setup Instructions



### Docker Setup (Recommended)
**Note:** Docker is the recommended setup option for this project. Please install Docker Desktop (https://www.docker.com/get-started/) . If you're experiencing issues with Docker installation or WSL upgrade, please read the troubleshooting section or you can skip Docker setup and proceed with the manual setup.

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
3. The app can be accessed by typing 'localhost:3000' in your browser

**Important:** If you've followed the Docker Setup, you can skip the rest of the setup steps.

### Node.js Setup
1. Ensure `node_modules` is present after cloning the project.
2. If not, run:
   ```
   npm install
   ```

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

## Running the Application (If not using Docker)

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

 ## Updating Pygame and Running Pygame Locally

To set up your environment for Pygame development, follow these steps:

1. **Install Dependencies**  
   The required dependencies are specified in the `pygbag.toml` file. pygbag should install them automatically if run, otherwise
   install all necessary dependencies manually either locally or within a `venv` (virtual environment) in the Pygame directory. If any dependencies are missing, check the imports in the main.py.

2. **Local Development with `pygbag`**
   For development independent of the frontend application, you can use the `pygbag` server to run your project and access it from the browser directly:

   ```
   pygbag main.py
   ```

   This command will also recompile the pygame.apk file in the pygame/public directory on every change while the server is running.

## Troubleshooting

If you encounter an error related to WSL 2 or virtualization while installing Docker Desktop, follow these steps:

1. Restart your computer and enter the BIOS/UEFI settings (usually by pressing F2, Del, or Esc during startup).

2. Find the option for Intel VT-x, AMD-V, or Virtualization Technology and enable it.

3. Save and exit the BIOS.