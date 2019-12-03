import React, { useState } from "react";
import Store from "../../../../../store";

import Modal from "../../../../modal";

function Effects(props) {
  const [modalActive, setModalActive] = useState(false);
  const store = Store.useStore();
  const settings = store.get("settings");
  const functions = store.get("functions");
  const { mutateObject } = functions;

  const toggleModal = () => {
    setModalActive(!modalActive);
  };

  const handleChange = (e, i) => {
    e.persist();

    store.set("settings")(
      mutateObject(
        settings,
        props.effect.properties[i],
        "val",
        e.target.value / 10
      )
    );
  };

  const loopPorps = () => {
    var indents = [];
    const effect = props.effect;
    const properties = effect.properties;

    for (let i = 0; i < properties.length; i++) {
      const property = properties[i];

      if (property.canModify) {
        indents.push(
          <div className="col-24  flex  flex-wrap  pv1">
            <div className="col-12">{property.name}</div>
            <div className="col-12">
              <input
                onChange={e => {
                  handleChange(e, i);
                }}
                name={property.name}
                type="range"
                min={property.minVal * 10}
                max={property.maxVal * 10}
                value={property.val * 10}
              />
            </div>
          </div>
        );
      }
    }

    // for (let key in properties) {
    // if (properties.hasOwnProperty(key)) {
    //   if (key !== "_unique") {
    //     indents.push(
    //       <div key={key} className="col-24  flex  flex-wrap  pv1">
    //         <div className="col-12">
    //           {key} {Math.round(properties[key])}
    //         </div>
    //         <div className="col-12">
    //           <input
    //             onChange={handleChange}
    //             name={key}
    //             type="range"
    //             min="0"
    //             max="10"
    //             value={Math.round(properties[key])}
    //           />
    //         </div>
    //       </div>
    //     );
    //   }
    // }
    // }
    return <div className="flex  flex-wrap">{indents}</div>;
  };

  return (
    <>
      <div
        className="bg-black  white  f7  bold  shadow1  cp  mr2  pa2  dib"
        onClick={toggleModal}
      >
        {props.effect.name}
      </div>
      <Modal
        title={props.effect.name}
        type="secondary"
        isActive={modalActive}
        toggleModal={toggleModal}
      >
        <div className="col-20">{loopPorps()}</div>
      </Modal>
    </>
  );
}

export default Effects;
