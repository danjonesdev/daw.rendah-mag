import React, { useState } from "react";

import Loop from "./loop";

import Store from "../../../store";
import mutateObject from "../../../helpers/mutate-object";

function CueLoop(props) {
  const [isLooping, setIsLooping] = useState(false);

  const store = Store.useStore();
  const cueLoop = store.get("cueLoop");
  const loops = store.get("loops");

  const handleClick = () => {
    setIsLooping(!isLooping);
    cueLoop.isLooping = !cueLoop.isLooping;

    if (!loops.length || (loops.length && loops[loops.length - 1].endTime)) {
      return;
    }

    // if disabling loop, set loopCompleted on last object to true
    if (!cueLoop.isLooping) {
      loops[loops.length - 1].endTime = performance.now();
      loops[loops.length - 1].duration =
        loops[loops.length - 1].endTime - loops[loops.length - 1].startTime;
      loops[loops.length - 1].loopCompleted = true;
    }

    store.set("cueLoop")(cueLoop);
  };

  return (
    <div onClick={handleClick} className="col-12  pa2  settings__cue-loop">
      <p className="bg-black  white  pa2  dib  f7  shadow2   cp">
        Cue {`${cueLoop.isLooping}`}
      </p>

      {loops.length > 0 &&
        loops.map(loop => {
          return <Loop {...loop} />;
        })}
    </div>
  );
}

export default CueLoop;
