import { createConnectedStore, withLogger } from "undux";

// Create a store with an initial value.
export default createConnectedStore(
  {
    settings: {
      bpm: 128,
      channels: [
        {
          name: "kicks",
          color: "#000000",
          samples: [
            {
              name: "kick-1",
              active: true,
              file: "https://alemangui.github.io/pizzicato/audio/chop.mp3"
              // effects: [
              //   {
              //     name: "delay",
              //     properties: {
              //       feedback: 0.8,
              //       time: 0.22,
              //       mix: 0.75
              //     }
              //   }
              // ]
            },
            {
              name: "kick-2",
              active: false,
              file: "kick-2.wav"
            }
          ]
        },
        {
          name: "snares",
          color: "#000000",
          samples: [
            {
              name: "snare-1",
              active: true,
              file: "https://alemangui.github.io/pizzicato/audio/wah.mp3"
            },
            {
              name: "snare-2",
              active: false,
              file: "snare-2.wav"
            }
          ]
        }
      ]
    },
    one: 1,
    two: 2,
    parent: {
      child: 1
    }
  },
  withLogger
);
