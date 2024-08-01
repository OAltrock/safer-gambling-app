import pygame
import sys
import random
import math

WIDTH, HEIGHT = 800, 400     
WHITE = (255, 255, 255)       
 

# Initialize Pygame
def main (): 
    global coins, oxygen_level, gold_coins_count, start_time, scroll, total_scroll, depth_value, tiles, game_over_flag, bg_height, bg_rect
    pygame.init()
    # Screen dimensions    
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    pygame.display.set_caption("Treasure Dive")    

    # Load images
    oxygen_img = pygame.image.load('imagefiles/oxygen.png')
    background_img = pygame.image.load('imagefiles/background.png').convert()
    ingame_img = pygame.image.load('imagefiles/background_800x711.png').convert()
    character_img = pygame.image.load('imagefiles/diver.png')
    coin_img = pygame.image.load('imagefiles/gold coin.png')
    
    

    # Load and resize obstacle images
    images = [pygame.image.load('imagefiles/prop1.png').convert_alpha(), pygame.image.load('imagefiles/prop2.png').convert_alpha(),
            pygame.image.load('imagefiles/prop3.png').convert_alpha(), pygame.image.load('imagefiles/prop4.png').convert_alpha()]
    for i in range(len(images)):
        images[i] = pygame.transform.scale(images[i], (images[i].get_width() // 2, images[i].get_height() // 2))

    # Get image heights
    bg_height = ingame_img.get_height()
    bg_rect = ingame_img.get_rect()

    # Define the new size for character and coins
    character_img = pygame.transform.scale(character_img, (character_img.get_width() // 0.5, character_img.get_height() // 0.5))
    coin_img = pygame.transform.scale(coin_img, (coin_img.get_width() // 6, coin_img.get_height() // 6))

    # Load font
    font = pygame.font.Font('Pixeltype.ttf', 50)

    # Colors
    
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
            self.idle_images = self.load_animation_images('imagefiles/idle', 6)
            self.moving_images = self.load_animation_images('imagefiles/moving', 6)

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
            global oxygen_level

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

        # Draw obstacles
        obstacle_group.draw(screen)

        # Draw HUD
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

        # Oxygen depletion
        oxygen_level -= 0.1
        if oxygen_level <= 0:
            game_over_flag = True


    # Function to spawn coins
    def spawn_coins(obstacle_group, coin_group):
        if random.randint(1, 100) > 98:
            while True:
                coin_x = random.randint(0, WIDTH - coin_img.get_width())
                coin_y = HEIGHT  # Spawn at the bottom
                coin_rect = pygame.Rect(coin_x, coin_y, coin_img.get_width(), coin_img.get_height())
                collision = any(coin_rect.colliderect(obstacle.rect) for obstacle in obstacle_group)
                if not collision:
                    coin = Coin(coin_x, coin_y)
                    coin_group.add(coin)
                    break


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
        global coins, oxygen_level, gold_coins_count, start_time, scroll, total_scroll, game_over_flag, player, coin_group
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

    # Initialize player, obstacle group, coin group, and sprite group
    player = Player()
    player_group = pygame.sprite.Group()
    player_group.add(player)
    obstacle_group = pygame.sprite.Group()
    coin_group = pygame.sprite.Group()

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
            spawn_coins(obstacle_group, coin_group)
            spawn_obstacle(depth_value, screen.get_width(), obstacle_group, images)
            update_character()
            obstacle_group.update(5)  # Update obstacle positions to move upwards
            coin_group.update(5)  # Update coin positions to move upwards
            draw_game_screen()

        pygame.time.delay(30)
    pygame.quit()    
    return gold_coins_count
    sys.exit()
    
if __name__ == "__main__":
    with open("score.txt", "w") as scoreFile:
        scoreFile.write(str(-1))
    result = main()    
    with open("score.txt", "w") as scoreFile:
        scoreFile.write(str(result))
    
    
    