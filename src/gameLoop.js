import { GameLoop, keyPressed } from 'kontra';

//import { createTunes } from './tunes';

export const createGameLoop = (config) => {
  const { spReaper, spGround, canvas } = config;

  console.log('createGameLoop', config);

  //createTunes();

  const loop = GameLoop({
    // create the main game loop
    update: (dt) => {
      let horKey = false;
      // Input
      if (keyPressed('d') && spReaper.dx < 8) {
        spReaper.dx += 0.5;
        spReaper.scaleX = 1;
        horKey = true;
      } else if (keyPressed('a') && spReaper.dx > -8) {
        spReaper.dx -= 0.5;
        spReaper.scaleX = -1;
        horKey = true;
      }

      if (!horKey) spReaper.dx *= 0.9;

      // Animate
      spReaper.update();
      if (spReaper.x > canvas.width + spReaper.width / 2) {
        spReaper.x = -spReaper.width;
      }
      if (spReaper.x < -spReaper.width) {
        spReaper.x = canvas.width + spReaper.width / 2;
      }
    },
    render: () => {
      spReaper.render();
      spGround.render();
    },
  });

  return loop;
};

const glUpdate = () => {
  // update the game state
  //      rSprite.update();
};

const glRender = () => {
  // render the game state
  //  rSprite.render();
};
