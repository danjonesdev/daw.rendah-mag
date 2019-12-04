import React, { useState } from "react";

import Timestamp from "./time-stamp";

function LoopInstance(props) {
  // console.log('loops from top', props.loop);

  return (
    props.loop.samples.length > 0 &&
    props.loop.samples.map((sampleInstance, index) => {
      return sampleInstance.timeStamps.map((timeStamp, index) => {
        return (
          <Timestamp
            key={index}
            timeStamp={timeStamp}
            sampleInstance={sampleInstance}
            loop={props.loop}
            // loopIndex={props.loopIndex}
            // sampleIndex={index}
          />
        );
      });
    })
  );
}

export default LoopInstance;
