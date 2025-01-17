import pygbag.aio as asyncio
from player import Player
from sea_monster import SeaMonster
from draw_hud import Draw_Hud
from button import Button
from control_popup import ControlPopup
from coin import Coin
import numpy as np
import pygame
import random
import datetime
import uuid
import js
import json


Screen_Width = 1280 
Screen_Height = 720
screen = pygame.display.set_mode((Screen_Width, Screen_Height))

# Ingame Clock + Running = true , delta time
clock = pygame.time.Clock()
running = True
dt = clock.tick(60) / 1000

pygame.display.set_caption("Treasure Dive")

# Variables
Shallow_Coins = []
Mid_Coins = []
Deep_Coins = []
gold_coins_count = 0 #this variable does not seem to be used anywhere
zones = ["Shallow", "Mid", "Deep"]

# Tracking metrics of multiple game sessions
game_sessions = []
# Traking game session
time_played = None
# Flag to track metrics when game is over
game_over_metrics_recorded = False
# Tracking entered/exited zones
entered_zones = []
# Currently active zone
current_zone = None
# Player zones tracking (times spent in each zone)
zone_time_spent = {
    "Shallow": datetime.timedelta(),
    "Mid": datetime.timedelta(),
    "Deep": datetime.timedelta()
}
# Variable to track the last zone update time
last_zone_update_time = None
# List to store X, Y coordinates
player_coordinates = []
# Timer to track intervals  
movement_tracking_time = pygame.time.get_ticks()  

# Load images
Beach_img = pygame.image.load('img/Beach.png').convert()
shallow_img = pygame.image.load('img/Shallow.png').convert()
medium_deep_img = pygame.image.load('img/medium_deep.png').convert()
deep_img = pygame.image.load('img/deep.png').convert()
coin_img = pygame.image.load('img/7.png').convert_alpha()
ingame_img = pygame.image.load('img/background_800x711.png').convert()
background_img = pygame.image.load('img/background.png').convert()
sea_monster_img = pygame.image.load('img/sea_monster.png').convert()

map_cols = 5
map_rows = 20
map_width = Beach_img.get_width() * map_cols
map_height = Beach_img.get_height() * map_rows

tile_width = Beach_img.get_width()
tile_height = Beach_img.get_height()
tile_color = (61, 156, 196)

# Define the zone boundaries
ZONE_BOUNDARIES = {
    "Shallow": (tile_height * 1, tile_height * 2),
    "Mid": (tile_height * 5, tile_height * 7),
    "Deep": (tile_height * 12, tile_height * 19)
}

# Colors
WHITE = (255, 255, 255)

# Respawn intervals (in ms)
shallow_respawn_interval = 10000  
mid_respawn_interval = 5500      
deep_respawn_interval = 1000      

# Respawn trackers
shallow_respawn_timer = pygame.time.get_ticks()
mid_respawn_timer = pygame.time.get_ticks()
deep_respawn_timer = pygame.time.get_ticks()

# Counters to track respawned coins in each zone
shallow_respawn_count = 0
mid_respawn_count = 0
deep_respawn_count = 0


def track_player_zone(player, current_zone, oxygen_level):
    global last_zone_update_time
    player_y = player.rect.centery
    new_zone = None

    
    current_time = datetime.datetime.now()

    # Determine the new zone based on the player's Y position
    for zone, (start_y, end_y) in ZONE_BOUNDARIES.items():
        if start_y <= player_y <= end_y:
            new_zone = zone
            break

    # Update zone times
    if last_zone_update_time is not None and current_zone is not None:
        time_diff = current_time - last_zone_update_time
        zone_time_spent[current_zone] += time_diff

    last_zone_update_time = current_time

    # Handle zone transitions
    if new_zone != current_zone:
        if current_zone is not None:
            direction = "top" if player_y < (ZONE_BOUNDARIES[current_zone][0] + ZONE_BOUNDARIES[current_zone][1]) / 2 else "bottom"
            # Store the exit event with oxygen level
            entered_zones.append({f"{current_zone}Exit": round(oxygen_level)})

        if new_zone is not None:
            direction = "top" if player_y < (ZONE_BOUNDARIES[new_zone][0] + ZONE_BOUNDARIES[new_zone][1]) / 2 else "bottom"
            # Store the enter event with oxygen level
            entered_zones.append({f"{new_zone}Enter": round(oxygen_level)})

    return new_zone

