import reverse from "lodash/reverse";
import isEqual from "lodash/isEqual";

const mutateObject = (origin, object, property, value) => {
  const gObj = object;
  let foundObject;
  let indexMap = [];

  function findByProperty(o, findValue) {
    if (o[`${property}`] === findValue) {
      if (isEqual(gObj, o)) {
        return o;
      }
    }

    let result, p;
    for (p in o) {
      if (o.hasOwnProperty(p) && typeof o[p] === "object") {
        result = findByProperty(o[p], findValue);

        if (result) {
          indexMap.push(p);
          return result;
        }
      }
    }
    return result;
  }

  function isObejctMatch(object, keys) {
    const last = keys.pop();
    foundObject = keys.reduce((o, k) => o[k], object)[last];

    // console.log('gObj', gObj);
    // console.log('foundObject', foundObject);

    if (isEqual(gObj, foundObject)) {
      foundObject[property] = value;
      return object;
    }
  }

  // console.log("findByProperty - 1 -", origin, gObj[property]);
  findByProperty(origin, gObj[property]);

  const keys = reverse(indexMap);
  const mutatedSource = isObejctMatch(origin, keys);

  // console.log('keys', keys);
  // console.log("mutatedSource", mutatedSource);

  return mutatedSource;
};

export default mutateObject;
