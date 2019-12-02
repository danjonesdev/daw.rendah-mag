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
        className={`flex  align-center  justify-center  loop-manager__item ${
          hasLooped ? "" : "is-disabled"
        }`}
      >
        <span className="loop-manager__item__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#FFFFFF"
          >
            <path d="M4 22h-4v-4h4v4zm0-12h-4v4h4v-4zm0-8h-4v4h4v-4zm3 0v4h17v-4h-17zm0 12h17v-4h-17v4zm0 8h17v-4h-17v4z" />
          </svg>
        </span>

        <span className="loop-manager__item__text">Loops</span>
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
