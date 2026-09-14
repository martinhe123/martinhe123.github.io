// Game rendering logic
import { COLORS, CANVAS_ROTATION } from './config.js';
import { toIso, drawIsometricCube, drawIsometricRoad, drawIsometricRiver } from './rendering.js';

export function draw(ctx, gameState, lanes, roadOffset, rafts, cars, player) {
    // Clear canvas with grass
    ctx.fillStyle = COLORS.grass;
    ctx.fillRect(0, 0, 800, 600);
    
    // Rotate the entire canvas
    ctx.save();
    ctx.translate(400, 300);
    ctx.rotate(CANVAS_ROTATION * Math.PI / 180);
    ctx.translate(-400, -300);
    
    // Draw all visible lanes
    for (let lane of lanes) {
        let laneScreenY = lane.y + roadOffset;
        
        // Only draw if visible
        if (laneScreenY > -200 && laneScreenY < 800) {
            if (lane.type === 'river') {
                drawIsometricRiver(ctx, -200, laneScreenY, 1200, lane.height);
            } else {
                drawIsometricRoad(ctx, -200, laneScreenY, 1200, lane.height);
            }
        }
    }
    
    if (gameState !== 'menu') {
        // Draw rafts
        for (let raft of rafts) {
            let screenY = raft.worldY + roadOffset;
            drawIsometricCube(ctx, raft.x, screenY, raft.width, raft.height, 15, COLORS.raft);
        }
        
        // Draw cars
        for (let car of cars) {
            let screenY = car.worldY + roadOffset;
            drawIsometricCube(ctx, car.x, screenY, car.width, car.height, 20, car.color);
        }
        
        // Draw player
        drawIsometricCube(ctx, player.x, player.y, player.width, player.height, 25, COLORS.player);
        
        // Draw player eyes on top face
        const playerTop = toIso(player.x, player.y);
        ctx.fillStyle = COLORS.playerEyes;
        ctx.fillRect(playerTop.x - 8, playerTop.y - 25 - 5, 5, 5);
        ctx.fillRect(playerTop.x + 3, playerTop.y - 25 - 5, 5, 5);
    }
    
    // Draw pause overlay
    if (gameState === 'paused') {
        ctx.fillStyle = COLORS.pauseOverlay;
        ctx.fillRect(-100, -100, 1000, 800);
        
        // Counter-rotate to draw text straight
        ctx.save();
        ctx.translate(400, 300);
        ctx.rotate(-CANVAS_ROTATION * Math.PI / 180);
        ctx.translate(-400, -300);
        
        ctx.fillStyle = COLORS.pauseText;
        ctx.font = '48px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('PAUSED', 400, 300);
        
        ctx.font = '24px monospace';
        ctx.fillText('Press ESC to resume', 400, 360);
        ctx.fillText('Press R to restart', 400, 400);
        
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
        
        ctx.restore();
    }
    
    // Restore canvas rotation
    ctx.restore();
}
