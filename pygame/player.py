import pygame

Screen_Width = 1280 
Screen_Height = 720

Beach_img = pygame.image.load('img/Beach.png').convert()

tile_width = Beach_img.get_width()
tile_height = Beach_img.get_height()
tile_color = (61, 156, 196)

# Define the zone boundaries
ZONE_BOUNDARIES = {
    "Shallow": (tile_height * 1, tile_height * 2),
    "Mid": (tile_height * 5, tile_height * 7),
    "Deep": (tile_height * 12, tile_height * 19)
}

map_cols = 5
map_rows = 20
map_width = Beach_img.get_width() * map_cols
map_height = Beach_img.get_height() * map_rows


# Define Player class 
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
        self.moving = False
        self.facing_left = False
        self.invincible = False
        self.invincible_duration = 1000  # 1 second in milliseconds
        self.invincible_start_time = 0
        self.blink_interval = 100  # Blink every 100ms
        self.visible = True
        self.original_image = None  # Store the original image before alpha changes

        # Hitbox parameters
        hitbox_scale = 0.7  
        hitbox_width = int(self.rect.width * hitbox_scale)
        hitbox_height = int(self.rect.height * hitbox_scale)

        # Create hitbox and center it on the player rect
        self.hitbox = pygame.Rect(
            self.rect.centerx - hitbox_width // 2,
            self.rect.centery - hitbox_height // 2,
            hitbox_width,
            hitbox_height
        )

    def set_invincible(self, duration):
        self.invincible = True
        self.invincible_start_time = pygame.time.get_ticks()
        self.invincible_duration = duration * 1000  # Convert to milliseconds
        self.visible = True

    def get_position(self):
        return self.rect.center

    def load_images(self):
        self.idle_images = self.load_animation_images('./img/idle', 6)
        self.moving_images = self.load_animation_images('./img/moving', 6)

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

        # Update the hitbox to follow the player's position
        self.hitbox.centerx = self.rect.centerx
        self.hitbox.centery = self.rect.centery

        self.animate()
        self.handle_invincibility()

    def handle_invincibility(self):
        current_time = pygame.time.get_ticks()
        
        # Check if invincibility should end
        if self.invincible:
            if current_time - self.invincible_start_time >= self.invincible_duration:
                self.invincible = False
                self.visible = True
                self.image.set_alpha(255)
            else:
                # Handle blinking
                elapsed_time = current_time - self.invincible_start_time
                self.visible = (elapsed_time // self.blink_interval) % 2 == 0
                self.image.set_alpha(255 if self.visible else 64)

    def animate(self):
        # Store the current alpha value
        current_alpha = self.image.get_alpha()

        # Update animation frame
        if self.moving:
            self.image = self.moving_images[self.frame_index]
        else:
            self.image = self.idle_images[self.frame_index]

        # Update frame index
        if pygame.time.get_ticks() - self.update_time > 100:
            self.frame_index = (self.frame_index + 1) % len(self.idle_images)
            self.update_time = pygame.time.get_ticks()

        # Handle facing direction
        if self.facing_left:
            self.image = pygame.transform.flip(self.image, True, False)

        # Restore alpha value after changing image
        self.image.set_alpha(current_alpha)
