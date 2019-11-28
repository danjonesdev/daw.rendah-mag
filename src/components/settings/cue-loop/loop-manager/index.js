import React, { useState } from "react";

import Loop from "./loop";
import Modal from "../../../modal";

function LoopManager(props) {
  const [loops] = useState(props.loops);
  const [modalActive, setModalActive] = useState(false);

  const toggleModal = () => {
    setModalActive(!modalActive);
  };

  if (loops.length) {
    return (
      <div className="col-24">
        <div
          className="flex  flex-wrap  align-center  justify-center  track-bar__item__modal-trigger"
          onClick={toggleModal}
        >
          open loop manager
        </div>
        <div className="flex  flex-wrap  align-center  justify-center  h-100">
          <Modal
            title="Loop Manager"
            type="primary"
            isActive={modalActive}
            toggleModal={toggleModal}
          >
            <div className="w-100  flex  flex-wrap  pv3  ph3">
              {loops.map((loop, index) => {
                console.log("loop", loop);
                return <Loop loop={loop} />;
              })}
            </div>
          </Modal>
        </div>
      </div>
    );
  }
  return false;
}

export default LoopManager;
