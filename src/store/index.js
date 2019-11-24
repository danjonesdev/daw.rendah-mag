import { createConnectedStore } from 'undux';

import mutateObject from '../helpers/mutate-object';

const keyArr = [];

// to replace with sanity _key
const randomKey = () => {
  const number = Math.floor(Math.random() * 100001);
  if (keyArr.includes(number)) {
    return randomKey();
  }

  keyArr.push(number);
  return number;
};

// Create a store with an initial value.
export default createConnectedStore({
  settings: {
    _key: randomKey(),
    bpm: 128,
    channels: [
      {
        _key: randomKey(),
        name: 'kicks',
        color: '#000000',
        samples: [
          {
            _key: randomKey(),
            name: 'kick-1',
            active: true,
            file: 'https://alemangui.github.io/pizzicato/audio/chop.mp3',
            effects: [
              {
                _unique: 236472,
                name: 'Delay',
                test: 1,
                properties: {
                  _unique: 236472,
                  feedback: 0,
                  time: 0,
                  mix: 0
                }
              }
            ],
            loopInstances: [
              {
                _key: randomKey(),
                time: 2000,
              },
              {
                _key: randomKey(),
                time: 4000,
              }
            ]
          },
          {
            _key: randomKey(),
            name: 'kick-2',
            active: false,
            file: 'kick-2.wav',
            effects: [
              {
                _unique: 8564,
                name: 'Delay',
                test: 1,
                properties: {
                  _unique: 236472,
                  feedback: 0.8,
                  time: 0.22,
                  mix: 0.75
                }
              }
            ]
          }
        ]
      },
      // {
      //   _key: randomKey(),
      //   name: 'snares',
      //   color: '#000000',
      //   samples: [
      //     {
      //       _key: randomKey(),
      //       name: 'snare-1',
      //       active: true,
      //       file: 'https://alemangui.github.io/pizzicato/audio/wah.mp3'
      //     },
      //     {
      //       _key: randomKey(),
      //       name: 'snare-2',
      //       active: false,
      //       file: 'snare-2.wav'
      //     }
      //   ]
      // }
    ]
  },
  cueLoop: {
    _key: randomKey(),
    isLooping: false,
  },
  functions: {
    _key: randomKey(),
    mutateObject: mutateObject
  }
});
