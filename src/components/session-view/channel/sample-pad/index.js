import React, { useState, useEffect } from 'react';
// import { soundManager } from "soundmanager2";
import Pizzicato from 'pizzicato';

// soundManager.setup({
//   // where to find flash audio SWFs, as needed
//   url: "/path/to/swf-files/",
//   onready: function() {
//     //
//     // SM2 is ready to play audio!
//   }
// });

function Channel(props) {
  const [sample, setSample] = useState(null);
  const [fx, setFx] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadSound = new Pizzicato.Sound(props.file, function(error) {
      if (error) {
        setError(true);
      } else {
        if (props.effects && props.effects.length) {
          handleEffects(loadSound)
        } else {
            setSample(loadSound);
        }
      }
    });
  }, [props]);

  const handleEffects = (loadSound) => {
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
      var delay = new Pizzicato.Effects.Delay(propertyArray);
      loadSound.removeEffect(delay);
      loadSound.addEffect(delay);
      setSample(loadSound);
    }
  };

  const handleClick = () => {
    sample.stop();
    sample.play();
  };

  if (sample) {

    return (
      <div className="col-24  pa1  session-view__channel__pad">
        <div className="flex  flex-wrap  pa2" onClick={handleClick}>
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
