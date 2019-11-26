import React, { useState } from "react";

function Modal(props) {
  return (
    <div className={`modal  ${props.isActive ? "is-active" : ""}`}>
      <div className="modal__header">
        <span
          className="white  modal__header__close"
          onClick={props.toggleModal}
        >
          x
        </span>
        <h2 class="tac  mla  mra  pt3  white">{props.title}</h2>
      </div>
      <div className="modal__body">{props.children}</div>
    </div>
  );
}

export default Modal;