def adjust_for_pause(pause_start_time, last_zone_update_time):
    pause_duration = datetime.datetime.now() - pause_start_time
    if last_zone_update_time is not None:
        last_zone_update_time += pause_duration
    return last_zone_update_time


class SeaMonster(pygame.sprite.Sprite):
    def __init__(self, x, y, speed, min_distance, max_distance):
        super().__init__()
        # Store the original image and create scaled version
        self.original_image = sea_monster_img
        self.scale_factor = 1.5
        self.image = pygame.transform.scale(
            self.original_image, 
            (int(self.original_image.get_width() * self.scale_factor), 
             int(self.original_image.get_height() * self.scale_factor))
        )
        
        # Create the main rect for positioning the sprite
        self.rect = self.image.get_rect()
        self.rect.x = x
        self.rect.y = y
        
        # Create a smaller hitbox rect for collisions
        hitbox_scale = 0.04 
        hitbox_width = int(self.rect.width * hitbox_scale)
        hitbox_height = int(self.rect.height * hitbox_scale)
        
        # Create and position the hitbox in the center of the sprite
        self.hitbox = pygame.Rect(
            self.rect.centerx - hitbox_width // 2,
            self.rect.centery - hitbox_height // 2,
            hitbox_width,
            hitbox_height
        )
        
        self.speed = speed
        self.min_distance = min_distance
        self.max_distance = max_distance
        self.direction = 1 if random.choice([True, False]) else -1
        self.distance_traveled = 0
        self.target_distance = random.randint(self.min_distance, self.max_distance)

    def update(self):
        # Update the main sprite image based on direction
        if self.direction == -1:
            self.image = pygame.transform.flip(
                pygame.transform.scale(
                    self.original_image,
                    (int(self.original_image.get_width() * self.scale_factor),
                     int(self.original_image.get_height() * self.scale_factor))
                ),
                True, False
            )
        else:
            self.image = pygame.transform.scale(
                self.original_image,
                (int(self.original_image.get_width() * self.scale_factor),
                 int(self.original_image.get_height() * self.scale_factor))
            )

        # Move the sea monster (main rect)
        self.rect.x += self.speed * self.direction
        self.distance_traveled += abs(self.speed)
        
        # Update hitbox position to follow the main rect
        self.hitbox.centerx = self.rect.centerx
        self.hitbox.centery = self.rect.centery
        
        # Boundary checking using the main rect
        if self.rect.x < 0:
            self.rect.x = 0
            self.direction = 1
        elif self.rect.right > 3850:
            self.rect.x = 3850 - self.rect.width
            self.direction = -1

        # Handle direction changes
        if self.distance_traveled >= self.target_distance:
            self.direction *= -1
            self.distance_traveled = 0
            self.target_distance = random.randint(self.min_distance, self.max_distance)

    def check_collision(self, player):
        return self.hitbox.colliderect(player.hitbox)

def spawn_sea_monsters(sea_monster_group):
    min_distance = 400
    max_distance = 900
    for zone in zones:
        if not running:
            break
        if zone == "Shallow":
            for _ in range(5):
                x = random.randint(0, tile_width * map_cols)
                y = random.randint(tile_height * 1, tile_height * 2)
                speed = random.uniform(1, 3)
                sea_monster = SeaMonster(x, y, speed, min_distance, max_distance)
                sea_monster_group.add(sea_monster)
        elif zone == "Mid":
            for _ in range(8):
                x = random.randint(0, tile_width * map_cols)
                y = random.randint(tile_height * 5, tile_height * 7)
                speed = random.uniform(1, 4)
                sea_monster = SeaMonster(x, y, speed, min_distance, max_distance)
                sea_monster_group.add(sea_monster)
        elif zone == "Deep":
            for _ in range(15):  
                x = random.randint(0, tile_width * map_cols)
                y = random.randint(tile_height * 12, tile_height * 19)
                speed = random.uniform(2, 5)
                sea_monster = SeaMonster(x, y, speed, min_distance, max_distance)
                sea_monster_group.add(sea_monster)


def send_game_data():
    global entered_zones, game_sessions
    # Create the data dictionary
    data = {
        'type': 'GAME_OVER',
        'game_sessions': game_sessions        
    }
    
    # Convert the dictionary to a JSON string
    json_data = json.dumps(data)
    print(json_data)
    js.window.parent.postMessage(json_data, "*")

