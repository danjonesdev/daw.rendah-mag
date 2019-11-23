import React from "react";
import Store from "../../../../store";

import Row from "./row";

function Modal(props) {
  const store = Store.useStore();
  const settings = store.get("settings");

  return (
    <div className="w-100  flex  flex-wrap">
      <div className="w-100  flex  flex-wrap">
        <p onClick={props.toggleModal}>x</p>
      </div>

      <div className="w-100  flex  flex-wrap">
        {settings.channels.map(channel => {
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
    </div>
  );
}

export default Modal;
