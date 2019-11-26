import React, { useState } from "react";

function Modal(props) {
  return (
    <div
      className={`modal  ${props.type} ${props.isActive ? "is-active" : ""}`}
    >
      <div className="modal__header">
        <span
          className="black  modal__header__close"
          onClick={props.toggleModal}
        >
          x
        </span>
        <h2 class="tac  mla  mra  pt3  black">{props.title}</h2>
      </div>
      <div className="modal__body">{props.children}</div>
    </div>
  );
}

export default Modal;
