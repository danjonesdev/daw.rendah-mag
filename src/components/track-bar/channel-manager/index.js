import React, { useState } from "react";
import Store from "../../../store";

import Modal from "../../modal";
import Row from "./row";

function ChannelManager(props) {
  const store = Store.useStore();
  const settings = store.get("settings");
  const [modalActive, setModalActive] = useState(false);

  const toggleModal = () => {
    setModalActive(!modalActive);
  };

  return (
    <div className="col-6  track-bar__item">
      <div className="track-bar__item__modal-trigger-wrapper">
        <div
          className="flex  flex-wrap  align-center  justify-center  track-bar__item__modal-trigger"
          onClick={toggleModal}
        >
          {props.name}
        </div>
      </div>

      <Modal
        title="Channel Manager"
        type="primary"
        isActive={modalActive}
        toggleModal={toggleModal}
      >
        <div className="w-100  flex  flex-wrap  pv3  ph3">
          {settings.categories.map(channel => {
            return (
              <>
                {channel.samples.map(sample => {
                  if (channel.name === props.name) {
                    return <Row channel={channel} sample={sample} />;
                  }
                })}
              </>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}

export default ChannelManager;
