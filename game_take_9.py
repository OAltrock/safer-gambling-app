import pygame
import sys
import random
import math

# Initialize Pygame
pygame.init()

# Screen dimensions
WIDTH, HEIGHT = 800, 800
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Treasure Dive")

background_img = pygame.image.load('imagefilesgame/background.png').convert()
ingame_img = pygame.image.load('imagefilesgame/background_800x711.png').convert()
character_img = pygame.image.load('imagefilesgame/diver.png')
coin_img = pygame.image.load('imagefilesgame/gold_coin.jpg')
oxygen_img = pygame.image.load('imagefilesgame/oxygen.png')
# Load images
bg_height = ingame_img.get_height()
bg_rect = ingame_img.get_rect()

original_widthc, original_heightc = character_img.get_size()
original_widthco, original_heightco = coin_img.get_size()
# Define the new size
new_widthc = original_widthc // 2
new_heightc = original_heightc // 2
new_widthco = original_widthco // 20
new_heightco = original_heightco // 20

# Scale the image
character_img_new = pygame.transform.scale(character_img, (new_widthc, new_heightc))
coin_img_new = pygame.transform.scale(coin_img, (new_widthco, new_heightco))
# Load font
font = pygame.font.Font('Pixeltype.ttf', 50)

# Colors
WHITE = (255, 255, 255)

# Game variables
coins = []
oxygen_level = 100
depth_value = 0
gold_coins_count = 0
start_time = pygame.time.get_ticks()
scroll = 0
total_scroll = 0  # New variable to track the total scroll amount
tiles = math.ceil(HEIGHT / bg_height) + 1
game_over_flag = False

class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.load_images()
        self.image = self.idle_images[0]
        self.rect = self.image.get_rect()
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
            
            img = pygame.image.load(f'imagefilesgame/{prefix}{i}.png').convert_alpha()
            original_width, original_height = img.get_size()
            new_width = int(original_width / 0.5)
            new_height = int(original_height / 0.5)
            img = pygame.transform.scale(img, (new_width, new_height))
            images.append(img)
        return images

    def update(self):
        animation_cooldown = 100  # Milliseconds between frames
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
    global scroll, total_scroll, tiles, bg_height
    # Draw scrolling background
    for i in range(0, tiles):
        screen.blit(ingame_img, (0, i * bg_height + scroll))
    
    # Scroll background
    scroll -= 5
    total_scroll -= 5
    
    # Reset scroll
    if abs(scroll) > bg_height:
        scroll = 0

    # Draw player
    player_group.draw(screen)
    
    # Draw coins
    for coin in coins:
        screen.blit(coin_img_new, (coin[0], coin[1] + scroll))
    
    #calc_oxy_dep_rate(depth_value)
    
    # Draw HUD including depth counter
    draw_hud()
    
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
    depth_value = -total_scroll // 50  # Convert total_scroll to depth in meters
    depth_text = font.render(f"Depth: {depth_value}m", True, WHITE)
    screen.blit(depth_text, (10, 100))

    screen.blit(calc_oxy_dep_disp(depth_value), (10, 130))

    
# Function to update the character position and check collisions
def update_character():
    global oxygen_level, gold_coins_count, game_over_flag, depth_value
    player_group.update()

    # Collision detection with coins
    for coin in coins[:]:
        # Ensure the coin_rect is correctly positioned and sized
        coin_rect = pygame.Rect(coin[0], coin[1] + scroll, new_widthco, new_heightco)
        if player.rect.colliderect(coin_rect):
            coins.remove(coin)
            gold_coins_count += 1
    
    
   # end game if out of oxygen
    if oxygen_level <= 0:
        game_over_flag = True

def calc_oxy_dep_disp(depth_value):
    global oxygen_level
    if depth_value < 50:
        oxygen_level -= 0.1
        speed_text = font.render("Speed: 1", True, WHITE)
        return speed_text
    elif depth_value >= 50 and depth_value < 100:
        oxygen_level -= 0.2
        speed_text = font.render("Speed: 2", True, WHITE)
        return speed_text
    elif depth_value >= 100:
        oxygen_level -= 0.3
        speed_text = font.render("Speed: 3", True, WHITE)
        return speed_text


# Function to spawn coins
def spawn_coins():
    if random.randint(1, 100) > 96:
        coin_x = random.randint(0, WIDTH - new_widthco)
        coin_y = random.randint(0, HEIGHT - new_heightco) - scroll  # Spawn coin relative to scroll position
        coins.append([coin_x, coin_y])

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
    global coins, oxygen_level, gold_coins_count, start_time, scroll, total_scroll, game_over_flag, player
    coins = []
    oxygen_level = 100
    gold_coins_count = 0
    start_time = pygame.time.get_ticks()
    scroll = 0
    total_scroll = 0  # Reset total_scroll
    game_over_flag = False
    player = Player()
    player_group.empty()
    player_group.add(player)

# Initialize player and sprite group
player = Player()
player_group = pygame.sprite.Group()
player_group.add(player)

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

    if in_start_screen:
        draw_start_screen()
    elif game_over_flag:
        draw_game_over_screen()
    else:
        spawn_coins()
        update_character()
        draw_game_screen()


    pygame.time.delay(30)

pygame.quit()
sys.exit()
