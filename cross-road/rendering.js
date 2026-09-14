// Rendering utilities for isometric graphics
import { ISO_SCALE_X, ISO_SCALE_Y, CAMERA_X, CAMERA_Y, COLORS } from './config.js';

// Convert world coordinates to isometric screen coordinates
export function toIso(x, y) {
    return {
        x: (x - y) * ISO_SCALE_X + CAMERA_X,
        y: (x + y) * ISO_SCALE_Y + CAMERA_Y
    };
}

// Helper function to darken colors for cube faces
export function darkenColor(color, factor) {
    // Parse hex color
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
    
    // Darken by factor
    const newR = Math.floor(r * factor);
    const newG = Math.floor(g * factor);
    const newB = Math.floor(b * factor);
    
    // Convert back to hex
    return '#' + 
        newR.toString(16).padStart(2, '0') + 
        newG.toString(16).padStart(2, '0') + 
        newB.toString(16).padStart(2, '0');
}

// Draw an isometric rectangle
export function drawIsometricRect(ctx, worldX, worldY, width, height, color) {
    // Get the four corners in world space
    const topLeft = toIso(worldX, worldY);
    const topRight = toIso(worldX + width, worldY);
    const bottomLeft = toIso(worldX, worldY + height);
    const bottomRight = toIso(worldX + width, worldY + height);
    
    // Draw as a filled polygon
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(topLeft.x, topLeft.y);
    ctx.lineTo(topRight.x, topRight.y);
    ctx.lineTo(bottomRight.x, bottomRight.y);
    ctx.lineTo(bottomLeft.x, bottomLeft.y);
    ctx.closePath();
    ctx.fill();
}

// Draw an isometric cube (3D box with all 6 faces)
export function drawIsometricCube(ctx, worldX, worldY, width, depth, height, color) {
    // Calculate shades for different faces
    const topColor = color;
    const frontColor = color;
    const backColor = darkenColor(color, 0.9);
    const leftColor = color;
    const rightColor = darkenColor(color, 0.6);
    const bottomColor = darkenColor(color, 0.3);
    
    // Bottom base corners (on the ground)
    const base1 = toIso(worldX, worldY);
    const base2 = toIso(worldX + width, worldY);
    const base3 = toIso(worldX + width, worldY + depth);
    const base4 = toIso(worldX, worldY + depth);
    
    // Top corners (elevated by height in screen space)
    const top1 = { x: base1.x, y: base1.y - height };
    const top2 = { x: base2.x, y: base2.y - height };
    const top3 = { x: base3.x, y: base3.y - height };
    const top4 = { x: base4.x, y: base4.y - height };
    
    // Draw bottom face
    ctx.fillStyle = bottomColor;
    ctx.beginPath();
    ctx.moveTo(base1.x, base1.y);
    ctx.lineTo(base2.x, base2.y);
    ctx.lineTo(base3.x, base3.y);
    ctx.lineTo(base4.x, base4.y);
    ctx.closePath();
    ctx.fill();
    
    // Draw back face
    ctx.fillStyle = backColor;
    ctx.beginPath();
    ctx.moveTo(base1.x, base1.y);
    ctx.lineTo(top1.x, top1.y);
    ctx.lineTo(top2.x, top2.y);
    ctx.lineTo(base2.x, base2.y);
    ctx.closePath();
    ctx.fill();
    
    // Draw front face
    ctx.fillStyle = frontColor;
    ctx.beginPath();
    ctx.moveTo(base3.x, base3.y);
    ctx.lineTo(top3.x, top3.y);
    ctx.lineTo(top4.x, top4.y);
    ctx.lineTo(base4.x, base4.y);
    ctx.closePath();
    ctx.fill();
    
    // Draw left face
    ctx.fillStyle = leftColor;
    ctx.beginPath();
    ctx.moveTo(base1.x, base1.y);
    ctx.lineTo(top1.x, top1.y);
    ctx.lineTo(top4.x, top4.y);
    ctx.lineTo(base4.x, base4.y);
    ctx.closePath();
    ctx.fill();
    
    // Draw right face
    ctx.fillStyle = rightColor;
    ctx.beginPath();
    ctx.moveTo(base2.x, base2.y);
    ctx.lineTo(top2.x, top2.y);
    ctx.lineTo(top3.x, top3.y);
    ctx.lineTo(base3.x, base3.y);
    ctx.closePath();
    ctx.fill();
    
    // Draw top face (last, so it's on top)
    ctx.fillStyle = topColor;
    ctx.beginPath();
    ctx.moveTo(top1.x, top1.y);
    ctx.lineTo(top2.x, top2.y);
    ctx.lineTo(top3.x, top3.y);
    ctx.lineTo(top4.x, top4.y);
    ctx.closePath();
    ctx.fill();
}

// Draw an isometric road
export function drawIsometricRoad(ctx, worldX, worldY, width, height) {
    // Draw road surface
    drawIsometricRect(ctx, worldX, worldY, width, height, COLORS.road);
    
    // Draw center line (dashed effect)
    const dashLength = 40;
    const gapLength = 20;
    for (let i = 0; i < width; i += dashLength + gapLength) {
        drawIsometricRect(ctx, worldX + i, worldY + height / 2 - 2, dashLength, 4, COLORS.roadLine);
    }
}

// Draw an isometric river
export function drawIsometricRiver(ctx, worldX, worldY, width, height) {
    // Draw water surface
    drawIsometricRect(ctx, worldX, worldY, width, height, COLORS.river);
    
    // Draw water lines
    const lineSpacing = 30;
    for (let i = 0; i < width; i += lineSpacing * 2) {
        drawIsometricRect(ctx, worldX + i, worldY + height / 3, lineSpacing, 3, COLORS.waterLine);
        drawIsometricRect(ctx, worldX + i + lineSpacing / 2, worldY + 2 * height / 3, lineSpacing, 3, COLORS.waterLine);
    }
}
