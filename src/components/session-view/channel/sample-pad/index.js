import React, { useState, useEffect } from "react";
// import { soundManager } from "soundmanager2";
import Pizzicato from "pizzicato";

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
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadSound = new Pizzicato.Sound(props.file, function(error) {
      if (error) {
        setError(true);
      } else {
        setSample(loadSound);
      }
    });
  }, []);

  const handleClick = a => {
    a.stop();
    a.play();
    // var delay = new Pizzicato.Effects.Delay();
    // a.addEffect(delay);
  };

  console.log("render");

  if (sample) {
    return (
      <div className="col-24  pa1  session-view__channel__pad">
        <div
          className="flex  flex-wrap  pa2"
          onClick={() => {
            handleClick(sample);
          }}
        >
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
