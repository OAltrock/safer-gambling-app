import pygame
import random

sea_monster_img = pygame.image.load('img/sea_monster.png').convert()


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