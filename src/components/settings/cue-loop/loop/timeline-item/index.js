import React, { useState, useEffect, useRef } from 'react';
import Wad from 'web-audio-daw';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';


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
      const wadSample = new Wad({source : sample.file})
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
          if (key !== '_unique') {
            propertyArray[key] = (effect.properties[key] / 10);
          }
        }
      }

      const wadSample = new Wad(
        {
          source : sample.file,
          [effect.name] : propertyArray
        }
      )

      setSound(wadSample);
    }
  };

  const handleSampleInterval = () => {
    if (!loopFinalised) {
      const executeOrder = () => {
        console.log('(sample.timeStamp - loop.duration) - (loop.timeline[0].timeStamp - loop.duration)', (sample.timeStamp - loop.duration) - (loop.timeline[0].timeStamp - loop.duration));
        setTimeout(() => {
          // sample.stop();
          console.log('sample', sample);
          sound.play();
        }, (sample.timeStamp - loop.duration) - (loop.timeline[0].timeStamp - loop.duration))
        }

      setInterval(() => {
        executeOrder()
      }, loop.duration)

      executeOrder();

      setLoopFinalised(true)
    }
  }

  if (sample && sound) {
    // console.log('timeline-item sample', sample);
    // console.log('timeline-item loop', loop);

    handleSampleInterval();
    return (
      <div className="col-24  session-view__channel__pad">
        <div className="flex  flex-wrap  align-center  justify-center  h-100">
          sample
        </div>
      </div>
    );
  }
  return false;
}

export default Loop;
