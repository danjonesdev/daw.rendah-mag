import React, { useState, useEffect, useRef } from 'react';
import Pizzicato from 'pizzicato';
import isEqual from 'lodash/isEqual';

import Store from '../../../../store';

const useCompare = (val: any) => {
    const prevVal = usePrevious(val)
    return !isEqual(prevVal, val)
}

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

function Channel(props) {
  const [inititalLoopFlag, setInititalLoopFlag] = useState(false);
  let hasLoopsChanged = useCompare(props.loopInstances)

  const [sample, setSample] = useState(null);
  const [error, setError] = useState(false);

  const store = Store.useStore();
  const cueLoop = store.get('cueLoop');

  // will only fire once on initial mount
  const useOnce = () => useEffect(() => {
    hasLoopsChanged = true;
    setInititalLoopFlag(true);
  }, [])

  useOnce();

  useEffect(() => {
    const loadSample = new Pizzicato.Sound(props.file, function(error) {
      if (error) {
        setError(true);
      } else {
        setSample(loadSample);
      }
    });
  }, [props]);

  const handleEffects = () => {
    var i;
    for (i = 0; i < props.effects.length; i++) {
      const effect = props.effects[i];
      const propertyArray = {};

      for (let key in effect.properties) {
        if (effect.properties.hasOwnProperty(key)) {
          if (key !== '_unique') {
            propertyArray[key] = (effect.properties[key] / 10);
          }
        }
      }

      const delay = new Pizzicato.Effects[effect.name](propertyArray);
      sample.stop();
      sample.removeEffect(delay);
      sample.addEffect(delay);
    }
  };

  const handleLooping = () => {
    if (hasLoopsChanged || inititalLoopFlag) {

    for (let i = 0; i < props.loopInstances.length; i++) {
      setInterval(() => {
        sample.stop();
        // sample.play();
      }, props.loopInstances[i].time)
    }

    setInititalLoopFlag(false);

  }

  }

  const handleClick = () => {
    console.log('cueLoop', cueLoop);
    if (cueLoop.isLooping) {
      //
    }
    // setInterval(() => {
      sample.stop();
      sample.play();
    // }, 1000)
  };

  if (sample) {
    if (props.effects && props.effects.length) handleEffects();
    if (props.loopInstances && props.loopInstances.length) handleLooping();

    return (
      <div className="col-24  session-view__channel__pad">
        <div className="flex  flex-wrap  align-center  justify-center  h-100" onClick={handleClick}>
          sample {props.name}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-24  sample-pad-wrapper">
        <div className="flex  flex-wrap  sample-pad">error: {props.name}</div>
      </div>
    );
  }

  return false;
}

export default Channel;
