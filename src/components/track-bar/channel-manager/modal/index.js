import React from "react";
import Store from "../../../../store";

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
            <div>
              {channel.samples.map(sample => {
                if (channel.name === props.name) {
                  return (
                    <div class="col-24  track-manager-modal__row">
                      {sample.name}
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Modal;
