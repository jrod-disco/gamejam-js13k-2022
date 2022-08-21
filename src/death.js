import { load, SpriteSheet, Sprite } from 'kontra';
import { PLAYER_FLOOR_Y } from './constants';

// Player Character
export const createPlayer = () => {
  const state = {
    sp: null,
    health: null,
    canvas: null,
    isJumping: false,
    isDoubleJumping: false,
  };

  const init = ({ sheetAsset, canvas }) => {
    state.canvas = canvas;
    // Player Sprite
    const spriteSheet = SpriteSheet({
      image: sheetAsset,
      frameWidth: 32,
      frameHeight: 32,

      // this will also call createAnimations()
      animations: {
        // create 1 animation: still
        still: {
          // a single frame
          frames: 1,
        },
        idle: {
          // sequence of frames (can be non-consecutive)
          frames: [0, 1, 2],
          frameRate: 10,
          loop: true,
        },
      },
    });

    state.sp = Sprite({
      x: 100,
      y: PLAYER_FLOOR_Y,
      anchor: { x: 0.5, y: 1 },

      // required for an animation sprite
      animations: spriteSheet.animations,
    });
    state.sp.playAnimation('idle');
  };

  const passesHorizontalSpeedCheck = () => {
    return state.sp.dx < 8 && state.sp.dx > -8;
  };

  const moveRight = () => {
    if (passesHorizontalSpeedCheck()) {
      state.sp.dx += 0.5;
      state.sp.scaleX = 1;
    }
  };
  const moveLeft = () => {
    if (passesHorizontalSpeedCheck()) {
      state.sp.dx -= 0.5;
      state.sp.scaleX = -1;
    }
  };

  const slowDown = () => {
    state.sp.dx *= 0.9;
  };

  const jump = () => {
    const sp = state.sp;
    if (state.isDoubleJumping) return;
    if (state.isJumping) {
      //start double jump
      console.log('double jump', sp.ddy, sp.dy);
      state.isDoubleJumping = true;

      //sp.dy = Math.min(sp.dy * -1.5, sp.dy - 8);
      sp.ddy = 0;
      sp.dy = -9;
    } else {
      //start first jump
      console.log('jump');
      state.isJumping = true;
      sp.dy = -10;
    }
  };

  const handleHorizontalBounds = () => {
    const sp = state.sp;
    if (sp.x > state.canvas.width + sp.width / 2) {
      sp.x = -sp.width;
    }
    if (sp.x < -sp.width) {
      sp.x = state.canvas.width + sp.width / 2;
    }
  };
  const update = ({ hasNoHorizontalInput }) => {
    const sp = state.sp;
    hasNoHorizontalInput && slowDown();
    handleHorizontalBounds();

    if (state.isJumping || state.isDoubleJumping) {
      sp.ddy += 0.1;
      if (sp.y > PLAYER_FLOOR_Y) {
        sp.ddy = 0;
        sp.dy = 0;
        sp.y = PLAYER_FLOOR_Y;
        state.isJumping = false;
        state.isDoubleJumping = false;
      }
    }

    state.sp.update();
  };
  const render = () => state.sp.render();

  return {
    state,
    init,
    moveRight,
    moveLeft,
    jump,
    update,
    render,
  };
};
