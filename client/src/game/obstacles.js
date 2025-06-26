import { CONFIG } from './config.js';

export function createObstacleSystem(k, gameState) {
    let obstacleSpeed = CONFIG.OBSTACLE_SPEED;

    function spawnObstacle() {
        const obstacle = k.add([
            k.rect(CONFIG.OBSTACLE_WIDTH, CONFIG.OBSTACLE_HEIGHT),
            k.pos(k.width(), k.height() - CONFIG.GROUND_HEIGHT - CONFIG.OBSTACLE_HEIGHT),
            k.area(),
            k.move(k.LEFT, obstacleSpeed),
            k.color(139, 69, 19), // Brown color
            k.offscreen({ distance: 50 }),
            "obstacle"
        ]);

        console.log("Obstacle spawned at speed:", obstacleSpeed);
        return obstacle;
    }

    function spawnHeart() {
        const heartY = k.height() - CONFIG.GROUND_HEIGHT - k.rand(60, 200);
        const heart = k.add([
            k.rect(CONFIG.HEART_WIDTH, CONFIG.HEART_HEIGHT),
            k.pos(k.width(), heartY),
            k.area(),
            k.move(k.LEFT, obstacleSpeed),
            k.color(255, 0, 0), // Red color
            k.offscreen({ distance: 50 }),
            "heart"
        ]);

        console.log("Heart spawned at height:", heartY);
        return heart;
    }

    // Spawn obstacles every 2 seconds
    k.loop(CONFIG.OBSTACLE_SPAWN_INTERVAL, spawnObstacle);

    // Spawn hearts less frequently
    k.loop(CONFIG.HEART_SPAWN_INTERVAL, () => {
        if (k.chance(CONFIG.HEART_SPAWN_CHANCE)) {
            spawnHeart();
        }
    });

    // Increase difficulty over time
    k.loop(CONFIG.DIFFICULTY_INTERVAL, () => {
        obstacleSpeed += CONFIG.SPEED_INCREASE;
        console.log("Difficulty increased! New obstacle speed:", obstacleSpeed);
    });

    return {
        getCurrentSpeed: () => obstacleSpeed,
        resetSpeed: () => {
            obstacleSpeed = CONFIG.OBSTACLE_SPEED;
            console.log("Obstacle speed reset to:", obstacleSpeed);
        }
    };
}

export function setupCollisions(k, player, gameState) {
    // Player hits obstacle
    player.onCollide("obstacle", (obstacle) => {
        k.destroy(obstacle);
        gameState.fear = Math.min(gameState.fear + CONFIG.FEAR_PER_HIT, 100);
        
        console.log("Player hit obstacle! Fear:", gameState.fear);

        // Visual feedback
        k.add([
            k.text(`+${CONFIG.FEAR_PER_HIT} Fear!`, { size: 16 }),
            k.pos(player.pos.x, player.pos.y - 30),
            k.color(255, 0, 0),
            k.lifespan(1),
            k.move(k.UP, 50)
        ]);

        // Play hit sound if available
        try {
            k.play("hit");
        } catch (e) {
            console.log("Hit sound not available");
        }
    });

    // Player collects heart
    player.onCollide("heart", (heart) => {
        k.destroy(heart);
        gameState.fear = Math.max(gameState.fear - CONFIG.FEAR_REDUCTION, 0);
        
        console.log("Player collected heart! Fear:", gameState.fear);

        // Visual feedback
        k.add([
            k.text(`-${CONFIG.FEAR_REDUCTION} Fear!`, { size: 16 }),
            k.pos(player.pos.x, player.pos.y - 30),
            k.color(0, 255, 0),
            k.lifespan(1),
            k.move(k.UP, 50)
        ]);

        // Play success sound if available
        try {
            k.play("success");
        } catch (e) {
            console.log("Success sound not available");
        }
    });
}
