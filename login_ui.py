import tkinter as tk
from tkinter import messagebox
import requests
import subprocess
import sys
import json
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import ast


BASE_OXYGEN_SHALLOWS = 0
BASE_OXYGEN_MID = 20
BASE_OXYGEN_DEEP = 40
HEADERS = {'Content-Type': 'application/json'}

class LoginUI:
    def __init__(self, master):
        self.master = master
        master.title("Login")
        master.geometry("300x150")

        self.label_username = tk.Label(master, text="Username:")
        self.label_password = tk.Label(master, text="Password:")

        self.entry_username = tk.Entry(master)
        self.entry_password = tk.Entry(master, show="*")

        self.label_username.grid(row=0, column=0, padx=5, pady=5, sticky="e")
        self.label_password.grid(row=1, column=0, padx=5, pady=5, sticky="e")
        self.entry_username.grid(row=0, column=1, padx=5, pady=5)
        self.entry_password.grid(row=1, column=1, padx=5, pady=5)

        self.login_button = tk.Button(master, text="Login", command=self.login)
        self.login_button.grid(row=2, column=0, columnspan=2, pady=10)

    def login(self):
        username = self.entry_username.get()
        password = self.entry_password.get()

        # Send login request to Flask server
        try:
            """ headers = {'Content-Type': 'application/json'} """
            data = json.dumps({'usermail': username, 'password': password})
            response = requests.post('http://localhost:5000/login', headers=HEADERS, data=data)
            if response.status_code == 200:
                messagebox.showinfo("Success", "Logged in successfully!")
                token = response.json()['access_token']
                self.master.destroy()  # Close the login window
                self.launch_game(token=token)  # Launch the game
            else:
                messagebox.showerror("Error", "Invalid credentials")
        except requests.ConnectionError:
            messagebox.showerror("Error", "Could not connect to the server")

    def launch_game(self, token):
        try:
            result = subprocess.run(['python', 'game_v3.0.py'], capture_output=True, text=True)            
            lines = result.stdout.splitlines()
            data = ast.literal_eval("\n".join(lines[2:]))
            print('line117: ', data)  
            for game in data:
                risk_score=0
                for zone_event in game['entered_zones']:
                    for zone_name, oxygen in zone_event.items():                    
                        if(zone_name=='ShallowEnter'):
                            risk_score+=100-oxygen
                        elif(zone_name=='MidEntered'):
                            risk_score+=2*(100-oxygen)
                        elif(zone_name=='DeepEntered'):
                            risk_score+=3*(100-oxygen)
                        # base level is placeholder for a safe amount of oxygen to return to the surface
                        elif(zone_name=='ShallowExit'):
                            if (oxygen<BASE_OXYGEN_SHALLOWS):
                                risk_score+=150
                            else:
                                risk_score+=1/((oxygen-BASE_OXYGEN_SHALLOWS)/100)
                        elif(zone_name=='MidExit'):
                            if (oxygen<BASE_OXYGEN_MID):
                                risk_score+=300
                            else:
                                risk_score+=2/((oxygen-BASE_OXYGEN_MID)/100)
                        else :
                            if (oxygen<BASE_OXYGEN_MID):
                                risk_score+=500
                            else:
                                risk_score+=3/((oxygen-BASE_OXYGEN_DEEP)/100)
                print('risk_score: ', risk_score)
                print('data["time_spent_in_zones"]["Shallow"]: ', game['time_spent_in_zones']['Shallow'])
                print('data["time_spent_in_zones"]["Mid"]: ', game['time_spent_in_zones']['Mid'])
                print('data["time_spent_in_zones"]["Deep"]: ', game['time_spent_in_zones']['Deep'])
                game["risk_score"] = risk_score
            request_data = json.dumps(data)
            print(request_data)
            headers = {
                'Authorization': f'Bearer {token}',
                'Content-Type': 'application/json'
            }
            response = requests.post('http://localhost:5000/add_games', headers=headers, data=request_data)                
            if response.status_code == 201:
                messagebox.showinfo("Success", "game(s) added!")                
                self.master.destroy()                 
            else:
                messagebox.showerror("Error", "something went wrong")
        except requests.ConnectionError:
            messagebox.showerror("Error", "Could not connect to the server")
            
        except Exception as e:
            messagebox.showerror("Error", f"Failed to launch the game: {str(e)}")

if __name__ == "__main__":
    root = tk.Tk()
    login_ui = LoginUI(root)
    root.mainloop()