// Main game controller
import { update, resetTimers } from './update.js';
import { draw } from './draw.js';

// Game state and core variables
let canvas, ctx;
let gameState = 'menu';
let score = 0;
let keys = {};

// Player
let player = { x: 400, y: 150, width: 30, height: 30, speed: 5 };

// World scrolling
let worldSpeed = 2;
let roadOffset = 300;

// Lanes
let lanes = [];
let lowestLaneY = -200;

// Game objects
let cars = [];
let rafts = [];
let playerOnRaft = null;

// Initialize game
window.onload = function() {
    console.log('Window loaded, initializing...');
    canvas = document.getElementById('gameCanvas');
    
    if (!canvas) {
        console.error('Canvas gameCanvas not found!');
        return;
    }
    
    ctx = canvas.getContext('2d');
    console.log('Canvas found and initialized');
    
    // Setup keyboard events
    setupKeyboardHandlers();
    
    document.querySelectorAll('[data-key]').forEach(button => {
        button.addEventListener('pointerdown', event => {
            event.preventDefault();
            button.setPointerCapture(event.pointerId);
            keys[button.dataset.key] = true;
        });
        for (const eventName of ['pointerup', 'pointercancel', 'lostpointercapture']) {
            button.addEventListener(eventName, () => { keys[button.dataset.key] = false; });
        }
    });
    document.getElementById('pauseBtn').onclick = togglePause;
    window.addEventListener('blur', () => {
        keys = {};
        if (gameState === 'playing') togglePause();
    });

    // Button events
    document.getElementById('startBtn').onclick = startGame;
    document.getElementById('restartBtn').onclick = startGame;
    
    console.log('Event handlers set up');
    
    // Start game loop
    gameLoop();
};

function setupKeyboardHandlers() {
    document.onkeydown = function(e) { 
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) e.preventDefault();
        keys[e.code] = true; 
        
        // Handle pause/unpause with Escape key
        if (e.code === 'Escape' && !e.repeat) togglePause();
        
        // Handle restart from pause with R key
        if (e.code === 'KeyR' && gameState === 'paused') {
            startGame();
        }
    };
    
    document.onkeyup = function(e) { 
        keys[e.code] = false; 
    };
}

function togglePause() {
    if (gameState === 'playing') gameState = 'paused';
    else if (gameState === 'paused') gameState = 'playing';
    document.getElementById('pauseBtn').textContent = gameState === 'paused' ? 'Resume' : 'Pause';
}

function startGame() {
    keys = {};
    document.getElementById('pauseBtn').textContent = 'Pause';
    console.log('Starting game...');
    gameState = 'playing';
    score = 0;
    cars = [];
    rafts = [];
    resetTimers();
    playerOnRaft = null;
    roadOffset = 300;
    worldSpeed = 2;
    
    // Reset lanes to initial state (first 5 are always roads)
    lanes = [
        { y: -200, height: 80, direction: 1, type: 'road' },
        { y: -50, height: 80, direction: -1, type: 'road' },
        { y: 100, height: 80, direction: 1, type: 'road' },
        { y: 250, height: 80, direction: -1, type: 'road' },
        { y: 400, height: 80, direction: 1, type: 'road' }
    ];
    lowestLaneY = -200;
    
    player.x = 400;
    player.y = 500;
    
    document.getElementById('startMenu').classList.add('hidden');
    document.getElementById('gameOverMenu').classList.add('hidden');
    document.getElementById('gameHud').classList.remove('hidden');
    
    console.log('Game started successfully');
}

function gameLoop() {
    updateGame();
    drawGame();
    requestAnimationFrame(gameLoop);
}

function updateGame() {
    const result = update(gameState, player, keys, worldSpeed, roadOffset, lanes, cars, rafts, score);
    
    score = result.score;
    worldSpeed = result.worldSpeed;
    roadOffset = result.roadOffset;
    playerOnRaft = result.playerOnRaft;
    lowestLaneY = result.lowestLaneY;
    
    // Update score display
    if (gameState === 'playing') {
        document.getElementById('currentScore').textContent = score;
    }
    
    // Handle game over
    if (result.gameOver) {
        gameOver();
    }
}

function drawGame() {
    draw(ctx, gameState, lanes, roadOffset, rafts, cars, player);
}

function gameOver() {
    console.log('💥 Game Over!');
    gameState = 'gameOver';
    document.getElementById('finalScore').textContent = 'Score: ' + score;
    document.getElementById('gameHud').classList.add('hidden');
    document.getElementById('gameOverMenu').classList.remove('hidden');
}
