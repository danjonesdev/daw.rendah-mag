import React from "react";

import CueLoop from "./cue-loop";

function Settings() {
  return (
    <div className="w-100  flex  align-center  justify-center  cue-loop-wrapper">
      <div className="w-100  flex  align-center  justify-center  cue-loop">
        <CueLoop />
      </div>
    </div>
  );
}

export default Settings;
