import React, { useState } from "react";

import Modal from "./modal";

function ChannelManager(props) {
  const [modalActive, setModalActive] = useState(false);

  const toggleModal = () => {
    setModalActive(!modalActive);
  };

  return (
    <div className="col-6  channel-manager-wrapper">
      <div
        className="flex  flex-wrap  channel-manager-trigger"
        onClick={toggleModal}
      >
        {props.name}
      </div>

      <div className={`track-manager-modal  ${modalActive ? "is-active" : ""}`}>
        <Modal {...props} toggleModal={toggleModal} />
      </div>
    </div>
  );
}

export default ChannelManager;
