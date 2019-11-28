import React, { useState } from "react";

import Loop from "./loop";
import Modal from "../../../modal";

function LoopManager(props) {
  const [loops] = useState(props.loops);
  const [modalActive, setModalActive] = useState(false);
  const hasLooped = loops.length && loops[loops.length - 1].loopCompleted;

  const toggleModal = () => {
    setModalActive(!modalActive);
  };

  const loopManagerButton = () => {
    return (
      <div
        className="flex  flex-wrap  align-center  justify-center"
        onClick={hasLooped ? toggleModal : null}
      >
        <p
          className={`bg-black  white  pa2  w-100  f7  shadow2   cp ${
            hasLooped ? "" : "o-50"
          }`}
        >
          Loop Manager
        </p>
      </div>
    );
  };

  if (hasLooped) {
    return (
      <div className="col-24">
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
      </div>
    );
  }

  return loopManagerButton();
}

export default LoopManager;
