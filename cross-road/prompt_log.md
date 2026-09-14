# Cross Road Game - Development Prompt Log

This document summarizes the user prompts and interactions during the development of this Crossy Road-style game.

## Initial Request
**Goal**: Create a minimal Crossy Road-style game with basic mechanics
- "minimal and get it to work, just the most basic mechanic"

## Phase 1: Core Mechanics

### Scrolling Implementation
- **Issue**: Game had a static screen
- **Request**: "continuous, right now it is a static screen"
- **Solution**: Implemented world scrolling with `roadOffset` variable

### River & Raft System
- **Request**: "sometimes you have river, and you can only cross the river with raft"
- **Solution**: Added river lanes and raft objects that move horizontally

## Phase 2: Lane Generation

### Safe Starting Area
- **Request**: "first five strip cannot be river" → "first 5 lanes cannot be river"
- **Solution**: Initialize first 5 lanes as roads in `startGame()`

### Dynamic Lane Generation
- **Request**: "each new strip off the screen can be random, either river or road"
- **Solution**: Implemented `generateLaneAhead()` for infinite dynamic lanes

### Safety Rules
- **Initial**: "no 3 consecutive strip can be river"
- **Revised**: "if any of the last 3 lanes are river, force it to be a road"
- **Solution**: Check last 3 lanes before generating new ones

## Phase 3: Collision & Physics

### Raft Interaction Tolerance
- **Request**: "i want the raft and player river interaction to have some tolerance instead of spawning the raft perfectly"
- **Solution**: Added 15px tolerance (later adjusted to 12px)

### Drowning Detection
- **Issue**: Player dying on roads, raft collisions not working
- **Multiple iterations**: Fixed coordinate systems, screen Y vs world Y
- **Final**: 12px raft tolerance, 8px river edge tolerance

## Phase 4: Spawning & Movement

### Car Spawning
- **Request**: "spawn a little less cars"
- **Change**: Increased spawn interval from 15 → 20 frames

### Off-Canvas Spawning
- **Request**: "cars need to spawn off the canvas, same as raft"
- **Solution**: Cars spawn at X: -190 (right-moving) or 950 (left-moving)

### Raft Spawning Logic
- **Request**: "prioritize the river without any visible raft first"
- **Solution**: Check all rivers, prioritize those without rafts in visible range (X: -200 to 1000)

### Spawn Positions
- **Request**: "make the raft spawn at -225 when spawning moving right"
- **Solution**: Right-moving rafts spawn at X: -225

### Car Speed Adjustment
- **Initial**: "car speed should be 4-6 pixels per frame"
- **Revised**: "i think the speed of the car is adjusted to be fast too, they need to be independent from the raft. a lot slower"
- **Final**: Cars: 1.5-2.5 px/frame, Rafts: 3-5 px/frame (independent)

### Raft Spawn Rate
- **Evolution**: Started at 17 → 20 → 22 frames
- **Request**: "spawn raft every 22 frames"
- **Request**: "make the speed random int between 3-5 pixels per frame"
- **Final**: Every 22 frames, speed 3-5 px/frame (random integer)

### Car Spawn Position Fine-tuning
- **Request**: "where is car moving right spawn"
- **Answer**: X: -200
- **Request**: "make it spawn at -200" (confirmed)
- **Final adjustment**: Changed to -190

## Phase 5: Player & Camera

### Player Position
- **Request**: "where is player originally spawn on the canvas"
- **Answer**: Y: 300
- **Request**: "move y 100 pixels closer to the bottom of the canvas"
- **Solution**: Moved player Y from 300 → 400, later adjusted to 500 for better forward view

## Phase 6: Visual Improvements

### Score Display
- **Request**: "score keeping is hard to see"
- **Solution**: Added white background, bold font, blue border, drop shadow to score

## Phase 7: Bug Fixes

### Game Restart Issue
- **Issue**: "when i restart the game once, no roads at all"
- **Log output**: Showed lanes starting at Y: -2750
- **Solution**: Reset `lanes` array to initial 5 roads in `startGame()`

### Car Disappearance
- **Issue**: "cars randomly disappeared on the screen"
- **Cause**: Pattern repetition system causing conflicts
- **Solution**: Removed pattern system, kept pure dynamic generation

### Road Spawning Position
- **Issue**: "roads spawn way after player"
- **Solution**: Adjusted `roadOffset` starting value and lane generation logic

## Phase 8: Tolerance Fine-tuning

### Collision Tolerance Adjustment
- **Feedback**: "currently, player raft and river interaction tolerance is a little too generous"
- **Previous**: Raft: 15px, River edge: 10px
- **Request**: "try 12 and 8 pixels"
- **Final**: Raft: 12px, River edge: 8px

## Phase 9: Code Organization

### Modularization
- **Request**: "i think the game is at a good point for a class exercise. currently the code is organized in one giant files, need to divide up to have maintainability."
- **Solution**: Split into 7 modules:
  1. `config.js` - All constants and configuration
  2. `rendering.js` - Isometric drawing utilities
  3. `lanes.js` - Lane generation and cleanup
  4. `spawning.js` - Car and raft spawning
  5. `update.js` - Game logic and collision detection
  6. `draw.js` - Rendering coordination
  7. `main.js` - Game initialization and control
- **Added**: `README.md` for documentation

## Phase 10: UI Refinements

### Score Board Positioning
- **Request**: "left side of the score box need to line up with the left side of the canvas"
- **Solution**: Used `transform: translate(-400px, -300px)` to align with canvas top-left

### Score Board Overlap
- **Request**: "currently it is sitting on top of the canvas. can it move up and dont overlap with the canvas"
- **Solution**: Added 80px offset upward: `transform: translate(-400px, calc(-300px - 80px))`

## Key Technical Decisions

1. **Coordinate System**: Objects store worldY (fixed), calculate screen Y = worldY + roadOffset each frame
2. **Canvas Rotation**: 10° counterclockwise for visual style
3. **Isometric View**: 30° angle with proper 3D cube rendering
4. **Dynamic Generation**: Infinite lanes generated ahead, cleaned up behind
5. **Safety Rules**: First 5 roads, prevent 3 consecutive rivers
6. **Inline → Modular**: Initially inline JS for quick prototyping, later split into ES6 modules for maintainability

## Development Pattern

The development followed an iterative approach:
1. Start with minimal working version
2. Add features incrementally
3. Test and identify issues
4. Refine parameters (speeds, tolerances, spawn rates)
5. Fix bugs and edge cases
6. Refactor for maintainability

## Final Game Parameters

- **Canvas**: 800×600px
- **Player Start**: (400, 500)
- **Car Speed**: 1.5-2.5 px/frame
- **Raft Speed**: 3-5 px/frame (integer)
- **Car Spawn**: Every 20 frames
- **Raft Spawn**: Every 22 frames
- **Raft Tolerance**: 12px
- **River Edge Grace**: 8px
- **Lane Spacing**: 150px
- **Lane Height**: 80px
- **Speed Increase**: +0.2 every 500 points
- **River Probability**: 30% after first 5 lanes

## Lessons Learned

1. Coordinate systems require careful management (world vs screen space)
2. Tolerances make gameplay more forgiving and enjoyable
3. Visual feedback (score display) needs high contrast
4. Spawning logic benefits from smart distribution (empty rivers first)
5. Code organization matters for educational projects
6. Iterative refinement leads to better balance
7. Independent speeds for different object types provide better control
8. Testing reveals edge cases not visible in initial design
