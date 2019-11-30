import React, { useState } from "react";

import LoopInstance from "./loop-instance";

import Store from "../../../store";
import mutateObject from "../../../helpers/mutate-object";

function CueLoop(props) {
  const store = Store.useStore();
  const cueLoop = store.get("cueLoop");
  const loops = store.get("loops");

  const handleLoopToggle = (triggerType) => {
    const cueLoopNew = cueLoop;
    const loopsNew = loops;

    // if disabling and no loops exist, return
    if (cueLoopNew.isLooping && !loopsNew.length) return;

    // or if disabling and first loop is already
    // completed and tried to diable via click, return
    if (cueLoopNew.isLooping && loopsNew[0].loopCompleted && triggerType === 'Click') return;

    // if disabling, set loopCompleted on last object to true
    if (cueLoopNew.isLooping) {
      loopsNew[loopsNew.length - 1].loopCompleted = true;
    }

    // Toggle looping
    cueLoopNew.isLooping = !cueLoopNew.isLooping;

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
          handleLoopToggle('Recursion');
          return;
        }
      }, cueLoopNew.loopTime);
    }

    store.set("cueLoop")(cueLoopNew);
    store.set("loops")(loopsNew);
  };

  return (
    <>
        <div
          onClick={() => {handleLoopToggle('Click')}}
          className="flex  align-center  justify-center  cue-loop__item"
        >
          Cue Loop {`${cueLoop.isLooping}`}
        </div>

      {loops.length > 0 &&
        loops.map((loop, index) => {
            return <LoopInstance key={index} loop={loop} loopIndex={index} />;
        })}
    </>
  );
}

export default CueLoop;
