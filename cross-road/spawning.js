// Object spawning logic for cars and rafts
import { 
    COLORS, 
    CAR_MIN_SPEED, 
    CAR_MAX_SPEED, 
    RAFT_MIN_SPEED, 
    RAFT_MAX_SPEED,
    CAR_SPAWN_RIGHT,
    CAR_SPAWN_LEFT,
    RAFT_SPAWN_RIGHT,
    RAFT_SPAWN_LEFT
} from './config.js';

// Spawn a car on a random visible road lane
export function spawnCar(lanes, roadOffset, cars) {
    // Try spawning on visible road lanes
    for (let attempt = 0; attempt < 5; attempt++) {
        let lane = lanes[Math.floor(Math.random() * lanes.length)];
        
        // Skip if this is a river lane
        if (lane.type === 'river') continue;
        
        // Calculate lane screen position
        let laneScreenY = lane.y + roadOffset;
        
        // Spawn cars when lanes are in spawn zone
        if (laneScreenY > -150 && laneScreenY < 450) {
            let car = {
                x: lane.direction === 1 ? CAR_SPAWN_RIGHT : CAR_SPAWN_LEFT,
                worldY: lane.y + 15,
                width: 50,
                height: 25,
                speed: CAR_MIN_SPEED + Math.random() * (CAR_MAX_SPEED - CAR_MIN_SPEED),
                direction: lane.direction,
                color: COLORS.cars[Math.floor(Math.random() * COLORS.cars.length)]
            };
            cars.push(car);
            break;
        }
    }
}

// Spawn a raft on a river lane (prioritizing empty rivers)
export function spawnRaft(lanes, roadOffset, rafts) {
    // Find all visible river lanes
    let visibleRivers = [];
    for (let lane of lanes) {
        if (lane.type === 'river') {
            let laneScreenY = lane.y + roadOffset;
            if (laneScreenY > -150 && laneScreenY < 450) {
                visibleRivers.push(lane);
            }
        }
    }
    
    if (visibleRivers.length === 0) return; // No rivers to spawn on
    
    // Check which rivers have no visible rafts
    let riversWithoutRafts = [];
    for (let river of visibleRivers) {
        let riverScreenY = river.y + roadOffset;
        let hasRaft = false;
        
        // Check if any raft is on this river and visible on screen
        for (let raft of rafts) {
            let raftScreenY = raft.worldY + roadOffset;
            if (Math.abs(raftScreenY - riverScreenY) < 40 && raft.x > -200 && raft.x < 1000) {
                hasRaft = true;
                break;
            }
        }
        
        if (!hasRaft) {
            riversWithoutRafts.push(river);
        }
    }
    
    // Prioritize rivers without rafts, otherwise pick any visible river
    let targetRiver = riversWithoutRafts.length > 0 
        ? riversWithoutRafts[Math.floor(Math.random() * riversWithoutRafts.length)]
        : visibleRivers[Math.floor(Math.random() * visibleRivers.length)];
    
    // Spawn raft on the selected river
    let raft = {
        x: targetRiver.direction === 1 ? RAFT_SPAWN_RIGHT : RAFT_SPAWN_LEFT,
        worldY: targetRiver.y,
        width: 80,
        height: 80,
        speed: RAFT_MIN_SPEED + Math.floor(Math.random() * (RAFT_MAX_SPEED - RAFT_MIN_SPEED + 1)),
        direction: targetRiver.direction
    };
    rafts.push(raft);
}
