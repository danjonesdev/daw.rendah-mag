import React, { useState } from "react";

import Store from "../../../../../store";

import mutateObject from "../../../../../helpers/mutate-object";

function LoopManager(props) {
  const [loop] = useState(props.loop);

  const store = Store.useStore();

  const toggleActive = () => {
    store.set("loops")(
      mutateObject(store.get("loops"), loop, "active", !loop.active)
    );
  };

  console.log("loop instance", loop);

  return (
    <div className="pv2  w-100  flex  align-center">
      <div className="col-4">
        <p>Loop {props.loopIndex + 1}</p>
      </div>
      <div className="col-20">
        <label className="switch" htmlFor={`${loop.startTime}-toggle`}>
          <input
            type="checkbox"
            id={`${loop.startTime}-toggle`}
            checked={loop.active}
            name={`${loop.startTime}-toggle`}
            onChange={toggleActive}
          />
          <div className="slider round"></div>
        </label>
      </div>
    </div>
  );
}

export default LoopManager;