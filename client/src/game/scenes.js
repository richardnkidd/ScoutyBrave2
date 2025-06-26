import { CONFIG } from './config.js';

export function createGameOverScene(k, gameState, obstacleSystem) {
    k.scene("gameover", () => {
        console.log("Game Over! Final score:", Math.floor(gameState.score));

        // Dark overlay
        k.add([
            k.rect(k.width(), k.height()),
            k.pos(0, 0),
            k.color(0, 0, 0),
            k.opacity(0.7),
            k.fixed()
        ]);

        // Game Over title
        k.add([
            k.text("GAME OVER", { size: 48 }),
            k.pos(k.center()),
            k.anchor("center"),
            k.color(255, 0, 0),
            k.fixed()
        ]);
        
        // Final score
        k.add([
            k.text(`Final Score: ${Math.floor(gameState.score)}`, { size: 24 }),
            k.pos(k.center().x, k.center().y + 60),
            k.anchor("center"),
            k.color(255, 255, 255),
            k.fixed()
        ]);
        
        // Restart instruction
        k.add([
            k.text("Press R to restart", { size: 20 }),
            k.pos(k.center().x, k.center().y + 100),
            k.anchor("center"),
            k.color(200, 200, 200),
            k.fixed()
        ]);

        // Additional stats
        k.add([
            k.text(`Fear Level: ${Math.floor(gameState.fear)}%`, { size: 18 }),
            k.pos(k.center().x, k.center().y + 140),
            k.anchor("center"),
            k.color(255, 255, 0),
            k.fixed()
        ]);
        
        // Restart functionality
        k.onKeyPress("r", () => {
            console.log("Restarting game...");
            
            // Reset game state
            gameState.fear = 0;
            gameState.score = 0;
            gameState.gameTime = 0;
            
            // Reset obstacle system
            if (obstacleSystem && obstacleSystem.resetSpeed) {
                obstacleSystem.resetSpeed();
            }
            
            // Go back to main game
            k.go("game");
        });
    });
}

export function createMainGameScene(k, gameState, createPlayer, setupPlayerControls, createObstacleSystem, setupCollisions, createUI) {
    k.scene("game", () => {
        console.log("Starting main game scene");

        // Create parallax backgrounds
        try {
            const bg1 = k.add([
                k.sprite("bg-layer1"),
                k.pos(0, 0),
                k.scale(1),
                k.fixed(),
                k.z(-2)
            ]);

            const bg2 = k.add([
                k.sprite("bg-layer2"), 
                k.pos(0, 0),
                k.scale(1),
                k.fixed(),
                k.z(-1)
            ]);
        } catch (e) {
            console.log("Background sprites not loaded, using solid background");
            // Fallback to solid color background
            k.add([
                k.rect(k.width(), k.height()),
                k.pos(0, 0),
                k.color(135, 206, 235), // Sky blue
                k.fixed(),
                k.z(-10)
            ]);
        }

        // Create ground
        const ground = k.add([
            k.rect(k.width(), CONFIG.GROUND_HEIGHT),
            k.pos(0, k.height() - CONFIG.GROUND_HEIGHT),
            k.area(),
            k.body({ isStatic: true }),
            k.color(34, 139, 34), // Green
            "ground"
        ]);

        console.log("Ground created at height:", CONFIG.GROUND_HEIGHT);

        // Create player
        const player = createPlayer(k);
        setupPlayerControls(k, player);

        // Create obstacle system
        const obstacleSystem = createObstacleSystem(k, gameState);

        // Setup collisions
        setupCollisions(k, player, gameState);

        // Create UI
        const ui = createUI(k, gameState);

        // Game update loop
        k.onUpdate(() => {
            // Update UI
            ui.update();
            
            // Check game over condition
            if (gameState.fear >= 100) {
                console.log("Fear reached 100%, game over!");
                k.go("gameover");
            }

            // Keep player within screen bounds
            if (player.pos.x < 0) {
                player.pos.x = 0;
            } else if (player.pos.x > k.width() - CONFIG.PLAYER_WIDTH) {
                player.pos.x = k.width() - CONFIG.PLAYER_WIDTH;
            }
        });
    });
}
