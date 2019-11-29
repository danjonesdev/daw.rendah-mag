import React, { useEffect } from "react";

import Store from "../store";

import SessionView from "./session-view";
import TrackBar from "./track-bar";
import Settings from "./settings";

function Components(props) {
  const store = Store.useStore();
  const settings = store.get("settings");
  const loops = store.get("loops");
  const cueLoop = store.get("cueLoop");
  const functions = store.get("functions");

  useEffect(() => {
    store.set("settings")(props.store.settings);
    store.set("loops")(props.store.loops);
    store.set("cueLoop")(props.store.cueLoop);
    store.set("functions")(props.store.functions);
  }, []);

  // const handleDebug = () => {
//   console.log("settings", settings);
//   console.log("loops", loops);
//   console.log("cueLoop", cueLoop);
//   console.log("functions", functions);
// };

  const isObject = e => {
    return typeof e === "object" && e !== null;
  };

  // const handleDebug = () => {
  //   console.log("settings", settings);
  //   console.log("loops", loops);
  //   console.log("cueLoop", cueLoop);
  //   console.log("functions", functions);
  // };

  if (
    isObject(settings) &&
    isObject(loops) &&
    isObject(cueLoop) &&
    isObject(functions)
  ) {
    console.log("render");
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
        {/*
          <p
            className="fixed  top  left  pa2  bg-black  white  z9"
            onClick={handleDebug}
          >
            Debug
          </p>
        */}
      </div>
    );
  }

  return false;
}

export default Components;
