import React from "react";
import SessionView from "./session-view";
import TrackBar from "./track-bar";

function Components() {
  return (
    <div className="flex">
      <div className="col-18">
        <div className="flex">
          <SessionView />
        </div>
        <div className="flex">
          <TrackBar />
        </div>
      </div>
      <div className="col-6">Settings go here.</div>
    </div>
  );
}

export default Components;
