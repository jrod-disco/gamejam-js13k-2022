import { init, load, SpriteSheet, Sprite } from 'kontra';

export const bootstrap = (config) => {
  init();

  console.log('init');

  load(
    `${config.assetPath}reaper-spritesheet.png`,
    `${config.assetPath}groundtile_min.png`
  )
    .then((assets) => {
      console.log('assets', assets);
      config.assets = assets;
      //   if (window.localStorage) {
      //     let personalBest =
      //       parseInt(localStorage.getItem('com.jrvisuals.js13kdeath.high')) || 0;
      //   } else {
      //     console.warn('Local Storage Unavailable');
      //   }

      let spriteSheet = SpriteSheet({
        image: assets[0],
        frameWidth: 32,
        frameHeight: 32,

        // this will also call createAnimations()
        animations: {
          // create 1 animation: still
          still: {
            // a single frame
            frames: 1,
          },
        },
      });

      spriteSheet.createAnimations({
        // create 4 animations: jump, walk, moonWalk, attack
        idle: {
          // sequence of frames (can be non-consecutive)
          frames: [0, 1, 2],
          frameRate: 10,
          loop: true,
        },
      });

      let spReaper = Sprite({
        x: 100,
        y: 288,
        anchor: { x: 0.5, y: 1 },
        dx: 2,

        // required for an animation sprite
        animations: spriteSheet.animations,
      });

      spReaper.playAnimation('idle');

      let spGround = Sprite({
        image: assets[1],
        x: 0,
        y: 320,
        anchor: { x: 0, y: 1 },
      });

      config.onComplete({ ...config, spriteSheet, spReaper, spGround });
    })
    .catch(function (err) {
      console.warn('Error loading assets', err);
    });
};
