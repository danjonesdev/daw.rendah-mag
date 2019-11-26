import React from "react";
import Store from "../../../../../store";

function Effects(props) {
  const store = Store.useStore();
  const settings = store.get("settings");
  const functions = store.get("functions");
  const { mutateObject } = functions;

  const handleChange = e => {
    e.persist();

    store.set("settings")(
      mutateObject(
        settings,
        props.effect.properties,
        e.target.name,
        e.target.value
      )
    );
  };

  const loopPorps = () => {
    var indents = [];
    const properties = props.effect.properties;

    for (let key in properties) {
      if (properties.hasOwnProperty(key)) {
        if (key !== "_unique") {
          indents.push(
            <div className="col-24  flex  flex-wrap  pv1">
              <div className="col-12">
                {key} {Math.round(properties[key])}
              </div>
              <div className="col-12">
                <input
                  onChange={handleChange}
                  name={key}
                  type="range"
                  min="0"
                  max="10"
                  value={Math.round(properties[key])}
                />
              </div>
            </div>
          );
        }
      }
    }
    return <div className="flex  flex-wrap">{indents}</div>;
  };

  return (
    <>
      <div className="col-4">{props.effect.name}</div>
      <div className="col-20">{loopPorps()}</div>
    </>
  );
}

export default Effects;
