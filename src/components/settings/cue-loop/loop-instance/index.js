import React, { useState } from "react";

import TimelineItem from "./timeline-item";

function LoopInstance(props) {
  const [loop] = useState(props);

  if (loop && loop.active && loop.loopCompleted) {
    return (
      <div className="col-24">
        <div className="flex  flex-wrap  align-center  justify-center  h-100">
          {loop.timeline.length > 0 &&
            loop.timeline.map((sample, index) => {
              return (
                <TimelineItem
                  key={index}
                  sample={sample}
                  loop={loop}
                  loopIndex={props.loopIndex}
                  sampleIndex={index}
                />
              );
            })}
        </div>
      </div>
    );
  }
  return false;
}

export default LoopInstance;
