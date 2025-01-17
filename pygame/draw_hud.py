import pygame


map_rows = 20
clock = pygame.time.Clock()
dt = clock.tick(60) / 1000
font = pygame.font.Font('img/Pixeltype.ttf', 45)
Beach_img = pygame.image.load('img/Beach.png').convert()
tile_height = Beach_img.get_height()
map_height = Beach_img.get_height() * map_rows


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
            # depletion rate was 0.025/100
            depletion_rate = 0.05 / 100
        elif 5 <= player_row <= 15: 
            # depletion rate was 0.05/100
            depletion_rate = 0.1 / 100
        else:
            depletion_rate = 0.3 / 100
            
        self.oxygen_level = max(self.oxygen_level - depletion_rate * dt * 1000, 0)  # Ensure oxygen doesn't drop below 0%

    def get_depth(self, player_y):
        max_depth = 140
        depth = (player_y / map_height) * max_depth
        return f"{int(depth)}"

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
        depth_text = font.render(f"Depth: {depth_value}m", True, (250, 228, 130))
        score_text = font.render(f"Score: {round(self.score)}", True, (250, 228, 130))  # Display the score
        screen.blit(oxygen_text, (50, 50))
        screen.blit(depth_text, (50, 90))
        screen.blit(score_text, (50, 130))  # Position for score