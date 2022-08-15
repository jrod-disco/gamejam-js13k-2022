// Learn More here -> https://straker.github.io/kontra/getting-started

import { init, load } from 'kontra';
import { bootstrap } from './gameBootstrap';
import { createGameLoop } from './gameLoop';

const assetPath = 'assets/';

const createGame = () => {
  // Initialize the game loop
  const startGame = (config) => {
    console.log('start game');
    const gameLoop = createGameLoop(config);
    gameLoop.start(); // start the game
  };

  // Boostrap and load all the things...
  const canvas = document.getElementById('game');
  const config = {
    canvas,
    assetPath,
    onComplete: (config) => startGame(config),
  };

  return {
    bootstrap: () => bootstrap(config),
  };
};

const game = createGame();
game.bootstrap();

//  -----

const canvas = document.getElementById('game');

const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.oImageSmoothingEnabled = false;
ctx.canvas.width = 320;
ctx.canvas.height = 320;

// const resize = () => {
//   const w = document.body.offsetWidth;
//   const h = document.body.offsetHeight;
//   ctx.canvas.width = w;
//   ctx.canvas.height = h;
//   ctx.translate(w / 2, h / 2);

//   console.log('resize', w, h);
// };
// window.addEventListener('resize', resize, false);
// resize();
