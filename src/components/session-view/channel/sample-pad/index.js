import React, { useState, useEffect, useRef } from "react";
import Wad from "web-audio-daw";
import isEqual from "lodash/isEqual";
import last from "lodash/last";

import Store from "../../../../store";
import mutateObject from "../../../../helpers/mutate-object";

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

function Channel(props) {
  const [sample, setSample] = useState(null);
  const [error, setError] = useState(false);

  const store = Store.useStore();
  const cueLoop = store.get("cueLoop");
  const loops = store.get("loops");
  const settings = store.get("settings");

  useEffect(() => {
    if (props.effects && props.effects.length) {
      handleEffects();
    } else {
      const wadSample = new Wad({ source: props.file });
      setSample(wadSample);
    }
  }, [props]);

  const handleEffects = () => {
    var i;
    for (i = 0; i < props.effects.length; i++) {
      const effect = props.effects[i];
      const propertyArray = {};

      for (let key in effect.properties) {
        if (effect.properties.hasOwnProperty(key)) {
          if (key !== "_unique") {
            propertyArray[key] = effect.properties[key] / 10;
          }
        }
      }

      const wadSample = new Wad({
        source: props.file,
        [effect.name]: propertyArray
      });

      setSample(wadSample);
    }
  };

  const handleClick = () => {
    // sample.stop();
    sample.play();

    console.log("loops", loops);
    console.log("props", props);
    console.log("cueLoop", cueLoop);

    // if looping
    if (cueLoop.isLooping) {
      const sampleHitInstance = {
        name: props.name,
        file: props.file,
        effects: props.effects,
        timeStamp: performance.now()
      };

      // check if first loop
      if (!loops.length) {
        // if first loop, create loop object + push sample hit to object timeline
        const loopInstance = {
          active: true,
          startTime: performance.now(),
          endTime: null,
          duration: null,
          loopCompleted: false,
          timeline: [sampleHitInstance]
        };

        loops.push(loopInstance);
        return;
      }

      // if not first loop, check if last loopCompleted is true,
      // if true, create new instance, else push sample hit to object timelime
      if (loops[loops.length - 1].loopCompleted) {
        const loopInstance = {
          active: true,
          startTime: performance.now(),
          endTime: null,
          duration: null,
          loopCompleted: false,
          timeline: [sampleHitInstance]
        };

        loops.push(loopInstance);
        return;
      } else {
        loops[loops.length - 1].timeline.push(sampleHitInstance);
      }
    }

    console.log("loops", loops);
  };

  if (sample) {
    return (
      <div className="col-24  session-view__channel__pad-wrapper">
        <div
          className="col-24  session-view__channel__pad"
          onClick={handleClick}
        >
          <div className="flex  flex-wrap  align-center  justify-center  h-100">
            sample {props.name}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-24  sample-pad-wrapper">
        <div className="flex  flex-wrap  sample-pad">error: {props.name}</div>
      </div>
    );
  }

  return false;
}

export default Channel;
