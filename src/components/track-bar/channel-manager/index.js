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
    <div className="col-6  flex  align-center  justify-center  h-100">
        <div
          className="flex  flex-wrap  align-center  justify-center  track-bar__item"
          onClick={toggleModal}
        >
          <span className="track-bar__item__text">{props.name}</span>
        </div>

      <Modal
        title="Channel Manager"
        type="primary"
        isActive={modalActive}
        toggleModal={toggleModal}
      >
        <div className="w-100  flex  flex-wrap  pv3  ph3">
          {settings.categories.map((channel, index) => {
            return (
              <div className="w-100" key={index}>
                {channel.samples.map((sample, index2) => {
                  if (channel.name === props.name) {
                    return (
                      <Row
                        key={`${index}-${index2}`}
                        channel={channel}
                        sample={sample}
                      />
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}

export default ChannelManager;
