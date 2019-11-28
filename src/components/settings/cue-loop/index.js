import React, { useState } from "react";

import LoopInstance from "./loop-instance";
import Loopmanager from "./loop-manager";

import Store from "../../../store";
import mutateObject from "../../../helpers/mutate-object";

function CueLoop(props) {
  const [isLooping, setIsLooping] = useState(false);

  const store = Store.useStore();
  const cueLoop = store.get("cueLoop");
  const loops = store.get("loops");

  const handleClick = () => {
    const cueLoopNew = cueLoop;
    const loopsNew = loops;

    // Toggle looping
    setIsLooping(!isLooping);
    cueLoopNew.isLooping = !cueLoopNew.isLooping;

    if (!loopsNew.length) return;

    // if disabling loop, set loopCompleted on last object to true
    if (!cueLoopNew.isLooping) {
      loopsNew[loopsNew.length - 1].loopCompleted = true;
    }

    // If first loop, set master loop time
    if (loopsNew.length === 1 && !cueLoopNew.isLooping) {
      cueLoopNew.loopTime = performance.now() - loopsNew[0].startTime;
      setInterval(() => {
        // Log restart of loop
        cueLoopNew.loopRestarted = performance.now();

        // If loop is still active + last one hasn't been loopCompleted
        // then automatically close loop.
        if (
          cueLoopNew.isLooping &&
          !loopsNew[loopsNew.length - 1].loopCompleted
        ) {
          handleClick();
        }
      }, cueLoopNew.loopTime);
    }

    store.set("cueLoop")(cueLoopNew);
    store.set("loops")(loopsNew);
  };

  return (
    <div onClick={handleClick} className="col-12  pa2  settings__cue-loop">
      <p className="bg-black  white  pa2  dib  f7  shadow2   cp">
        Cue {`${cueLoop.isLooping}`}
      </p>
      {loops.length > 0 &&
        loops.map((loop, index) => {
          if (loop.loopCompleted) {
            return <LoopInstance key={index} {...loop} loopIndex={index} />;
          }
        })}
      {loops.length > 0 && loops[loops.length - 1].loopCompleted && (
        <Loopmanager loops={loops} />
      )}
    </div>
  );
}

export default CueLoop;
