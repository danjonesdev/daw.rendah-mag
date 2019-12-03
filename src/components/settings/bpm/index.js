import React, { useState } from "react";

import Store from "../../../store";

function Bpm(props) {
  const store = Store.useStore();
  const cueLoop = store.get("cueLoop");

  return (
    <p className="tac  mla  mra  f5  bold">
      <span className="pa2">daw.rendahmag:</span>
      <span className="bg-black  white  f6  pa2">
        {cueLoop.bpm || "---"}/bpm
      </span>
    </p>
  );
}

export default Bpm;
