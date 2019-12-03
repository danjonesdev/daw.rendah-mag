import React, { useState, useEffect, useRef } from "react";
import Wad from "web-audio-daw";
import isEqual from "lodash/isEqual";
import last from "lodash/last";

import Store from "../../../store";
import mutateObject from "../../../helpers/mutate-object";
import lightenDarkenColor from "../../../helpers/lighten-darken-color";

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
  const [touching, setTouching] = useState(false);

  const store = Store.useStore();
  const cueLoop = store.get("cueLoop");
  const loops = store.get("loops");
  const settings = store.get("settings");

  useEffect(() => {
    if (props.effects && props.effects.length) {
      handleEffects();
    } else {
      const wadSample = new Wad({
        source: props.file,
        env: {
          attack: 0.0,
          decay: 0.0,
          sustain: 1.0,
          hold: -1.0,
          release: 2
        }
      });
      setSample(wadSample);
    }
  }, [props]);

  const handleEffects = () => {
    const effectobject = {};

    var i;
    for (i = 0; i < props.effects.length; i++) {
      const effect = props.effects[i];
      const propertyObject = {};

      for (let key in effect.properties) {
        const property = effect.properties[key];
        propertyObject[property.name] = property.val;
      }

      effectobject[effect.name] = propertyObject;
    }

    const wadSample = new Wad({
      source: props.file,
      env: {
        attack: 0.0,
        decay: 0.0,
        sustain: 1.0,
        hold: -1.0,
        release: 2
      },
      tuna: effectobject
    });

    setSample(wadSample);
  };

  const handleTouchEnd = () => {
    const newLoops = loops;

    sample.stop();
    setTouching(false);

    // if looping
    if (cueLoop.isLooping) {
      const sampleHitInstance = {
        name: props.name,
        file: props.file,
        effects: props.effects,
        timeStamp: performance.now(),
        timeFromStartOfLoop: cueLoop.loopRestarted
          ? performance.now() - cueLoop.loopRestarted
          : 0
      };

      // check if first loop
      if (!newLoops.length) {
        // if first loop, create loop object + push sample hit to object timeline
        const loopInstance = {
          active: true,
          startTime: performance.now(),
          // endTime: null,
          // duration: null,
          loopCompleted: false,
          timeline: [sampleHitInstance]
        };

        newLoops.push(loopInstance);
        return;
      }

      // if not first loop, check if last loopCompleted is true,
      // if true, create new instance, else push sample hit to object timelime
      if (newLoops[loops.length - 1].loopCompleted) {
        const loopInstance = {
          active: true,
          startTime: performance.now(),
          // endTime: null,
          // duration: null,
          loopCompleted: false,
          timeline: [sampleHitInstance]
        };

        newLoops.push(loopInstance);
        return;
      } else {
        newLoops[loops.length - 1].timeline.push(sampleHitInstance);
      }
    }

    store.set("loops")(newLoops);
  };

  const handleTouchStart = () => {
    // sample.stop();
    sample.play();
    setTouching(true);
  };

  if (sample) {
    return (
      <div
        className="col-24  flex  align-center  justify-center  session-view__channel__item-wrapper"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          style={{
            backgroundColor: touching
              ? lightenDarkenColor(props.category.color, 90)
              : "#FFFFFF"
          }}
          className="  flex  align-center  justify-center  session-view__channel__item"
        >
          <span
            class="session-view__channel__item__light"
            style={{
              backgroundColor: props.category.color || "#000000"
            }}
          />

          <span class="pr3  session-view__channel__item__text">
            {props.name}
          </span>
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
