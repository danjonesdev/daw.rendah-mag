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

  return (
    <div className="col-2  flex  align-center">
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
  );
}

export default LoopManager;
