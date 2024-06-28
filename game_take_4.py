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

background_img = pygame.image.load('background.png').convert()
ingame_img = pygame.image.load('background_800x711.png').convert()
character_img = pygame.image.load('diver.png')
coin_img = pygame.image.load('gold coin.png')
oxygen_img = pygame.image.load('oxygen.png')
# Load images
bg_height = ingame_img.get_height()
bg_rect = ingame_img.get_rect()

original_widthc, original_heightc = character_img.get_size()
original_widthco, original_heightco = coin_img.get_size()
# Define the new size
new_widthc = original_widthc // 2
new_heightc = original_heightc // 2
new_widthco = original_widthco // 4
new_heightco = original_heightco // 4

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
gold_coins_count = 0
start_time = pygame.time.get_ticks()
scroll = 0
tiles = math.ceil(HEIGHT / bg_height) + 1

class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.load_images()
        self.image = self.images[0]
        self.rect = self.image.get_rect()
        self.rect.topleft = [WIDTH // 10, HEIGHT // 10]
        self.frame_index = 0
        self.update_time = pygame.time.get_ticks()
        self.speed = [0, 0]
        self.gravity = 0.5
     #Function to Load and scale the diver animation frames
    def load_images(self):
        self.images = []
        for i in range(1, 7):  # We have 6 frames named diver1.png, diver2.png, etc.
            img = pygame.image.load(f'idle{i}.png').convert_alpha()
            original_width, original_height = img.get_size()
            new_width = original_width // .5
            new_height = original_height //.5
            img = pygame.transform.scale(img, (new_width, new_height))
            self.images.append(img)
    #Function to Update animation frame
    def update(self):
        animation_cooldown = 100  # Milliseconds between frames
        current_time = pygame.time.get_ticks()
        if current_time - self.update_time > animation_cooldown:
            self.frame_index += 1
            self.update_time = current_time
            if self.frame_index >= len(self.images):
                self.frame_index = 0
            self.image = self.images[self.frame_index]
        
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
    #Function for pressing keys
    def handle_keys(self):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:
            self.speed[0] = -10
        elif keys[pygame.K_RIGHT]:
            self.speed[0] = 5
        else:
            self.speed[0] = 0

        if keys[pygame.K_UP]:
            self.speed[1] = -10
        elif keys[pygame.K_DOWN]:
            self.speed[1] = 15
        else:
            self.speed[1] += self.gravity

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
    global scroll, tiles, bg_height
    # Draw scrolling background
    for i in range(0, tiles):
        screen.blit(ingame_img, (0, i * bg_height + scroll))
    
    # Scroll background
    scroll -= 5
    
    # Reset scroll
    if abs(scroll) > bg_height:
        scroll = 0

    # Draw player
    player_group.draw(screen)
    
    # Draw coins
    for coin in coins:
        screen.blit(coin_img_new, (coin[0], coin[1] + scroll))

    draw_hud()
    pygame.display.flip()

# Function to draw the HUD
def draw_hud():
    global oxygen_level, gold_coins_count, start_time
    time_elapsed = (pygame.time.get_ticks() - start_time) // 1000
    time_text = font.render(f"Time: {time_elapsed}", True, WHITE)
    oxygen_text = font.render(f"Oxygen: {int(oxygen_level)}", True, WHITE)
    coins_text = font.render(f"Coins: {gold_coins_count}", True, WHITE)
    screen.blit(time_text, (10, 10))
    screen.blit(oxygen_text, (10, 40))
    screen.blit(coins_text, (10, 70))

# Function to update the character position and check collisions
def update_character():
    global oxygen_level, gold_coins_count
    player_group.update()

    # Collision detection with coins
    for coin in coins[:]:
        coin_rect = pygame.Rect(coin[0], coin[1] + scroll, coin_img_new.get_width(), coin_img_new.get_height())
        if player.rect.colliderect(coin_rect):
            coins.remove(coin)
            gold_coins_count += 1

    # Oxygen depletion
    oxygen_level -= 0.05
    if oxygen_level <= 0:
        game_over()

# Function to spawn coins
def spawn_coins():
    if random.randint(1, 100) > 98:
        coin_x = random.randint(0, WIDTH - coin_img_new.get_width())
        coin_y = random.randint(0, HEIGHT - coin_img_new.get_height()) - scroll  # Spawn coin relative to scroll position
        coins.append([coin_x, coin_y])

# Game over function
def game_over():
    global running
    running = False

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

    if in_start_screen:
        draw_start_screen()
    else:
        spawn_coins()
        update_character()
        draw_game_screen()

    pygame.time.delay(30)

pygame.quit()
sys.exit()
