import React, { useState } from "react";

import LoopInstance from "./loop-instance";

import Store from "../../../store";
import mutateObject from "../../../helpers/mutate-object";

function CueLoop(props) {
  const store = Store.useStore();
  const cueLoop = store.get("cueLoop");
  const loops = store.get("loops");

  const handleLoopToggle = triggerType => {
    const cueLoopNew = cueLoop;
    const loopsNew = loops;

    // If disabling and no loops exist
    if (cueLoopNew.isLooping && !loopsNew.length) {
      // Cancel looping
      cueLoopNew.isLooping = !cueLoopNew.isLooping;
      store.set("cueLoop")(cueLoopNew);
      return;
    }

    // Or if disabling and first loop is already
    // completed and tried to diable via click, return
    if (
      cueLoopNew.isLooping &&
      loopsNew[0].loopCompleted &&
      triggerType === "Click"
    )
      return;

    // If disabling, set loopCompleted on last object to true
    if (cueLoopNew.isLooping) {
      loopsNew[loopsNew.length - 1].loopCompleted = true;
    }

    // Toggle looping
    cueLoopNew.isLooping = !cueLoopNew.isLooping;

    // If first loop
    if (loopsNew.length === 1 && !cueLoopNew.isLooping) {
      // Set master loop
      cueLoopNew.loopTime = performance.now() - loopsNew[0].startTime;

      // Set BPM
      const quarterNote = cueLoopNew.loopTime / 4;
      const bpmRound = Math.round(60000 / quarterNote);
      let bpm = null;
      if (bpmRound < 100) bpm = bpmRound * 2;
      if (bpmRound > 200) bpm = bpmRound / 2;
      cueLoopNew.bpm = bpm;

      setInterval(() => {
        // Log restart of loop
        cueLoopNew.loopRestarted = performance.now();

        // If loop is still active + last one hasn't been loopCompleted
        // then automatically close loop.
        if (
          cueLoopNew.isLooping &&
          !loopsNew[loopsNew.length - 1].loopCompleted
        ) {
          handleLoopToggle("Recursion");
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
        onClick={() => {
          handleLoopToggle("Click");
        }}
        className={`flex  flex-wrap  align-center  justify-center  cue-loop__item  ${
          cueLoop.isLooping ? "cue-loop__item--looping" : ""
        }`}
      >
        <div>
          <span className="cue-loop__item__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#FFFFFF"
            >
              <path d="M18 13v5h-5l1.607-1.608c-3.404-2.824-5.642-8.392-9.179-8.392-2.113 0-3.479 1.578-3.479 4s1.365 4 3.479 4c1.664 0 2.86-1.068 4.015-2.392l1.244 1.561c-1.499 1.531-3.05 2.831-5.259 2.831-3.197 0-5.428-2.455-5.428-6s2.231-6 5.428-6c4.839 0 7.34 6.449 10.591 8.981l1.981-1.981zm.57-7c-2.211 0-3.762 1.301-5.261 2.833l1.244 1.561c1.156-1.325 2.352-2.394 4.017-2.394 2.114 0 3.48 1.578 3.48 4 0 1.819-.771 3.162-2.051 3.718v2.099c2.412-.623 4-2.829 4-5.816.001-3.546-2.231-6.001-5.429-6.001z" />
            </svg>
          </span>

          {cueLoop.isLooping && !cueLoop.loopTime && (
            <span className="cue-loop__item__recording  cue-loop__item__recording--circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#000000"
              >
                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 6c-3.313 0-6 2.687-6 6s2.687 6 6 6c3.314 0 6-2.687 6-6s-2.686-6-6-6z" />
              </svg>
            </span>
          )}

          {cueLoop.isLooping && cueLoop.loopTime && (
            <span className="cue-loop__item__recording  cue-loop__item__recording--lock">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#000000"
              >
                <path d="M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10 0v-4c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-8z" />
              </svg>
            </span>
          )}

          <span className="cue-loop__item__text">Cue Loop</span>
        </div>
      </div>

      {loops.length > 0 &&
        loops.map((loop, index) => {
          return <LoopInstance key={index} loop={loop} loopIndex={index} />;
        })}
    </>
  );
}

export default CueLoop;
