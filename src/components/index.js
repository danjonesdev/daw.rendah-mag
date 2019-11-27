import React, { useEffect } from "react";

import Store from "../store";

import SessionView from "./session-view";
import TrackBar from "./track-bar";
import Settings from "./settings";

function Components(props) {
  const store = Store.useStore();

  useEffect(() => {
    console.log("props.settings", props.settings);
    // const settings = props.settings;
    // store.set("settings")(settings);
  }, []);

  return (
    <div className="flex">
      <div className="col-18  session__track-bar">
        <div className="flex">
          <SessionView />
        </div>
        <div className="flex">
          <TrackBar />
        </div>
      </div>
      <div className="col-6">
        <Settings />
      </div>
    </div>
  );
}

export default Components;
