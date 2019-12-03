import React from "react";

import Bpm from "./bpm";
import Metronome from "./metronome";
import CueLoop from "./cue-loop";
import LoopManager from "./loop-manager";

function Settings() {
  return (
    <div className="flex  align-end  justify-center  settings-wrapper  relative">
      <div className="absolute  top  left  right  pt2">
        <Metronome />
      </div>
      <div className="flex  flex-wrap  align-end  justify-center  settings">
        <div className="col-24  flex  align-center  cue-loop-wrapper">
          <div className="col-24  flex  align-center  justify-center  cue-loop">
            <Bpm />
          </div>
        </div>
        <div className="col-24  flex  align-center  cue-loop-wrapper">
          <div className="col-12  flex  align-center  justify-center  cue-loop">
            <CueLoop />
          </div>
          <div className="col-12  flex  align-center  justify-center  cue-loop">
            <LoopManager />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
