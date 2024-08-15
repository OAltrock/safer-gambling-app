import pygame
import sys
import random
import math

# Initialize Pygame
pygame.init()

# Screen dimensions
WIDTH, HEIGHT = 800, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Treasure Dive")

# Load images
background_img = pygame.image.load('background.png').convert()
ingame_img = pygame.image.load('background_800x711.png').convert()
character_img = pygame.image.load('diver.png')
coin_img = pygame.image.load('gold coin.png')
treasure_img = pygame.image.load('treasure.png')
oxygen_img = pygame.image.load('oxygen.png')
pause_button_img = pygame.image.load('pause_button.png')
sea_monster_img = pygame.image.load('sea_monster.png')

# Load and resize obstacle images
images = [pygame.image.load('prop1.png').convert_alpha(), pygame.image.load('prop2.png').convert_alpha(),
          pygame.image.load('prop3.png').convert_alpha(), pygame.image.load('prop4.png').convert_alpha()]
for i in range(len(images)):
    images[i] = pygame.transform.scale(images[i], (images[i].get_width() // 2, images[i].get_height() // 2))

# Get image heights
bg_height = ingame_img.get_height()
bg_rect = ingame_img.get_rect()

# Define the new size for character and coins
character_img = pygame.transform.scale(character_img, (character_img.get_width() // 0.5, character_img.get_height() // 0.5))
coin_img = pygame.transform.scale(coin_img, (coin_img.get_width() // 6, coin_img.get_height() // 6))
treasure_img = pygame.transform.scale(treasure_img, (treasure_img.get_width() // 6, treasure_img.get_height() // 6))
pause_button_img = pygame.transform.scale(pause_button_img, (50, 50))
sea_monster_img = pygame.transform.scale(sea_monster_img, (100, 50))

# Load font
font = pygame.font.Font('Pixeltype.ttf', 50)

# Colors
WHITE = (255, 255, 255)

# Game variables
coins = []
oxygen_level = 100
gold_coins_count = 0
start_time = pygame.time.get_ticks()
scroll = 0
total_scroll = 0  # Track total scroll amount
depth_value = 0
tiles = math.ceil(HEIGHT / bg_height) + 1
game_over_flag = False
paused = False
showing_details = False
showing_controls = False

#Create all the different classes(obstacle,player,coins,etc.)
class Obstacle(pygame.sprite.Sprite):
    def __init__(self, screen_width, images):
        super().__init__()
        self.image = random.choice(images)
        self.rect = self.image.get_bounding_rect()
        self.rect.x = random.randint(0, screen_width - self.rect.width)
        self.rect.y = HEIGHT

    def update(self, speed):
        self.rect.y -= speed
        if self.rect.y < -self.rect.height:
            self.kill()

def spawn_obstacle(depth_value, screen_width, obstacle_group, images):
    spawn_chance = 0
    if 0 <= depth_value <= 50:
        spawn_chance = 0.002
    elif 50 < depth_value <= 100:
        spawn_chance = 0.005
    elif depth_value > 100:
        spawn_chance = 0.01

    if random.random() < spawn_chance:
        obstacle = Obstacle(screen_width, images)
        obstacle_group.add(obstacle)

class Coin(pygame.sprite.Sprite):
    def __init__(self, x, y):
        super().__init__()
        self.image = coin_img
        self.rect = self.image.get_bounding_rect()
        self.rect.x = x
        self.rect.y = y

    def update(self, speed):
        self.rect.y -= speed
        if self.rect.y < -self.rect.height:
            self.kill()

class Treasure(Coin):
    def __init__(self, x, y):
        super().__init__(x, y)
        self.image = treasure_img

import pygame
import random

class SeaMonster(pygame.sprite.Sprite):
    def __init__(self, x, y):
        super().__init__()
        self.image = sea_monster_img
        self.rect = self.image.get_rect()
        self.rect.x = x
        self.rect.y = y
        # Randomly choose the direction: -1 for left, 1 for right
        self.direction = random.choice([-1, 1])
        
        # Flip the image if the direction is left
        if self.direction == -1:
            self.image = pygame.transform.flip(self.image, True, False)
        
        # Set a random speed for the monster
        self.speed = random.randint(1, 5)  # Adjust as needed

    def update(self, speed):
        self.rect.y -= speed
        if self.rect.y < -self.rect.height:
            self.kill()
        # Move the monster horizontally
        self.rect.x += self.speed * self.direction
        
        # Kill the monster if it moves off the screen
        if self.rect.right < 0 or self.rect.left > pygame.display.get_surface().get_width():
            self.kill()


class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.load_images()
        self.image = self.idle_images[0]
        self.rect = self.image.get_bounding_rect()
        self.rect.topleft = [WIDTH // 10, HEIGHT // 10]
        self.frame_index = 0
        self.update_time = pygame.time.get_ticks()
        self.speed = [0, 0]
        self.gravity = 0.5
        self.moving = False
        self.facing_left = False

    def load_images(self):
        self.idle_images = self.load_animation_images('idle', 6)
        self.moving_images = self.load_animation_images('moving', 6)

    def load_animation_images(self, prefix, num_frames):
        images = []
        for i in range(1, num_frames + 1):
            img = pygame.image.load(f'{prefix}{i}.png').convert_alpha()
            img = pygame.transform.scale(img, (img.get_width() // 0.5, img.get_height() // 0.5))
            images.append(img)
        return images

    def update(self):
        animation_cooldown = 100
        current_time = pygame.time.get_ticks()
        if current_time - self.update_time > animation_cooldown:
            self.frame_index += 1
            self.update_time = current_time
            if self.frame_index >= len(self.get_current_images()):
                self.frame_index = 0

            self.image = self.get_current_images()[self.frame_index]

            # Flip image if facing left
            if self.facing_left:
                self.image = pygame.transform.flip(self.image, True, False)

        # Update position
        self.handle_keys()

        # Check for collision with obstacles before moving
        self.check_collision()

        self.rect.x += self.speed[0]
        self.rect.y += self.speed[1]

        # Boundary check
        if self.rect.left < 0:
            self.rect.left = 0
        elif self.rect.right > WIDTH:
            self.rect.right = WIDTH

        if self.rect.top < 0:
            self.rect.top = 0
        elif self.rect.bottom > HEIGHT:
            self.rect.bottom = HEIGHT

    def handle_keys(self):
        keys = pygame.key.get_pressed()
        self.moving = False
        if keys[pygame.K_LEFT]:
            self.speed[0] = -10
            self.moving = True
            self.facing_left = True
        elif keys[pygame.K_RIGHT]:
            self.speed[0] = 10
            self.moving = True
            self.facing_left = False
        else:
            self.speed[0] = 0

        if keys[pygame.K_UP]:
            self.speed[1] = -10
            self.moving = True
        elif keys[pygame.K_DOWN]:
            self.speed[1] = 10
            self.moving = True
        else:
            self.speed[1] += self.gravity

    def check_collision(self):
        global oxygen_level, game_over_flag

        # Predict the new position
        new_rect = self.rect.move(self.speed[0], self.speed[1])

        # Check collision with obstacles
        for obstacle in obstacle_group:
            if new_rect.colliderect(obstacle.rect):
                if self.speed[0] > 0:  # Moving right
                    self.rect.right = obstacle.rect.left
                elif self.speed[0] < 0:  # Moving left
                    self.rect.left = obstacle.rect.right
                if self.speed[1] > 0:  # Moving down
                    self.rect.bottom = obstacle.rect.top
                elif self.speed[1] < 0:  # Moving up
                    self.rect.top = obstacle.rect.bottom

                # Apply penalty
                oxygen_level -= 2
                if oxygen_level <= 0:
                    game_over_flag = True

                # Reset speed
                self.speed = [0, 0]
                break

        # Check collision with sea monsters
        for monster in sea_monster_group:
            if new_rect.colliderect(monster.rect):
                game_over_flag = True

    def get_current_images(self):
        if self.moving:
            return self.moving_images
        else:
            return self.idle_images

# Function to draw the initial start screen
def draw_start_screen():
    screen.blit(background_img, (0, 0))
    title_text = font.render("Treasure Dive", True, WHITE)
    start_text = font.render("Press SPACE to Start", True, WHITE)
    screen.blit(title_text, (WIDTH // 2 - title_text.get_width() // 2, HEIGHT // 2 - 50))
    screen.blit(start_text, (WIDTH // 2 - start_text.get_width() // 2, HEIGHT // 2))
    pygame.display.flip()

# Function to draw the main game screen
def draw_game_screen():
    global scroll, total_scroll, tiles, bg_height, depth_value

    # Draw scrolling background
    for i in range(0, tiles):
        screen.blit(ingame_img, (0, i * bg_height + scroll))

    # Scroll background
    scroll -= 10
    total_scroll -= 10

    # Reset scroll
    if abs(scroll) > bg_height:
        scroll = 0

    # Update depth_value
    depth_value = -total_scroll // 50

    # Draw player
    player_group.draw(screen)

    # Draw coins
    coin_group.draw(screen)

    # Draw treasures
    treasure_group.draw(screen)

    # Draw sea monsters
    sea_monster_group.draw(screen)

    # Draw obstacles
    obstacle_group.draw(screen)

    # Draw HUD
    draw_hud()

    # Draw pause button
    screen.blit(pause_button_img, (WIDTH - 60, 10))

    pygame.display.flip()

# Function to draw the HUD
def draw_hud():
    global oxygen_level, gold_coins_count, total_scroll
    oxygen_text = font.render(f"Oxygen: {int(oxygen_level)}", True, WHITE)
    coins_text = font.render(f"Coins: {gold_coins_count}", True, WHITE)

    # Draw text on screen
    screen.blit(oxygen_text, (10, 40))
    screen.blit(coins_text, (10, 70))

    # Depth in meters
    depth_text = font.render(f"Depth: {depth_value}m", True, WHITE)
    screen.blit(depth_text, (10, 100))

def update_character():
    global oxygen_level, gold_coins_count, game_over_flag
    player_group.update()

    # Collision detection with coins
    for coin in coin_group:
        if player.rect.colliderect(coin.rect):
            coin.kill()
            gold_coins_count += 1

    # Collision detection with treasures
    for treasure in treasure_group:
        if player.rect.colliderect(treasure.rect):
            treasure.kill()
            gold_coins_count += 5

    # Oxygen depletion
    oxygen_level -= 0.1
    if oxygen_level <= 0:
        game_over_flag = True

# Function to spawn coins and treasures
def spawn_coins_treasures(obstacle_group, coin_group, treasure_group, depth_value):
    if random.randint(1, 100) > 98:
        while True:
            x = random.randint(0, WIDTH - coin_img.get_width())
            y = HEIGHT  
            rect = pygame.Rect(x, y, coin_img.get_width(), coin_img.get_height())
            collision = any(rect.colliderect(obstacle.rect) for obstacle in obstacle_group)
            if not collision:
                if random.random() < (0.01 if depth_value <= 50 else 0.02 if depth_value <= 100 else 0.03):
                    treasure = Treasure(x, y)
                    treasure_group.add(treasure)
                else:
                    coin = Coin(x, y)
                    coin_group.add(coin)
                break

def spawn_sea_monster(depth_value, screen_width, sea_monster_group):
    spawn_chance = 0
    if 0 <= depth_value <= 50:
        spawn_chance = 0.01
    elif 50 < depth_value <= 100:
        spawn_chance = 0.02
    elif depth_value > 100:
        spawn_chance = 0.03

    if random.random() < spawn_chance:
        monster = SeaMonster(random.randint(0, screen_width - sea_monster_img.get_width()), HEIGHT)
        sea_monster_group.add(monster)

# Function to draw the pause menu
def draw_pause_menu():
    screen.fill((0, 0, 0))
    draw_menu_options()
    pygame.display.flip()

def draw_menu_options():
    menu_items = ["Game Details", "Controls", "Resume", "Quit"]
    for idx, item in enumerate(menu_items):
        menu_text = font.render(item, True, WHITE)
        screen.blit(menu_text, (WIDTH // 2 - menu_text.get_width() // 2, HEIGHT // 2 - 100 + idx * 50))

# Function to handle menu option clicks
def handle_menu_click(mouse_pos):
    global paused, showing_details, showing_controls, game_over_flag

    menu_rects = []
    menu_items = ["Game Details", "Controls", "Resume", "Quit"]
    for idx, item in enumerate(menu_items):
        menu_text = font.render(item, True, WHITE)
        menu_rects.append(menu_text.get_rect(center=(WIDTH // 2, HEIGHT // 2 - 100 + idx * 50)))

    for idx, rect in enumerate(menu_rects):
        if rect.collidepoint(mouse_pos):
            if idx == 0:  # Game Details
                showing_details = True
                showing_controls = False
            elif idx == 1:  # Controls
                showing_details = False
                showing_controls = True
            elif idx == 2:  # Resume
                paused = False
                showing_details = False
                showing_controls = False
            elif idx == 3:  # Quit
                game_over_flag = True
                paused = False

# Function to draw the game details screen
def draw_game_details():
    screen.fill((0, 0, 0))
    details_text = [
        "You are a diver hunting for treasure under the sea.",
        "Your goal is to collect as much treasure as possible",
        "before your oxygen runs out. The deeper you go the more",
        "treasure you'll find, however your oxygen will deplete",
        "at a faster rate and also you'll encounter more obstacles",
        "and foes. If you get stuck on an obstacle, your oxygen",
        "will deplete faster as long as you continue to touch it.",
        "If you run into a sea monster the game ends."
    ]
    for idx, line in enumerate(details_text):
        line_text = font.render(line, True, WHITE)
        screen.blit(line_text, (WIDTH // 2 - line_text.get_width() // 2, HEIGHT // 4 + idx * 30))
     # Draw back button
    back_text = font.render("Back", True, WHITE)
    screen.blit(back_text, (WIDTH // 2 - back_text.get_width() // 2, HEIGHT - 100))
    pygame.display.flip()

# Function to draw the controls screen
def draw_controls():
    screen.fill((0, 0, 0))
    controls_text = [
        "Use your arrow keys to navigate" ,
           "the character around the screen."
    ]
    for idx, line in enumerate(controls_text):
        line_text = font.render(line, True, WHITE)
        screen.blit(line_text, (WIDTH // 2 - line_text.get_width() // 2, HEIGHT // 4 + idx * 30))
    pygame.display.flip()
    
    # Draw back button
    back_text = font.render("Back", True, WHITE)
    screen.blit(back_text, (WIDTH // 2 - back_text.get_width() // 2, HEIGHT - 100))
    pygame.display.flip()
    
def handle_back_button_click(mouse_pos):
    global showing_details, showing_controls
    back_text = font.render("Back", True, WHITE)
    back_rect = back_text.get_rect(center=(WIDTH // 2, HEIGHT - 100))
    if back_rect.collidepoint(mouse_pos):
        showing_details = False
        showing_controls = False

# Function to draw the game over screen
def draw_game_over_screen():
    screen.blit(background_img, (0, 0))
    game_over_text = font.render("Game Over", True, WHITE)
    score_text = font.render(f"Score: {gold_coins_count}", True, WHITE)
    restart_text = font.render("Press R to Restart", True, WHITE)
    screen.blit(game_over_text, (WIDTH // 2 - game_over_text.get_width() // 2, HEIGHT // 2 - 50))
    screen.blit(score_text, (WIDTH // 2 - score_text.get_width() // 2, HEIGHT // 2))
    screen.blit(restart_text, (WIDTH // 2 - restart_text.get_width() // 2, HEIGHT // 2 + 50))
    pygame.display.flip()

# Function to reset the game
def reset_game():
    global coins, oxygen_level, gold_coins_count, start_time, scroll, total_scroll, game_over_flag, player, coin_group, treasure_group, sea_monster_group
    coins = []
    oxygen_level = 100
    gold_coins_count = 0
    start_time = pygame.time.get_ticks()
    scroll = 0
    total_scroll = 0
    game_over_flag = False
    player = Player()
    player_group.empty()
    player_group.add(player)
    obstacle_group.empty()
    coin_group.empty()
    treasure_group.empty()
    sea_monster_group.empty()

# Initialize groups
player = Player()
player_group = pygame.sprite.Group()
player_group.add(player)
obstacle_group = pygame.sprite.Group()
coin_group = pygame.sprite.Group()
treasure_group = pygame.sprite.Group()
sea_monster_group = pygame.sprite.Group()

# Main loop
running = True
in_start_screen = True

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            if in_start_screen and event.key == pygame.K_SPACE:
                in_start_screen = False
                start_time = pygame.time.get_ticks()
            elif game_over_flag and event.key == pygame.K_r:
                reset_game()
            elif not game_over_flag and event.key == pygame.K_p:
                paused = not paused

        if event.type == pygame.MOUSEBUTTONDOWN:
            mouse_pos = event.pos
            if pause_button_img.get_rect(topleft=(WIDTH - 60, 10)).collidepoint(mouse_pos):
                paused = not paused
            if paused:
                handle_menu_click(mouse_pos)
            if showing_details or showing_controls:
                handle_back_button_click(mouse_pos)

    if in_start_screen:
        draw_start_screen()
    elif game_over_flag:
        draw_game_over_screen()
    elif paused:
        if showing_details:
            draw_game_details()
        elif showing_controls:
            draw_controls()
        else:
            draw_pause_menu()
    else:
        spawn_coins_treasures(obstacle_group, coin_group, treasure_group, depth_value)
        spawn_obstacle(depth_value, WIDTH, obstacle_group, images)
        spawn_sea_monster(depth_value, WIDTH, sea_monster_group)
        obstacle_group.update(10)
        coin_group.update(10)
        treasure_group.update(10)
        sea_monster_group.update(5)
        draw_game_screen()
        update_character()

    pygame.time.delay(30)

pygame.quit()
sys.exit()
