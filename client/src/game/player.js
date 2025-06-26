import { CONFIG } from './config.js';

export function createPlayer(k) {
    const player = k.add([
        k.rect(CONFIG.PLAYER_WIDTH, CONFIG.PLAYER_HEIGHT),
        k.pos(100, 300),
        k.area(),
        k.body(),
        k.color(0, 0, 255), // Blue color
        {
            iscrouching: false,
            originalHeight: CONFIG.PLAYER_HEIGHT
        },
        "player"
    ]);

    console.log("Player created at position:", player.pos.x, player.pos.y);

    return player;
}

export function setupPlayerControls(k, player) {
    // Jump only when grounded
    k.onKeyPress("space", () => {
        if (player.isGrounded()) {
            player.jump(CONFIG.JUMP_FORCE);
            console.log("Player jumped");
        } else {
            console.log("Jump attempted but player not grounded");
        }
    });

    // Continuous left/right movement while key is held
    k.onKeyDown("left", () => {
        player.move(-CONFIG.PLAYER_SPEED, 0);
    });

    k.onKeyDown("right", () => {
        player.move(CONFIG.PLAYER_SPEED, 0);
    });

    k.onKeyDown("a", () => {
        player.move(-CONFIG.PLAYER_SPEED, 0);
    });

    k.onKeyDown("d", () => {
        player.move(CONFIG.PLAYER_SPEED, 0);
    });

    // Duck/crouch implementation
    k.onKeyDown("down", () => {
        if (!player.iscrouching && player.isGrounded()) {
            player.iscrouching = true;
            player.height = CONFIG.PLAYER_CROUCH_HEIGHT;
            // Update collision box
            if (player.area && player.area.shape) {
                player.area.shape.height = CONFIG.PLAYER_CROUCH_HEIGHT;
            }
            console.log("Player crouching");
        }
    });

    k.onKeyDown("s", () => {
        if (!player.iscrouching && player.isGrounded()) {
            player.iscrouching = true;
            player.height = CONFIG.PLAYER_CROUCH_HEIGHT;
            // Update collision box
            if (player.area && player.area.shape) {
                player.area.shape.height = CONFIG.PLAYER_CROUCH_HEIGHT;
            }
            console.log("Player crouching");
        }
    });

    k.onKeyRelease("down", () => {
        if (player.iscrouching) {
            player.iscrouching = false;
            player.height = CONFIG.PLAYER_HEIGHT;
            // Update collision box
            if (player.area && player.area.shape) {
                player.area.shape.height = CONFIG.PLAYER_HEIGHT;
            }
            console.log("Player standing up");
        }
    });

    k.onKeyRelease("s", () => {
        if (player.iscrouching) {
            player.iscrouching = false;
            player.height = CONFIG.PLAYER_HEIGHT;
            // Update collision box
            if (player.area && player.area.shape) {
                player.area.shape.height = CONFIG.PLAYER_HEIGHT;
            }
            console.log("Player standing up");
        }
    });
}
