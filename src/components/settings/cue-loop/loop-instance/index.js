import React, { useState } from "react";

import TimelineItem from "./timeline-item";

function LoopInstance(props) {
  // console.log('loops from top', props.loop);



  return (
    <div className="col-24">
      <div className="flex  flex-wrap  align-center  justify-center  h-100">
        {props.loop.timeline.length > 0 &&
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
          })}
      </div>
    </div>
  );
}

export default LoopInstance;
