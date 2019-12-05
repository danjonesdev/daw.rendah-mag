import React, { useState, useEffect, useRef } from "react";
import Wad from "web-audio-daw";
import isEqual from "lodash/isEqual";
import last from "lodash/last";

import Store from "../../../../../store";

function Timestamp(props) {
  const [loop] = useState(props.loop);
  const [sampleInstance] = useState(props.sampleInstance);
  const [sample] = useState(props.sampleInstance.sample);
  const [timeStamp] = useState(props.timeStamp);
  const [loopInitiated, setLoopInitiated] = useState(false);

  const store = Store.useStore();
  const cueLoop = store.get("cueLoop");

  const handleSample = () => {
    if (!loopInitiated) {
      let sampleTimeout = (sampleTimeout =
        timeStamp.touchStart -
        cueLoop.loopTime -
        (loop.samples[0].timeStamps[0].touchStart - cueLoop.loopTime));

      // If initial loop has already happened
      if (timeStamp.timeFromStartOfLoop > 0) {
        // Offset loop
        sampleTimeout += loop.samples[0].timeStamps[0].timeFromStartOfLoop;
      }

      const handleTimeout = () => {
        setTimeout(() => {
          if (loop.active && loop.loopCompleted) sample.play();
        }, sampleTimeout);
      };

      setInterval(() => {
        if (loop.loopCompleted) handleTimeout();
      }, cueLoop.loopTime);

      handleTimeout();
      setLoopInitiated(true);
    }
  };

  if (sampleInstance && loop.loopCompleted) {
    handleSample();
    return false;
  }

  return false;
}

export default Timestamp;
