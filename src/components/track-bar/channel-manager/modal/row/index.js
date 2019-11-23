import React from "react";
import reverse from "lodash/reverse";
import isEqual from "lodash/isEqual";

import Store from "../../../../../store";

function Row(props) {
  const store = Store.useStore();
  let settings;

  const mutateObject = (object, property, value) => {
    settings = store.get("settings");
    const gObj = object;

    function findByName(o, findValue) {
      if (o[`${property}`] === findValue) {
        if (isEqual(gObj, o)) {
          return o;
        }
      }

      var result, p;
      for (p in o) {
        if (o.hasOwnProperty(p) && typeof o[p] === "object") {
          result = findByName(o[p], findValue);
          if (result) {
            indexMap.push(p);
            return result;
          }
        }
      }
      return result;
    }

    function deleteKey(object, keys) {
      var last = keys.pop();
      matchedObject = keys.reduce((o, k) => o[k], object)[last];
      if (isEqual(gObj, matchedObject)) {
        matchedObject[property] = value;
        return object;
      }
    }

    let matchedObject;
    let indexMap = [];
    findByName(settings, gObj[property]);
    const keys = reverse(indexMap);
    const mutatedStore = deleteKey(settings, keys);
    store.set("settings")(mutatedStore);
  };

  const toggleActive = () => {
    mutateObject(props.channel, "name", !props.sample.active);
  };

  return (
    <div class="col-24  flex  flex-wrap  pa2  track-bar__item__modal__row">
      <div className="col-10">{props.sample.name}</div>
      <div className="col-4">
        <input
          type="checkbox"
          checked={props.sample.active}
          name={`${props.sample.name}-toggle`}
          onChange={toggleActive}
        />
      </div>
      <div className="col-10">{props.sample.name}</div>
    </div>
  );
}

export default Row;
