import React, { useState, useEffect, useRef } from 'react';
import Wad from 'web-audio-daw';
import isEqual from 'lodash/isEqual';

import Store from '../../../../store';
import mutateObject from '../../../../helpers/mutate-object';

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

function Channel(props) {
  const [sample, setSample] = useState(null);
  const [error, setError] = useState(false);

  const store = Store.useStore();
  const cueLoop = store.get('cueLoop');
  const settings = store.get('settings');


  useEffect(() => {
    if (props.effects && props.effects.length) {
      handleEffects();
    } else {
      const wadSample = new Wad({source : props.file})
      setSample(wadSample);
    }
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

      const wadSample = new Wad(
        {
          source : props.file,
          [effect.name] : propertyArray
        }
      )

      setSample(wadSample);
    }
  };

  const handleClick = () => {
    // sample.stop();
    sample.play();
  };


  if (sample) {
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
