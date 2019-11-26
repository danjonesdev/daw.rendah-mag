import React, { useState, useEffect, useRef } from 'react';
import Wad from 'web-audio-daw';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';

import TimelineItem from './timeline-item';

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
    console.log('loop yo', loop);
    return (
      <div className="col-24  session-view__channel__pad">
        <div className="flex  flex-wrap  align-center  justify-center  h-100">
          {loop.timeline.length > 0 && loop.timeline.map(item => {
            return <TimelineItem sample={item} loop={loop} />
          })}
        </div>
      </div>
    );
  }
  return false;
}

export default Loop;
