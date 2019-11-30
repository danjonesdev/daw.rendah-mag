import React from "react";

import CueLoop from "./cue-loop";
import LoopManager from "./loop-manager";

function Settings() {
  return (
    <div className="flex  align-center  justify-center  settings-wrapper">
      <div className="flex  align-end  justify-center  settings">
        <div className="w-100  flex  align-center  cue-loop-wrapper">
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
