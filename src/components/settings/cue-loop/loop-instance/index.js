import React, { useState } from "react";

import Timestamp from "./time-stamp";

function LoopInstance(props) {
  // console.log('loops from top', props.loop);

  return (
    props.loop.samples.length > 0 &&
    props.loop.samples.map((sampleInstance, sampleIndex) => {
      return sampleInstance.timeStamps.map((timeStamp, timeStampIndex) => {
        return (
          <Timestamp
            key={`${sampleIndex}-${timeStampIndex}`}
            timeStamp={timeStamp}
            sampleInstance={sampleInstance}
            loop={props.loop}
          />
        );
      });
    })
  );
}

export default LoopInstance;
