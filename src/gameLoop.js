import { GameLoop } from 'kontra';
import { createTunes } from './tunes';

export const createGameLoop = (config) => {
  const { spReaper, spGround, canvas } = config;

  console.log('createGameLoop', config);

  const tunes = createTunes();

  const loop = GameLoop({
    // create the main game loop
    update: (dt) => {
      spReaper.update();
      if (spReaper.x > canvas.width + spReaper.width / 2) {
        spReaper.x = -spReaper.width;
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
