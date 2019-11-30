import React, { useState } from "react";

import TimelineItem from "./timeline-item";

function LoopInstance(props) {
  // console.log('loops from top', props.loop);



  return (
        props.loop.timeline.length > 0 &&
          props.loop.timeline.map((sample, index) => {
            return (
              <TimelineItem
                key={index}
                sample={sample}
                loop={props.loop}
                loopIndex={props.loopIndex}
                sampleIndex={index}
              />
            );
          })
  );
}

export default LoopInstance;
