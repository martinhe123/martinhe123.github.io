// Game configuration constants

// Canvas settings
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

// Isometric projection settings
export const ISO_ANGLE = Math.PI / 6; // 30 degrees
export const ISO_SCALE_X = 0.866; // cos(30°)
export const ISO_SCALE_Y = 0.5;   // sin(30°)

// Camera settings
export const CAMERA_X = 400;
export const CAMERA_Y = -50;
export const CANVAS_ROTATION = -10; // degrees

// Collision tolerances
export const RAFT_TOLERANCE = 12; // pixels
export const RIVER_EDGE_TOLERANCE = 8; // pixels

// Spawn rates
export const CAR_SPAWN_RATE = 20; // frames
export const RAFT_SPAWN_RATE = 22; // frames

// Speed settings
export const CAR_MIN_SPEED = 1.5;
export const CAR_MAX_SPEED = 2.5;
export const RAFT_MIN_SPEED = 3;
export const RAFT_MAX_SPEED = 5;

// Spawn positions
export const CAR_SPAWN_RIGHT = -190; // right-moving cars spawn off left edge
export const CAR_SPAWN_LEFT = 950;   // left-moving cars spawn off right edge
export const RAFT_SPAWN_RIGHT = -225;
export const RAFT_SPAWN_LEFT = 950;

// Lane generation
export const LANE_SPACING = 150; // Spacing between lanes
export const FIRST_SAFE_LANES = 5; // First 5 lanes are always roads
export const RIVER_PROBABILITY = 0.3; // 30% chance after first 5 lanes

// Colors
export const COLORS = {
    grass: '#82e0aa',
    road: '#5d6d7e',
    roadLine: '#f9e79f',
    river: '#5dade2',
    waterLine: '#85c1e9',
    player: '#52d17c',
    playerEyes: '#ffffff',
    pauseOverlay: 'rgba(254, 249, 231, 0.9)',
    pauseText: '#34495e',
    cars: ['#e74c3c', '#3498db', '#f39c12', '#9b59b6', '#1abc9c'],
    raft: '#8B4513'
};
