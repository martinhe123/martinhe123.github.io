// Lane generation and management
import { FIRST_SAFE_LANES, RIVER_PROBABILITY, LANE_SPACING } from './config.js';

// Generate a new lane ahead (with lower Y value)
export function generateLaneAhead(lanes, lowestLaneY) {
    let newY = lowestLaneY - LANE_SPACING;
    
    // Safety rule: if any of the last 3 lanes are rivers, force this one to be a road
    let recentLanes = lanes.slice(0, 3);
    let hasRiverInLast3 = recentLanes.some(l => l.type === 'river');
    
    let isRiver = lanes.length >= FIRST_SAFE_LANES && Math.random() < RIVER_PROBABILITY;
    if (hasRiverInLast3) {
        isRiver = false; // Force road if any of last 3 are rivers
    }
    
    let newLane = {
        y: newY,
        height: 80,
        direction: Math.random() < 0.5 ? 1 : -1,
        type: isRiver ? 'river' : 'road'
    };
    
    lanes.unshift(newLane); // Add to front of array
    console.log('Generated lane ahead:', newLane.type, 'at Y:', newLane.y);
    
    return newY; // Return new lowestLaneY
}

// Clean up lanes that scrolled off the bottom
export function cleanupLanes(lanes, roadOffset) {
    while (lanes.length > 0 && lanes[lanes.length - 1].y + roadOffset > 1000) {
        lanes.pop(); // Remove from end
    }
}
