import React, { useState, useEffect, useRef } from "react";
import Wad from "web-audio-daw";
import isEqual from "lodash/isEqual";
import last from "lodash/last";

import Store from "../../../../../store";

function Loop(props) {
  const [loop, setLoop] = useState(props.loop);
  const [sample, setSample] = useState(props.sample);
  const [sound, setSound] = useState(null);
  const [loopInitiated, setLoopInitiated] = useState(false);

  const store = Store.useStore();
  const cueLoop = store.get("cueLoop");

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

  const handleSample = () => {
    if (!loopInitiated) {
      let sampleTimeout = (sampleTimeout =
        sample.timeStamp -
        cueLoop.loopTime -
        (loop.timeline[0].timeStamp - cueLoop.loopTime));

      // If initial loop has already happened -> Offset loop
      if (sample.timeFromStartOfLoop > 0) {
        sampleTimeout += loop.timeline[0].timeFromStartOfLoop;
      }

      const handleTimeout = () => {
        setTimeout(() => {
          if (loop.active) sound.play();
        }, sampleTimeout);
      };

      setInterval(() => {
        if (loop.active) handleTimeout();
      }, cueLoop.loopTime);

      handleTimeout();
      setLoopInitiated(true);
    }
  };

  if (sample && sound && loop.loopCompleted) {
    handleSample();
    return false;
  }

  return false;
}

export default Loop;
