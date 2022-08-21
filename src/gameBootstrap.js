import { init, load, SpriteSheet, Sprite, initKeys, GameObject } from 'kontra';
import { createPlayer } from './death';

export const bootstrap = (config) => {
  init();
  initKeys();

  console.log('init');

  const pc = createPlayer();

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

      pc.init({ sheetAsset: assets[0], canvas: config.canvas });

      console.log(pc.state.sp);

      const spGroundTile1 = Sprite({
        image: assets[1],
        x: 0,
        y: 320,
        anchor: { x: 0, y: 1 },
      });
      const spGroundTile2 = Sprite({
        image: assets[1],
        x: 320,
        y: 320,
        anchor: { x: 0, y: 1 },
      });

      const spGround = GameObject({});
      spGround.addChild(spGroundTile1);
      spGround.addChild(spGroundTile2);

      config.onComplete({
        ...config,
        spGround,
        player: pc,
      });
    })
    .catch(function (err) {
      console.warn('Error loading assets', err);
    });
};
