import { GameLoop, keyPressed, onKey } from 'kontra';

//import { createTunes } from './tunes';

export const createGameLoop = (config) => {
  const { player, spGround } = config;

  console.log('createGameLoop', config);

  //createTunes();

  onKey('w', function (e) {
    player.jump();
  });

  const loop = GameLoop({
    // create the main game loop
    update: (dt) => {
      let hasNoHorizontalInput = true;
      // Input
      if (keyPressed('d')) {
        hasNoHorizontalInput = false;
        player.moveRight();
      }
      if (keyPressed('a')) {
        hasNoHorizontalInput = false;
        player.moveLeft();
      }

      //if (keyPressed('w')) player.jump();

      // Update Sprites
      player.update({ hasNoHorizontalInput });
    },
    render: () => {
      player.render();
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
