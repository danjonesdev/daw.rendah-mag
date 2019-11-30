import React, { useState } from "react";
import Store from "../../../../store";

import Effects from "./effetcs";

import mutateObject from "../../../../helpers/mutate-object";

function Row(props) {



  const store = Store.useStore();

  const toggleActive = () => {
    store.set("settings")(
      mutateObject(
        store.get("settings"),
        props.sample,
        "active",
        !props.sample.active
      )
    );
  };

  return (
    <div className="col-24  flex  flex-wrap  track-bar__item__modal__row">
      <div className="col-2  flex  align-center">
        <label className="switch" htmlFor={`${props.sample.name}-toggle`}>
          <input
            type="checkbox"
            id={`${props.sample.name}-toggle`}
            checked={props.sample.active}
            name={`${props.sample.name}-toggle`}
            onChange={toggleActive}
          />
          <div className="slider round"></div>
        </label>
      </div>
      <div className="col-10  flex  align-center">
        <p className="black  pl2">{props.sample.name}</p>
      </div>
      <div className="col-10  flex  flex-wrap">
        {props.sample.effects &&
          props.sample.effects.map((effect, index) => {
            return (
                <Effects
                  channel={props.channel}
                  sample={props.sample}
                  effect={effect}
                />
            );
          })}
      </div>
    </div>
  );
}

export default Row;
