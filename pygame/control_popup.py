import pygame

Screen_Width = 1280 
Screen_Height = 720
WHITE = (255, 255, 255)

font = pygame.font.Font('img/Pixeltype.ttf', 45)

class ControlPopup:
    def __init__(self):
        self.font = font
        self.text = [
            "Controls:",
            "W - Move Up",
            "S - Move Down",
            "A - Move Left",
            "D - Move Right",
            "ESC - Pause"
        ]
        self.display_time = 2500  # Popup will be displayed for 2.5 seconds
        self.start_time = 0
        self.visible = True

    def start(self):
        self.start_time = pygame.time.get_ticks()
        self.visible = True

    def update(self):
        if not self.visible:
            return
        current_time = pygame.time.get_ticks()
        if current_time - self.start_time > self.display_time:
            self.visible = False

    def draw(self, screen):
        if self.visible:
            surface = pygame.Surface((300, 250))  # Surface for popup
            surface.set_alpha(200)  # Semi-transparent background
            surface.fill((0, 0, 0))
            screen.blit(surface, (Screen_Width // 2 - 150, Screen_Height // 2 - 300))
            
            for i, line in enumerate(self.text):
                text_surface = self.font.render(line, True, WHITE)
                screen.blit(text_surface, (Screen_Width // 2 - text_surface.get_width() // 2, Screen_Height // 2 - 290 + i * 40))
