import TinyMusic from 'tinymusic';

export const createTunes = () => {
  // create a new Web Audio API context
  var ac = new AudioContext();

  // set the playback tempo (120 beats per minute)
  var tempo = 100;

  var lead = ['C4  s', 'A4  s', 'Bb4 s', 'D4 s'];

  var bass = [
    'C2  h',
    '-   0.025',
    'C2  h',
    '-   0.025',
    'A3  h',
    '-   0.025',
    'A2  h',
    '-   0.025',
    'Bb3 w',
    '-   0.025',
    'D2  w',
    '-   0.025',
  ];

  // create a new sequence
  var seq_lead = new TinyMusic.Sequence(ac, tempo, lead);
  var seq_bass = new TinyMusic.Sequence(ac, tempo, bass);
  seq_lead.gain.gain.value = 0.05; //  volume
  seq_bass.gain.gain.value = 1.0; //  volume
  seq_bass.bass.gain.value = 10;
  seq_bass.smoothing = 0.4;

  // An electric piano/organy (The Doors-ish) sound
  seq_lead.createCustomWave([-0.8, 1, 0.8, 0.8, -0.8, -0.8, -1]);
  seq_bass.createCustomWave([-1, -0.9, -0.6, -0.3, 0, 0.3, 0.6, 0.9, 1]);

  seq_lead = new TinyMusic.Sequence(ac, tempo, lead);
  seq_bass = new TinyMusic.Sequence(ac, tempo, bass);
  // disable looping
  seq_lead.loop = true;
  seq_bass.loop = true;

  // play it
  seq_lead.play();
  seq_bass.play();
};
