import TinyMusic from 'tinymusic';

export const createTunes = () => {
  // create a new Web Audio API context
  var ac = new AudioContext();

  // set the playback tempo (120 beats per minute)
  var tempo = 120;

  var harmony = [
    '-   e',
    'D4  e',
    'C4  e',
    'D4  e',
    'Bb3 e',
    'C4  e',
    'A3  e',
    'Bb3 e',

    'G3  e',
    'A3  e',
    'Bb3 e',
    'A3  e',
    'G3  e',
    'A3  e',
    'F3  q',

    '-   e',
    'D4  s',
    'C4  s',
    'D4  e',
    'Bb3 e',
    'C4  e',
    'Bb3 e',
    'A3  e',
    'Bb3 e',

    'G3  e',
    'A3  e',
    'Bb3 e',
    'A3  e',
    'G3  s',
    'A3  s',
    'G3  e',
    'F3  q',
  ];

  // create a new sequence
  var sequence = new TinyMusic.Sequence(ac, tempo, harmony);
  sequence.gain.gain.value = 0.5; // half volume

  // An electric piano/organy (The Doors-ish) sound
  sequence.createCustomWave([-0.8, 1, 0.8, 0.8, -0.8, -0.8, -1]);

  // disable looping
  sequence.loop = true;

  // play it
  sequence.play();
};
