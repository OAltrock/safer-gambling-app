import pygame
import sys
import random
import numpy as np

# Start Game + Setup
pygame.init()

Screen_Width = pygame.display.Info().current_w - 210
Screen_Height = pygame.display.Info().current_h - 110
screen = pygame.display.set_mode((Screen_Width, Screen_Height))

# Ingame Clock + Running = true , delta time
clock = pygame.time.Clock()
running = True
dt = 0

pygame.display.set_caption("Treasure Dive")

# Variables
Shallow_Coins = []
Mid_Coins = []
Deep_Coins = []
gold_coins_count = 0
zones = ["Shallow", "Mid", "Deep"]

# Load images
Beach_img = pygame.image.load('./imagefiles/Beach.png').convert()
shallow_img = pygame.image.load('./imagefiles/Shallow.png').convert()
medium_deep_img = pygame.image.load('./imagefiles/medium_deep.png').convert()
deep_img = pygame.image.load('./imagefiles/deep.png').convert()
coin_img = pygame.image.load('./imagefiles/7.png').convert_alpha()
ingame_img = pygame.image.load('./imagefiles/background_800x711.png').convert()
background_img = pygame.image.load('./imagefiles/background.png').convert()

map_cols = 5
map_rows = 20
map_width = Beach_img.get_width() * map_cols
map_height = Beach_img.get_height() * map_rows

tile_width = Beach_img.get_width()
tile_height = Beach_img.get_height()
tile_color = (61, 156, 196)

# Font settings for the HUD
font = pygame.font.Font('./imagefiles/Pixeltype.ttf', 45)
coint_font = pygame.font.Font('./imagefiles/Pixeltype.ttf',25)

# Colors
WHITE = (255, 255, 255)

