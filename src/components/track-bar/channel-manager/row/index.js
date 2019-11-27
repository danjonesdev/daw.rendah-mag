import React, { useState } from "react";
import Store from "../../../../store";

import Modal from "../../../modal";
import Effects from "./effetcs";

import mutateObject from "../../../../helpers/mutate-object";

function Row(props) {
  const [modalActive, setModalActive] = useState(false);

  const toggleModal = () => {
    setModalActive(!modalActive);
  };

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
    <div class="col-24  flex  flex-wrap  track-bar__item__modal__row">
      <div className="col-2  flex  align-center">
        <label class="switch" for={`${props.sample.name}-toggle`}>
          <input
            type="checkbox"
            id={`${props.sample.name}-toggle`}
            checked={props.sample.active}
            name={`${props.sample.name}-toggle`}
            onChange={toggleActive}
          />
          <div class="slider round"></div>
        </label>
      </div>
      <div className="col-10  flex  align-center">
        <p className="black  pl2">{props.sample.name}</p>
      </div>
      <div className="col-10  flex  flex-wrap">
        <p
          className="bg-black  white  pa2  dib  f7  shadow2   cp"
          onClick={toggleModal}
        >
          Effects
        </p>
        {props.sample.effects &&
          props.sample.effects.map(effect => {
            return (
              <Modal
                title={`${props.sample.name} Effects`}
                type="secondary"
                isActive={modalActive}
                toggleModal={toggleModal}
              >
                <Effects
                  channel={props.channel}
                  sample={props.sample}
                  effect={effect}
                />
              </Modal>
            );
          })}
      </div>
    </div>
  );
}

export default Row;
