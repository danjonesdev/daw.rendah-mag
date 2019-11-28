import React, { useState, useEffect, useRef } from "react";
import Wad from "web-audio-daw";
import isEqual from "lodash/isEqual";
import last from "lodash/last";

import TimelineItem from "./timeline-item";

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
  const [loop, setLoop] = useState(props);

  if (loop && loop.active && loop.loopCompleted) {
    return (
      <div className="col-24">
        <div className="flex  flex-wrap  align-center  justify-center  h-100">
          {loop.timeline.length > 0 &&
            loop.timeline.map((sample, index) => {
              return <TimelineItem sample={sample} loop={loop} loopIndex={props.loopIndex} sampleIndex={index} />;
            })}
        </div>
      </div>
    );
  }
  return false;
}

export default Loop;
