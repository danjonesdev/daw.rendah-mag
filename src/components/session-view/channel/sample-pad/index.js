import React, { useState, useEffect, useRef } from 'react';
import Pizzicato from 'pizzicato';
import isEqual from 'lodash/isEqual';

import Store from '../../../../store';
import mutateObject from '../../../../helpers/mutate-object';

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
  let hasLoopsChanged = useCompare(props.loop.instances)

  const [sample, setSample] = useState(null);
  const [error, setError] = useState(false);

  const store = Store.useStore();
  const cueLoop = store.get('cueLoop');
  const settings = store.get('settings');
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
        console.log('render');
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
      console.log('handleLooping', props.loop);

      const executeOrder = () => {
        for (let i = 0; i < props.loop.instances.length; i++) {
          setTimeout(() => {
            sample.stop();
            sample.play();
          }, props.loop.instances[i].time)
        }
      }

      setInterval(() => {
        executeOrder()
      }, cueLoop.loopTime)

    executeOrder();
    setInititalLoopFlag(false);
    }
  }

  const handleClick = () => {
    if (cueLoop.isLooping) {
      // Set initial cue starting time
      if (!cueLoop.loopTime) {
        cueLoop.loopTime = performance.now();
      }

      props.loop.instances.push({
        time: performance.now() - cueLoop.loopTime,
      })

      store.set('settings')(
        mutateObject(
          settings,
          props.loop,
          'instances',
          props.loop.instances
        )
      );

      store.set('cueLoop')(cueLoop);
    }
    // setInterval(() => {

    // }, 1000)

    console.log('sample', sample);
    sample.stop();
    sample.play();

  };

  if (sample) {
    if (props.effects && props.effects.length) handleEffects();
    // if (props.loopInstances && props.loopInstances.length) handleLooping();
    if (!cueLoop.isLooping && cueLoop.loopTime) {
      handleLooping();
    }

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
