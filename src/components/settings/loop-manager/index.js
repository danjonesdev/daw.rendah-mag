import React, { useState } from "react";

import Store from "../../../store";

import Loop from "./loop";
import Modal from "../../modal";

function LoopManager(props) {
  const store = Store.useStore();
  const loops = store.get("loops");

  const [modalActive, setModalActive] = useState(false);
  const hasLooped = loops.length && loops[loops.length - 1].loopCompleted;

  const toggleModal = () => {
    setModalActive(!modalActive);
  };

  const loopManagerButton = () => {
    return (

        <div
           onClick={hasLooped ? toggleModal : null}
          className={`flex  align-center  justify-center  cue-loop__item ${
            hasLooped ? "" : "o-50"
          }`}
        >
          Loop Manager
        </div>
    );
  };

  if (hasLooped) {
    return (
      <>
        {loopManagerButton()}

        <Modal
          title="Loop Manager"
          type="secondary"
          isActive={modalActive}
          toggleModal={toggleModal}
        >
          <div className="w-100  flex  flex-wrap  pv3  ph3">
            {loops.map((loop, index) => {
              return <Loop key={index} loop={loop} loopIndex={index} />;
            })}
          </div>
        </Modal>
      </>
    );
  }

  return loopManagerButton();
}

export default LoopManager;
