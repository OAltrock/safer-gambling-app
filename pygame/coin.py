import pygame

coin_img = pygame.image.load('img/7.png').convert_alpha()

# Coin class for sprites
class Coin(pygame.sprite.Sprite):
    def __init__(self, x, y, value):
        super().__init__()
        self.image = coin_img
        self.rect = self.image.get_rect()
        self.rect.x = x
        self.rect.y = y
        self.value = round(value)  # Store the coin's value
