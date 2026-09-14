// Game update logic
import { CAR_SPAWN_RATE, RAFT_SPAWN_RATE, RAFT_TOLERANCE, RIVER_EDGE_TOLERANCE } from './config.js';
import { spawnCar, spawnRaft } from './spawning.js';
import { generateLaneAhead, cleanupLanes } from './lanes.js';

let carTimer = 0;
let raftTimer = 0;

export function update(gameState, player, keys, worldSpeed, roadOffset, lanes, cars, rafts, score) {
    // Only update game logic when playing
    if (gameState !== 'playing') return { score, worldSpeed, roadOffset, playerOnRaft: null, gameOver: false, lowestLaneY: lanes[0]?.y || 0 };
    
    // World scrolling - roads move downward
    roadOffset += worldSpeed;
    
    // Player movement
    if (keys['KeyA'] || keys['ArrowLeft']) player.x -= player.speed;
    if (keys['KeyD'] || keys['ArrowRight']) player.x += player.speed;
    if (keys['KeyW'] || keys['ArrowUp']) player.y -= player.speed;
    if (keys['KeyS'] || keys['ArrowDown']) player.y += player.speed;
    
    // Keep player in bounds
    player.x = Math.max(50, Math.min(750, player.x));
    player.y = Math.max(100, Math.min(600, player.y));
    
    // Spawn cars
    carTimer++;
    if (carTimer > CAR_SPAWN_RATE) {
        spawnCar(lanes, roadOffset, cars);
        carTimer = 0;
    }
    
    // Spawn rafts
    raftTimer++;
    if (raftTimer > RAFT_SPAWN_RATE) {
        spawnRaft(lanes, roadOffset, rafts);
        raftTimer = 0;
    }
    
    // Move and check cars
    for (let i = cars.length - 1; i >= 0; i--) {
        let car = cars[i];
        car.x += car.speed * car.direction;
        
        let carScreenY = car.worldY + roadOffset;
        
        // Remove cars off canvas
        if (car.x < -300 || car.x > 1100 || carScreenY > 1000 || carScreenY < -500) {
            cars.splice(i, 1);
            continue;
        }
        
        // Check collision with player
        if (player.x < car.x + car.width &&
            player.x + player.width > car.x &&
            player.y < carScreenY + car.height &&
            player.y + player.height > carScreenY) {
            return { score, worldSpeed, roadOffset, playerOnRaft: null, gameOver: true, lowestLaneY: lanes[0]?.y || 0 };
        }
    }
    
    // Move rafts and check if player is on one
    let playerOnRaft = null;
    for (let i = rafts.length - 1; i >= 0; i--) {
        let raft = rafts[i];
        raft.x += raft.speed * raft.direction;
        
        let raftScreenY = raft.worldY + roadOffset;
        
        // Remove rafts off canvas
        if (raft.x < -300 || raft.x > 1100 || raftScreenY > 1000 || raftScreenY < -500) {
            rafts.splice(i, 1);
            continue;
        }
        
        // Check if player is on this raft (with tolerance)
        let playerCenterX = player.x + player.width / 2;
        let playerCenterY = player.y + player.height / 2;
        let raftCenterX = raft.x + raft.width / 2;
        let raftCenterY = raftScreenY + raft.height / 2;
        
        let distX = Math.abs(playerCenterX - raftCenterX);
        let distY = Math.abs(playerCenterY - raftCenterY);
        let needX = (player.width + raft.width) / 2 + RAFT_TOLERANCE;
        let needY = (player.height + raft.height) / 2 + RAFT_TOLERANCE;
        
        if (distX < needX && distY < needY) {
            playerOnRaft = raft;
        }
    }
    
    // Move player with raft
    if (playerOnRaft) {
        player.x += playerOnRaft.speed * playerOnRaft.direction;
        player.x = Math.max(50, Math.min(750, player.x));
    }
    
    // Check if player drowned in river
    if (score > 10) {
        for (let lane of lanes) {
            let laneScreenY = lane.y + roadOffset;
            
            // Check if player is in this lane
            if (player.y >= laneScreenY + RIVER_EDGE_TOLERANCE && 
                player.y <= laneScreenY + lane.height - RIVER_EDGE_TOLERANCE) {
                
                if (lane.type === 'river' && !playerOnRaft) {
                    console.log('💀 DROWNED! Player:', player.x.toFixed(0), player.y.toFixed(0), 'River Y:', laneScreenY.toFixed(1));
                    return { score, worldSpeed, roadOffset, playerOnRaft, gameOver: true, lowestLaneY: lanes[0]?.y || 0 };
                }
                break;
            }
        }
    }
    
    // Update score
    score += Math.floor(worldSpeed);
    
    // Log score milestones
    if (score % 100 === 0 && score > 0) {
        console.log('Score:', score);
    }
    
    // Gradually increase speed
    if (score > 0 && score % 500 === 0) {
        worldSpeed += 0.2;
        console.log('Speed increased to:', worldSpeed.toFixed(1));
    }
    
    // Generate new lanes ahead
    let lowestLaneY = lanes[0]?.y || 0;
    while (lowestLaneY > -roadOffset - 200) {
        lowestLaneY = generateLaneAhead(lanes, lowestLaneY);
    }
    
    // Clean up old lanes
    cleanupLanes(lanes, roadOffset);
    
    return { score, worldSpeed, roadOffset, playerOnRaft, gameOver: false, lowestLaneY };
}

export function resetTimers() {
    carTimer = 0;
    raftTimer = 0;
}
