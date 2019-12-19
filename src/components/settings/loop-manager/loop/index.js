import React, { useState } from "react";

import Store from "../../../../store";

import mutateObject from "../../../../helpers/mutate-object";

function LoopManager(props) {
  const [loop] = useState(props.loop);

  const store = Store.useStore();

  const toggleActive = () => {
    store.set("loops")(
      mutateObject(store.get("loops"), loop, "active", !loop.active)
    );
  };

  const renderLoopSampleNames = () => {
    const samples = [];

    for (let i = 0; i < loop.samples.length; i++) {
      const sample = loop.samples[i];
      const seperator = i + 1 === loop.samples.length ? "" : ", ";
      samples.push(sample.name + seperator);
    }

    return samples;
  };

  return (
    <div className="col-24  flex  flex-wrap  track-bar__item__modal__row">
      <div className="col-16  flex  align-center">
        <p>
          <span className="t-primary  f6  bold  pl2">
            Loop #{props.loopIndex + 1}
          </span>
          <span className="t-primary  f7  pl2">
            ({renderLoopSampleNames()})
          </span>
        </p>
      </div>

      <div className="col-8  flex  align-center  justify-end">
        <span className="t-primary  f7  pr3">Active:</span>
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
