import kaplay from 'kaplay';
import { CONFIG } from './config.js';
import { createPlayer, setupPlayerControls } from './player.js';
import { createObstacleSystem, setupCollisions } from './obstacles.js';
import { createUI } from './ui.js';
import { createGameOverScene, createMainGameScene } from './scenes.js';

// Global game state
const gameState = {
    fear: 0,
    score: 0,
    gameTime: 0
};

// Initialize KAPLAY
const k = kaplay({
    width: CONFIG.CANVAS_WIDTH,
    height: CONFIG.CANVAS_HEIGHT,
    background: [135, 206, 235], // Sky blue
    gravity: CONFIG.GRAVITY,
    debug: false, // Set to true to see collision boxes
    canvas: document.getElementById("game-canvas")
});

console.log("KAPLAY initialized with dimensions:", CONFIG.CANVAS_WIDTH, "x", CONFIG.CANVAS_HEIGHT);

// Load assets
function loadAssets() {
    try {
        // Load background images (converted from the provided PNG files to create simple backgrounds)
        k.loadSprite("bg-layer1", "/bg-layer1.png");
        k.loadSprite("bg-layer2", "/bg-layer2.png");
        console.log("Background sprites loaded");
    } catch (e) {
        console.log("Could not load background sprites:", e);
    }

    try {
        // Load sound effects
        k.loadSound("hit", "/sounds/hit.mp3");
        k.loadSound("success", "/sounds/success.mp3");
        k.loadSound("background", "/sounds/background.mp3");
        console.log("Sound effects loaded");
    } catch (e) {
        console.log("Could not load sound effects:", e);
    }
}

// Initialize the game
function initGame() {
    console.log("Initializing Scouty The Brave...");
    
    // Load assets
    loadAssets();
    
    // Create scenes
    createGameOverScene(k, gameState, null);
    createMainGameScene(k, gameState, createPlayer, setupPlayerControls, createObstacleSystem, setupCollisions, createUI);
    
    // Start the game
    k.go("game");
    
    console.log("Game started! Use WASD or arrow keys to move, Space to jump, S or Down to crouch.");
}

// Start the game when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}

// Export for debugging
window.gameState = gameState;
window.k = k;
