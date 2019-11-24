import React, { useState } from "react";

import Modal from "./modal";

function ChannelManager(props) {
  const [modalActive, setModalActive] = useState(false);

  const toggleModal = () => {
    setModalActive(!modalActive);
  };

  return (
    <div className="col-6  track-bar__item">
      <div
        className="flex  flex-wrap  align-center  justify-center  track-bar__item__modal-trigger"
        onClick={toggleModal}
      >
        {props.name}
      </div>

      <div
        className={`track-bar__item__modal  ${modalActive ? "is-active" : ""}`}
      >
        <Modal {...props} toggleModal={toggleModal} />
      </div>
    </div>
  );
}

export default ChannelManager;
