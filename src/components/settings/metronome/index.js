import React, { useState } from "react";

import Store from "../../../store";

function Metronome(props) {
  const store = Store.useStore();
  const cueLoop = store.get("cueLoop");

  return (
    <div className="metronome">
      <div className="metronome__casing">
        {cueLoop.loopTime && (
          <div
            style={{
              animationDuration: `${cueLoop.loopTime}ms`
            }}
            className="metronome__progress"
          />
        )}
        <div className="metronome__seperator  metronome__seperator--1" />
        <div className="metronome__seperator  metronome__seperator--2" />
        <div className="metronome__seperator  metronome__seperator--3" />
      </div>
    </div>
  );
}

export default Metronome;
