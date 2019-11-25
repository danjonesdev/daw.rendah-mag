import React, { useState, useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';

function Channel(props) {
  const [sample, setSample] = useState(null);
  // const [hasHandledLooping, setHasHandlededLooping] = useState(false);

  // unmount
  useEffect(() => {
    console.log('yo');
    if (!sample) {
      setSample(props.sample);
      props.sample.on('play', handlePlay);
    }
  }, []);

  const handleClick = () => {
    // console.log('handleClick:play');
    sample.stop();
    sample.play();
  };

  const handlePlay = () => {
    console.log('handlePlay:play');
    props.handleCueing();
  };

  if (sample) {
    return (
      <div className="col-24  session-view__channel__pad">
        <div
          className="flex  flex-wrap  align-center  justify-center  h-100"
          onClick={handleClick}
        >
          ayy
        </div>
      </div>
    );
  }

  return false;
}

export default Channel;
