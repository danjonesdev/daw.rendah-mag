import React, { useState, useEffect, useRef } from "react";
import Wad from "web-audio-daw";
import isEqual from "lodash/isEqual";
import last from "lodash/last";

import Store from "../../../../../store";

// import Store from '../../../../store';
// import mutateObject from '../../../../helpers/mutate-object';

// const useCompare = (val: any) => {
//     const prevVal = usePrevious(val)
//     // console.log('prevVal', prevVal);
//     // console.log('val', val);
//     return !isEqual(prevVal, val)
// }
//
// const usePrevious = (value) => {
//     const ref = useRef();
//     useEffect(() => {
//       ref.current = value;
//     });
//     return ref.current;
// }

function Loop(props) {
  const [loop, setLoop] = useState(props.loop);
  const [sample, setSample] = useState(props.sample);
  const [sound, setSound] = useState(null);
  const [loopFinalised, setLoopFinalised] = useState(false);

  const store = Store.useStore();
  const cueLoop = store.get("cueLoop");
  const loops = store.get("loops");




  // const handleLooping = () => {
  //   console.log('handleLooping');
  //   if (hasLoopsChanged || inititalLoopFlag) {
  //     console.log('handleLooping', props.loop);
  //     console.log('cueLoop.loopTime', cueLoop.loopTime);
  //
  //
  //
  //   setInititalLoopFlag(false);
  //   }
  // }

  useEffect(() => {
    if (sample.effects && sample.effects.length) {
      handleEffects();
    } else {
      const wadSample = new Wad({ source: sample.file });
      setSound(wadSample);
    }
  }, []);

  const handleEffects = () => {
    var i;
    for (i = 0; i < sample.effects.length; i++) {
      const effect = sample.effects[i];
      const propertyArray = {};

      for (let key in effect.properties) {
        if (effect.properties.hasOwnProperty(key)) {
          if (key !== "_unique") {
            propertyArray[key] = effect.properties[key] / 10;
          }
        }
      }

      const wadSample = new Wad({
        source: sample.file,
        [effect.name]: propertyArray
      });

      setSound(wadSample);
    }
  };

  const handleSampleInterval = () => {
    if (!loopFinalised) {
      let sampleTimeout = sampleTimeout = sample.timeStamp - cueLoop.loopTime - (loop.timeline[0].timeStamp - cueLoop.loopTime);

      // If initial loop has already happened -> Offset loop
      if (sample.timeFromStartOfLoop > 0) {
        sampleTimeout += loop.timeline[0].timeFromStartOfLoop
      }

      const executeOrder = () => {
        setTimeout(() => {
          sound.play();
        }, sampleTimeout);
      };

      setInterval(() => {
        executeOrder();
      }, cueLoop.loopTime);

      executeOrder();
      setLoopFinalised(true);
    }
  };

  if (sample && sound) {
    handleSampleInterval();

    return false;
  }

  return false;
}

export default Loop;
