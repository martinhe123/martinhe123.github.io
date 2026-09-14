# Cross Road Game

A minimal Crossy Road-style game with 3D isometric view, built for educational purposes.

## Project Structure

```
Cross Road for Class/
├── index.html          # Main HTML file with game UI
├── base.css            # Styling for menus and HUD
├── main.js             # Game controller and initialization
├── config.js           # Configuration constants
├── update.js           # Game update logic
├── draw.js             # Rendering logic
├── rendering.js        # Isometric rendering utilities
├── lanes.js            # Lane generation and management
├── spawning.js         # Car and raft spawning logic
└── README.md           # This file
```

## File Descriptions

### `index.html`
Main HTML structure containing:
- Start menu
- Game over menu
- Canvas element
- HUD (score display)

### `base.css`
Styling for the game interface including menus, buttons, and HUD elements.

### `main.js`
Main game controller that:
- Initializes the game
- Sets up event handlers
- Manages game state (menu, playing, paused, gameOver)
- Controls the game loop
- Handles game over logic

### `config.js`
Configuration constants including:
- Canvas dimensions
- Isometric projection settings
- Collision tolerances
- Spawn rates and positions
- Speed settings
- Colors for all game elements

### `update.js`
Game update logic:
- Player movement
- World scrolling
- Object spawning (cars and rafts)
- Collision detection
- Score tracking
- Difficulty progression

### `draw.js`
Rendering coordination:
- Clears canvas
- Manages canvas rotation
- Draws lanes (roads and rivers)
- Draws game objects (cars, rafts, player)
- Draws pause overlay

### `rendering.js`
Isometric rendering utilities:
- `toIso()`: Converts world coordinates to isometric screen coordinates
- `drawIsometricRect()`: Draws isometric rectangles
- `drawIsometricCube()`: Draws 3D boxes with proper shading
- `drawIsometricRoad()`: Draws road lanes with center lines
- `drawIsometricRiver()`: Draws river lanes with water effects
- `darkenColor()`: Helper for shading cube faces

### `lanes.js`
Lane generation and management:
- `generateLaneAhead()`: Creates new lanes dynamically
- `cleanupLanes()`: Removes off-screen lanes
- Safety rules (first 5 lanes are roads, river distribution)

### `spawning.js`
Object spawning logic:
- `spawnCar()`: Spawns cars on road lanes
- `spawnRaft()`: Spawns rafts on river lanes (prioritizes empty rivers)

## Game Mechanics

### Controls
- **WASD** or **Arrow Keys**: Move player
- **ESC**: Pause/Resume
- **R**: Restart (when paused)

### Gameplay
- Player starts at the bottom with 5 safe road lanes ahead
- Move forward to increase score
- Avoid cars on roads
- Jump on rafts to cross rivers
- Game speed increases every 500 points
- Don't fall in the water!

### Technical Details
- **Isometric View**: 30° isometric projection with 10° canvas rotation
- **Infinite Scrolling**: Dynamic lane generation ahead of player
- **Collision System**: 
  - 12px tolerance for raft boarding
  - 8px grace at river edges
- **Spawn Logic**:
  - Cars: Every 20 frames, speed 1.5-2.5 px/frame
  - Rafts: Every 22 frames, speed 3-5 px/frame (integer)
  - Prioritizes empty rivers for raft spawning

### Lane Generation Rules
1. First 5 lanes are always roads (safe start)
2. 30% chance of river after first 5 lanes
3. If any of the last 3 lanes are rivers, next lane must be a road

## Running the Game

1. Start a local web server (required for ES6 modules):
   ```
   python -m http.server 8000
   ```

2. Open browser to `http://localhost:8000`

3. Click "START GAME" and enjoy!

## For Students

This code is organized to make it easy to modify:
- Want to change colors? Edit `config.js`
- Want to adjust difficulty? Edit spawn rates in `config.js`
- Want to modify game rules? Edit `update.js`
- Want to change how things look? Edit `rendering.js`
- Want to add new lane types? Edit `lanes.js` and `spawning.js`

Each file has a specific responsibility, making the code easier to understand and maintain.

## Portfolio integration

Open `/cross-road/` from the portfolio Software filter. All runtime dependencies are local ES modules; no build step is needed on GitHub Pages. The unused legacy `game.js` is intentionally excluded. The website copy adds a responsive canvas, touch movement, pause button, return navigation, focus-loss pause, and aligned player rendering/collision coordinates. The original class prompt log is preserved.
