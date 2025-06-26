export function createUI(k, gameState) {
    // Fear meter
    const fearLabel = k.add([
        k.text("Fear: 0%", { size: 24 }),
        k.pos(20, 20),
        k.fixed(),
        k.color(255, 255, 255),
        "ui"
    ]);

    // Score display
    const scoreLabel = k.add([
        k.text("Score: 0", { size: 24 }),
        k.pos(20, 50),
        k.fixed(),
        k.color(255, 255, 255),
        "ui"
    ]);

    // Instructions
    const instructionsLabel = k.add([
        k.text("WASD/Arrows: Move | Space: Jump | S/Down: Crouch", { size: 16 }),
        k.pos(20, k.height() - 30),
        k.fixed(),
        k.color(200, 200, 200),
        "ui"
    ]);

    return {
        fearLabel,
        scoreLabel,
        instructionsLabel,
        
        update: () => {
            gameState.score += k.dt() * 10;
            scoreLabel.text = `Score: ${Math.floor(gameState.score)}`;
            fearLabel.text = `Fear: ${Math.floor(gameState.fear)}%`;
            
            // Change fear color based on level
            if (gameState.fear < 30) {
                fearLabel.color = k.rgb(0, 255, 0); // Green
            } else if (gameState.fear < 70) {
                fearLabel.color = k.rgb(255, 255, 0); // Yellow
            } else {
                fearLabel.color = k.rgb(255, 0, 0); // Red
            }
        }
    };
}