# Define Player class (same as before)
class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.load_images()
        self.image = self.idle_images[0]
        self.rect = self.image.get_rect()
        self.rect.topleft = [Screen_Width // 2, Screen_Height // 2]
        self.frame_index = 0
        self.update_time = pygame.time.get_ticks()
        self.speed = [0, 0]
        self.gravity = 0.5
        self.moving = False
        self.facing_left = False

    def load_images(self):
        self.idle_images = self.load_animation_images('./imagefiles/idle', 6)
        self.moving_images = self.load_animation_images('./imagefiles/moving', 6)

    def load_animation_images(self, prefix, num_frames):
        images = []
        for i in range(1, num_frames + 1):
            img = pygame.image.load(f'{prefix}{i}.png').convert_alpha()
            img = pygame.transform.scale(img, (img.get_width() * 1.5, img.get_height() * 1.5))
            images.append(img)
        return images

    def update(self, dt):
        self.moving = False
        keys = pygame.key.get_pressed()
        if keys[pygame.K_w]:
            self.rect.y -= 220 * dt
            self.moving = True
        if keys[pygame.K_s]:
            self.rect.y += 165 * dt
            self.moving = True
        if keys[pygame.K_a]:
            self.rect.x -= 250 * dt
            self.moving = True
            self.facing_left = True
        if keys[pygame.K_d]:
            self.rect.x += 250 * dt
            self.moving = True
            self.facing_left = False

        # Keep player within map bounds
        self.rect.x = max(0, min(self.rect.x, map_width - self.rect.width))
        self.rect.y = max(0, min(self.rect.y, map_height - self.rect.height))

        self.animate()

    def animate(self):
        if self.moving:
            self.image = self.moving_images[self.frame_index]
        else:
            self.image = self.idle_images[self.frame_index]

        if pygame.time.get_ticks() - self.update_time > 100:
            self.frame_index = (self.frame_index + 1) % len(self.idle_images)
            self.update_time = pygame.time.get_ticks()

        if self.facing_left:
            self.image = pygame.transform.flip(self.image, True, False)

# Initialize player
player = Player()

# Sprite Groups
player_group = pygame.sprite.GroupSingle(player)
coin_group = pygame.sprite.Group()

# HUD Class
class Draw_Hud:
    def __init__(self):
        self.oxygen_level = 100  # Starting oxygen level in seconds
        self.last_update_time = pygame.time.get_ticks()
        self.shallow_coin_count = 0
        self.mid_coin_count = 0
        self.deep_coin_count = 0
        self.score = 0  # New attribute for the score
    
    def update_oxygen(self, player_y):
        player_row = player_y // tile_height
        if player_row <= 4:  
            depletion_rate = 0.025 / 100
        elif 5 <= player_row <= 15: 
            depletion_rate = 0.05 / 100
        else:
            depletion_rate = 0.3 / 100
            
        self.oxygen_level = max(self.oxygen_level - depletion_rate * dt * 1000, 0)  # Ensure oxygen doesn't drop below 0%

    def get_depth(self, player_y):
        max_depth = 140
        depth = (player_y / map_height) * max_depth
        return f"{int(depth)}m"

    def update_coin_count(self, shallow_count, mid_count, deep_count):
        self.shallow_coin_count = shallow_count
        self.mid_coin_count = mid_count
        self.deep_coin_count = deep_count

    def update_score(self, score):
        self.score += score

    def draw(self, screen, player, dt):
        self.update_oxygen(player.rect.y)
        depth_value = self.get_depth(player.rect.y)
        oxygen_text = font.render(f"Oxygen: {int(self.oxygen_level)}%", True, (250, 228, 130))
        depth_text = font.render(f"Depth: {depth_value}", True, (250, 228, 130))
        score_text = font.render(f"Score: {round(self.score)}", True, (250, 228, 130))  # Display the score
        screen.blit(oxygen_text, (50, 50))
        screen.blit(depth_text, (50, 90))
        screen.blit(score_text, (50, 130))  # Position for score

# Instantiate the HUD
hud = Draw_Hud()

def draw_start_screen():
    screen.blit(background_img, (0, 0))
    title_text = font.render("Treasure Dive", True, WHITE)
    start_text = font.render("Press SPACE to Start", True, WHITE)
    screen.blit(title_text, (tile_width - title_text.get_width() // 2, tile_height // 2-50))
    screen.blit(start_text, (tile_width - start_text.get_width() // 2, tile_height // 2))
    pygame.display.flip()

# Coin class for sprites
class Coin(pygame.sprite.Sprite):
    def __init__(self, x, y, value):
        super().__init__()
        self.image = coin_img
        self.rect = self.image.get_rect()
        self.rect.x = x
        self.rect.y = y
        self.value = round(value)  # Store the coin's value

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

# Call the function to spawn coins
spawn_coins_treasures(coin_group)

# Game states
game_state = "start"

# Main Game Loop
while running:
    screen.fill((0, 0, 0))

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN and game_state == "start":
            if event.key == pygame.K_SPACE:
                game_state = "play"

    if game_state == "start":
        # Draw start screen
        draw_start_screen()
    elif game_state == "play":
        # Update player and game
        player.update(dt)

        # Check for player collisions with coins
        collected_coins = pygame.sprite.spritecollide(player, coin_group, True)
        for coin in collected_coins:
            hud.update_score(coin.value)

        # Camera offset for scrolling
        camera_offset_x = player.rect.centerx - Screen_Width // 2
        camera_offset_y = player.rect.centery - Screen_Height // 2

        # Draw tiles
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

        # Draw player
        screen.blit(player.image, (player.rect.x - camera_offset_x, player.rect.y - camera_offset_y))

        # Draw coins
        for coin in coin_group:
            screen.blit(coin.image, (coin.rect.x - camera_offset_x, coin.rect.y - camera_offset_y))
            coin_value_text = coint_font.render(str(coin.value), True, (250,228,130)) 
            screen.blit(coin_value_text, (coin.rect.x - camera_offset_x - 10, coin.rect.y - camera_offset_y - 10))  # 5 pixels above coin


        # Draw HUD
        hud.draw(screen, player,dt)

    pygame.display.flip()
    dt = clock.tick(60) / 1000

pygame.quit()
sys.exit()