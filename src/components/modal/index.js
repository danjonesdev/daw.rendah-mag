import React, { useState } from "react";

function Modal(props) {
  return (
    <div
      className={`modal-wrapper  ${props.type} ${
        props.isActive ? "is-active" : ""
      }`}
    >
      <div
        className={`modal  ${props.type} ${props.isActive ? "is-active" : ""}`}
      >
        <div className="modal__header">
          <span
            className="cp  pa2  modal__header__close"
            onClick={props.toggleModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
            </svg>
          </span>
          <h2 className="f5  tac  bold  black  mla  mra">{props.title}</h2>
        </div>
        <div className="modal__body  pv3">{props.children}</div>
      </div>
    </div>
  );
}

export default Modal;