def draw_start_screen():
    screen.blit(background_img, (0, 0))
    title_text = font.render("Treasure Dive", True, WHITE)
    start_text = font.render("Press SPACE to Start", True, WHITE)

    screen.blit(title_text, (tile_width - title_text.get_width() // 2, tile_height // 2-50))
    screen.blit(start_text, (tile_width - start_text.get_width() // 2, tile_height // 2))

    pygame.display.flip()

def draw_pause_screen():
    screen.fill("turquoise4")
    resume_button = Button(Screen_Width // 2 - 100, Screen_Height // 2 - 50, 200, 50, "Resume", (0, 128, 128), (0, 150, 150), WHITE)
    quit_button = Button(Screen_Width // 2 - 100, Screen_Height // 2 + 20, 200, 50, "Quit", (0, 128, 128), (0, 150, 150), WHITE)
    
    resume_button.draw(screen)
    quit_button.draw(screen)
    pygame.display.flip()

    return resume_button, quit_button

def draw_game_over_screen():
    screen.fill("grey9")
    game_over_text = font.render("Game Over", True, WHITE)
    score_text = font.render(f"Score: 0", True, WHITE)    
    screen.blit(game_over_text, (Screen_Width // 2 - game_over_text.get_width() // 2, Screen_Height // 2 - 150))
    screen.blit(score_text, (Screen_Width // 2 - score_text.get_width() // 2, Screen_Height // 2 - 100))

    play_again_button = Button(Screen_Width // 2 - 100, Screen_Height // 2 - 50, 200, 50, "Play Again", (0, 128, 128), (0, 150, 150), WHITE)
    quit_button = Button(Screen_Width // 2 - 100, Screen_Height // 2 + 20, 200, 50, "Quit", (0, 128, 128), (0, 150, 150), WHITE)
    
    play_again_button.draw(screen)
    quit_button.draw(screen)
    pygame.display.flip()

    return play_again_button, quit_button

def draw_won_screen(score):
    screen.fill("darkgoldenrod2")
    won_text = font.render("You Won!", True, WHITE)
    score_text = font.render(f"Score: {round(score)}", True, WHITE)
    screen.blit(won_text, (Screen_Width // 2 - won_text.get_width() // 2, Screen_Height // 2 - 150))
    screen.blit(score_text, (Screen_Width // 2 - score_text.get_width() // 2, Screen_Height // 2 - 100))

    play_again_button = Button(Screen_Width // 2 - 100, Screen_Height // 2 - 50, 200, 50, "Play Again", (102, 184, 20), (128,210,46), WHITE)
    quit_button = Button(Screen_Width // 2 - 100, Screen_Height // 2 + 20, 200, 50, "Quit", (220, 20, 60), (220, 80, 108), WHITE)
    
    play_again_button.draw(screen)
    quit_button.draw(screen)
    pygame.display.flip()

    return play_again_button, quit_button


def draw_resurface_popup(screen, hold_time, hold_duration):
    # Popup dimensions and position
    popup_width = 300
    popup_height = 100
    popup_x = (Screen_Width - popup_width) // 2
    popup_y = (Screen_Height - popup_height + 220) // 2

    # Create a semi-transparent surface for the popup
    popup_surface = pygame.Surface((popup_width, popup_height))
    popup_surface.set_alpha(200)  # 0 = fully transparent, 255 = fully opaque
    popup_surface.fill((0, 0, 0))  # Fill with white color

    # Draw the popup border (non-transparent)
    pygame.draw.rect(popup_surface, (255, 255, 255), (0, 0, popup_width, popup_height), 2)

    # Render the text "Hold E to resurface"
    text = font.render("Hold E to resurface", True, WHITE)
    text_rect = text.get_rect(center=(popup_width // 2, popup_height // 2))
    popup_surface.blit(text, text_rect)

    # Calculate progress bar width based on hold time
    progress_width = int((hold_time / hold_duration) * popup_width)
    pygame.draw.rect(popup_surface, (200, 200, 200), (0, popup_height - 20, progress_width, 20))

    # Blit the popup surface onto the main screen
    screen.blit(popup_surface, (popup_x, popup_y))

def draw_oxygen_warning(screen):
    popup_width = 440
    popup_height = 100
    popup_x = (Screen_Width - popup_width) // 2
    popup_y = (Screen_Height - popup_height) //4 

    popup_oxygen = pygame.Surface((popup_width, popup_height))
    popup_oxygen.set_alpha(200) 
    popup_oxygen.fill((255, 0, 0)) # Red

    pygame.draw.rect(popup_oxygen , (255, 255, 255), (0, 0, popup_width, popup_height), 2)

    current_time = pygame.time.get_ticks()

    if (current_time // 500) % 2 == 0:
        text_color = (255, 255, 255)  # White
    else:
        text_color = (255, 255, 0)  # Yellow

    line1 = font.render("Warning!", True, text_color)
    line2 = font.render("Your oxygen level is below 20%!", True, text_color)

    text_rect1 = line1.get_rect(center=(popup_width // 2, popup_height // 3))
    text_rect2 = line2.get_rect(center=(popup_width // 2, 2 * popup_height // 3 ))

    popup_oxygen.blit(line1, text_rect1)
    popup_oxygen.blit(line2, text_rect2)

    screen.blit(popup_oxygen, (popup_x, popup_y))



class CoinsCollectedPopup:

    def __init__(
        self,
        is_active=False,
        start_time=pygame.time.get_ticks(),
        last_amount=50,
        message="Wow!",
        duration = 5000
    ):
        self.is_active = is_active
        self.start_time = start_time
        self.last_amount = last_amount
        self.message = message
        self.duration = duration
    
    def update(self, score):
        current_time = pygame.time.get_ticks()
        if not self.is_active and score >= self.last_amount:
            self.is_active = True
            self.start_time = current_time

        if self.is_active and current_time - self.start_time >= self.duration:
            self.is_active = False
            next_threshold = score
            message = random.choice(["Gold Rush!", "Unbelievable!", "Jackpot!"])

            if next_threshold < 500:
                next_threshold = (next_threshold // 100) * 100 + 100
                message = random.choice(["Great Start!", "Keep Going!", "Amazing!"])
            elif next_threshold < 1000:
                next_threshold = 1000
            else:
                next_threshold = (next_threshold // 1000) * 1000 + 1000

            self.last_amount = next_threshold
            self.message = message

        
    def draw(self, screen):
        if not self.is_active:
            return
        screen_offset = 10
        popup_width = 440
        popup_height = 100
        popup_x = (Screen_Width - popup_width) - screen_offset
        popup_y = 0 + screen_offset
        outline_color = (0, 0, 0)  # Black
        outline_offset = 2

        popup_coins = pygame.Surface((popup_width, popup_height))
        popup_coins.set_alpha(200) 
        popup_coins.fill((255, 223, 0))  # gold

        for i in range(popup_height):
            color = (255, 223 - (i // (popup_height // 25)), 0)
            pygame.draw.line(popup_coins, color, (0, i), (popup_width, i))

        current_time = pygame.time.get_ticks()

        if (current_time // 100) % 2 == 0:
            text_color = (255, 255, 255)  # White
        else:
            text_color = (255, 69, 0)  # amber

        def draw_text_with_outline(x, y, text):
            for dx, dy in [(-outline_offset, -outline_offset), (-outline_offset, outline_offset), 
                        (outline_offset, -outline_offset), (outline_offset, outline_offset)]:
                outline_text = font.render(text, True, outline_color)
                popup_coins.blit(outline_text, outline_text.get_rect(center=(x + dx, y + dy)))

            main_text = font.render(text, True, text_color)
            popup_coins.blit(main_text, main_text.get_rect(center=(x, y )))

        draw_text_with_outline(popup_width // 2, popup_height // 3, self.message)
        draw_text_with_outline(popup_width // 2, 2 * popup_height // 3, f"You collected {self.last_amount} coins!")
        screen.blit(popup_coins, (popup_x, popup_y))



def save_game_session(score):
    global game_sessions, entered_zones, player_coordinates

    game_session = {
        "game_session_id": str(uuid.uuid4()),
        "time_played": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "entered_zones": entered_zones,
        "score": score,
        "time_spent_in_zones": {
            zone: f"{int(time.total_seconds() // 60):02d}:{int(time.total_seconds() % 60):02d}"
            for zone, time in zone_time_spent.items()
        },
        "player_coordinates": player_coordinates
    }
    game_sessions.append(game_session)

def reset_game():
    global player, coin_group, hud, control_popup, game_over_metrics_recorded, entered_zones, zone_time_spent, last_zone_update_time, player_coordinates, coins_collected_popup

    # Reset flag to track game retries
    game_over_metrics_recorded = False

    # Reset tracking of entered zones
    entered_zones = []

    # Reset player coorinates
    player_coordinates = []

    # Reset player position
    player.rect.topleft = [Screen_Width // 2, Screen_Height // 2]

    # Reset zone time tracking
    zone_time_spent = {
        "Shallow": datetime.timedelta(),
        "Mid": datetime.timedelta(),
        "Deep": datetime.timedelta()
    }

    # Reset HUD values
    hud = Draw_Hud()

    # Reset Control popup
    control_popup = ControlPopup()
    control_popup.start()

    # Reset coin group
    coin_group.empty()
    spawn_coins_treasures(coin_group)
    
    # Reset sea monster group
    sea_monster_group.empty()
    spawn_sea_monsters(sea_monster_group)


# Spawn coins function
def spawn_coins_treasures(coin_group):
    shallow_coin_count = 0
    mid_coin_count = 0
    deep_coin_count = 0
    for zone in zones:
        if not running:
            break
        if zone == "Shallow":
            for _ in range(30):
                shallow_coin_value = np.random.normal(11, 6)
                if shallow_coin_value <= 0:
                    shallow_coin_value = abs(shallow_coin_value)
                    shallow_coin_value = round(shallow_coin_value,0)
                if shallow_coin_value == 0:
                    shallow_coin_value = 1
                elif shallow_coin_value > 23:
                    shallow_coin_value = 23
                x = random.randint(0, tile_width * map_cols)
                y = random.randint(tile_height * 1, tile_height * 2)
                coin = Coin(x, y, shallow_coin_value)
                coin_group.add(coin)
                shallow_coin_count += 1
        elif zone == "Mid":
            for _ in range(45):
                mid_coin_value = np.random.normal(44, 8)
                if mid_coin_value <= 0:
                    mid_coin_value = abs(mid_coin_value)
                    mid_coin_value = round(mid_coin_value,0)
                elif mid_coin_value > 53:
                    mid_coin_value = 53
                x = random.randint(0, tile_width * map_cols)
                y = random.randint(tile_height * 5, tile_height * 7)
                coin = Coin(x, y, mid_coin_value)
                coin_group.add(coin)
                mid_coin_count += 1
        elif zone == "Deep":
            for _ in range(40):
                deep_coin_value = np.random.normal(79, 17)
                if deep_coin_value <= 0:
                    deep_coin_value = abs(deep_coin_value)
                    deep_coin_value = round(deep_coin_value,0)
                elif deep_coin_value > 140:
                    deep_coin_value = 140
                x = random.randint(0, tile_width * map_cols)
                y = random.randint(tile_height * 12, tile_height * 19)
                coin = Coin(x, y, deep_coin_value)
                coin_group.add(coin)
                deep_coin_count += 1
    hud.update_coin_count(shallow_coin_count, mid_coin_count, deep_coin_count)


# Respawn intervals (in ms)
shallow_respawn_interval = 10000  
mid_respawn_interval = 5500      
deep_respawn_interval = 1000      

# Respawn trackers
shallow_respawn_timer = pygame.time.get_ticks()
mid_respawn_timer = pygame.time.get_ticks()
deep_respawn_timer = pygame.time.get_ticks()

# Counters to track respawned coins in each zone
shallow_respawn_count = 0
mid_respawn_count = 0
deep_respawn_count = 0


# Function to respawn coins
def respawn_coins(coin_group):
    global shallow_respawn_timer, mid_respawn_timer, deep_respawn_timer
    global shallow_respawn_count, mid_respawn_count, deep_respawn_count 
    current_time = pygame.time.get_ticks()

    # Shallow coin respawn
    if current_time - shallow_respawn_timer > shallow_respawn_interval and shallow_respawn_count < hud.shallow_coin_count:
        shallow_coin_value = np.random.normal(11, 6)
        shallow_coin_value = max(1, min(shallow_coin_value, 23))
        x = random.randint(0, tile_width * map_cols)
        y = random.randint(tile_height * 1, tile_height * 2)
        coin = Coin(x, y, shallow_coin_value)
        coin_group.add(coin)
        shallow_respawn_timer = current_time
        shallow_respawn_count += 1

    # Mid coin respawn
    if current_time - mid_respawn_timer > mid_respawn_interval and mid_respawn_count < hud.mid_coin_count:
        mid_coin_value = np.random.normal(44, 8)
        mid_coin_value = max(0, min(mid_coin_value, 53))
        x = random.randint(0, tile_width * map_cols)
        y = random.randint(tile_height * 5, tile_height * 7)
        coin = Coin(x, y, mid_coin_value)
        coin_group.add(coin)
        mid_respawn_timer = current_time
        mid_respawn_count += 1

    # Deep coin respawn
    if current_time - deep_respawn_timer > deep_respawn_interval and deep_respawn_count < hud.deep_coin_count:
        deep_coin_value = np.random.normal(84, 17)
        deep_coin_value = max(0, min(deep_coin_value, 140))
        x = random.randint(0, tile_width * map_cols)
        y = random.randint(tile_height * 12, tile_height * 19)
        coin = Coin(x, y, deep_coin_value)
        coin_group.add(coin)
        deep_respawn_timer = current_time
        deep_respawn_count += 1


# Variables for holding the e Key and the resurface popup
resurface_popup_visible = False
e_key_held = False
hold_e_start_time = None
hold_duration = 1000


def handle_events():
    global running, game_state, pause_start_time, last_zone_update_time, hold_e_start_time

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        # Handle key presses in different game states
        elif event.type == pygame.KEYDOWN:
            if game_state == "start" and event.key == pygame.K_SPACE:
                game_state = "play"
                control_popup.start()
            elif game_state == "play" and event.key == pygame.K_ESCAPE:
                game_state = "paused"
                pause_start_time = datetime.datetime.now()  # Track when the game paused
            elif game_state == "paused" and event.key == pygame.K_ESCAPE:
                game_state = "play"
                last_zone_update_time = adjust_for_pause(pause_start_time, last_zone_update_time)
        
        # Handle clicks in paused or end-game states
        elif event.type == pygame.MOUSEBUTTONDOWN:
            if game_state == "paused":
                handle_pause_events(event)
            elif game_state in ["gameover", "won"]:
                handle_endgame_events(event)

def handle_pause_events(event):
    resume_button, quit_button = draw_pause_screen()
    if resume_button.is_clicked(event):
        global game_state, last_zone_update_time
        game_state = "play"
        last_zone_update_time = adjust_for_pause(pause_start_time, last_zone_update_time)
    elif quit_button.is_clicked(event):
        global running
        running = False

def send_message_to_react(message):
    js.postMessage(message, "*")

def handle_endgame_events(event):
    global game_state, game_over_metrics_recorded, running    
        
    if game_state == "gameover":
        play_again_button, quit_button = draw_game_over_screen()
        if play_again_button.is_clicked(event):
            reset_game()
            game_state = "play"
        elif quit_button.is_clicked(event):            
            save_game_session(0)
            game_over_metrics_recorded = True
            running = False            
    elif game_state == "won":
        play_again_button, quit_button = draw_won_screen(hud.score)
        if play_again_button.is_clicked(event):
            reset_game()
            game_over_metrics_recorded = False
            game_state = "play"            
        elif quit_button.is_clicked(event):            
            save_game_session(hud.score)
            game_over_metrics_recorded = True
            running = False
    

def update_game_state():
    global sea_monster_group, current_zone, resurface_popup_visible, hold_e_start_time, game_state, movement_tracking_time, hud
    if game_state == "play":
        player.update(dt)
        sea_monster_group.update()
        current_zone = track_player_zone(player, current_zone, hud.oxygen_level)
        
        # Handle coin collisions
        collected_coins = pygame.sprite.spritecollide(player, coin_group, True)
        for coin in collected_coins:
            hud.update_score(coin.value)
        
        respawn_coins(coin_group)
        
        # Handle player-monster collisions
        monster_collision = any(monster.check_collision(player) for monster in sea_monster_group)
        if monster_collision and not player.invincible:
            hud.oxygen_level -= 5
            player.set_invincible(1)

        # Track player coordinates
        if pygame.time.get_ticks() - movement_tracking_time >= 1000:
            player_coordinates.append((player.rect.x, player.rect.y))
            movement_tracking_time = pygame.time.get_ticks()

        # Handle resurface popup
        handle_resurface_popup()

        # Check for game over
        if hud.oxygen_level == 0:
            game_state = "gameover"

def handle_resurface_popup():
    global resurface_popup_visible, hold_e_start_time, game_state

    keys = pygame.key.get_pressed()
    if int(hud.get_depth(player.rect.y)) < 4:
        resurface_popup_visible = True
        if keys[pygame.K_e]:
            if hold_e_start_time is None:
                hold_e_start_time = pygame.time.get_ticks()
            
            hold_time = pygame.time.get_ticks() - hold_e_start_time
            if hold_time >= hold_duration:
                game_state = "won"
        else:
            hold_e_start_time = None
    else:
        resurface_popup_visible = False

def draw_screen():
    if game_state == "start":
        draw_start_screen()
    elif game_state == "play":
        draw_gameplay_screen()
    elif game_state == "paused":
        draw_pause_screen()
    elif game_state == "gameover":
        draw_game_over_screen()
    elif game_state == "won":
        draw_won_screen(hud.score)


def draw_gameplay_screen():
    screen.fill((0, 0, 0))  
    # Handle camera offset for scrolling
    camera_offset_x = player.rect.centerx - Screen_Width // 2
    camera_offset_y = player.rect.centery - Screen_Height // 2

    # Draw tiles and player
    for row in range(map_rows):
        for col in range(map_cols):
            tile_rect = pygame.Rect(
                col * tile_width - camera_offset_x,
                row * tile_height - camera_offset_y,
                tile_width,
                tile_height
            )

            if row == 0:
                screen.blit(Beach_img, tile_rect.topleft)
            elif row in (1, 2):
                screen.blit(shallow_img, tile_rect.topleft)
            elif row in (3, 4, 8, 9, 10, 11):
                screen.blit(ingame_img, tile_rect.topleft)
            elif row in (5, 6, 7):
                screen.blit(medium_deep_img, tile_rect.topleft)
            else:
                screen.blit(deep_img, tile_rect.topleft)

            pygame.draw.rect(screen, tile_color, tile_rect, 2)

    # Draw player with camera offset
    screen.blit(player.image, (player.rect.x - camera_offset_x, player.rect.y - camera_offset_y))

    # Draw coins with camera offset
    for coin in coin_group:
        screen.blit(coin.image, (coin.rect.x - camera_offset_x, coin.rect.y - camera_offset_y))
        coin_value_text = coint_font.render(str(coin.value), True, (250, 228, 130))
        screen.blit(coin_value_text, (coin.rect.x - camera_offset_x - 10, coin.rect.y - camera_offset_y - 10))

    # Draw sea monsters with camera offset
    for sea_monster in sea_monster_group:
        screen.blit(sea_monster.image, (sea_monster.rect.x - camera_offset_x, sea_monster.rect.y - camera_offset_y))

    # Draw HUD elements (Oxygen, depth, score)
    hud.draw(screen, player, dt)

    # Draw resurface popup if necessary
    if resurface_popup_visible:
        hold_time = pygame.time.get_ticks() - hold_e_start_time if hold_e_start_time else 0
        draw_resurface_popup(screen, hold_time, hold_duration)
    
    # Draw Oxygen Level Warning if necessary 
    if hud.oxygen_level < 20:
        draw_oxygen_warning(screen)

    # Draw control popup
    control_popup.draw(screen)
    control_popup.update()

    # Draw and Update Coins collected Popup
    coins_collected_popup.update(hud.score)
    coins_collected_popup.draw(screen)

async def main():
    
    global running, dt, screen, player, coin_group, hud, control_popup, game_state, font, coint_font, player_group, sea_monster_group,coins_collected_popup
    pygame.init()
    screen = pygame.display.set_mode((Screen_Width, Screen_Height))
    
    font = pygame.font.Font('img/Pixeltype.ttf', 45)
    coint_font = pygame.font.Font('img/Pixeltype.ttf', 25)    
    # Initialize other game objects    
    player = Player() 
    player_group = pygame.sprite.GroupSingle(player)
    coin_group = pygame.sprite.Group()
    sea_monster_group = pygame.sprite.Group()
    hud = Draw_Hud()
    control_popup = ControlPopup()
    coins_collected_popup = CoinsCollectedPopup()
    game_state = "start"

    spawn_sea_monsters(sea_monster_group)
    # Call the function to spawn coins
    spawn_coins_treasures(coin_group)
    
    while running:
        handle_events()
        if game_state == "play":
            update_game_state()
        draw_screen()
                      
        await asyncio.sleep(0)  # Allow other async operations to run
        pygame.display.flip()
  
    send_game_data()    
    pygame.quit()
    
asyncio.run(main())

