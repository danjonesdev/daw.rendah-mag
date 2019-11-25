import React, { useState } from "react";

import Store from '../../../store';

import mutateObject from '../../../helpers/mutate-object';

function CueLoop(props) {
  const [isLooping, setIsLooping] = useState(false);
  const [isLoopTimeDetermined, setIsLoopTimeDetermined] = useState(false);

  const store = Store.useStore();
  const cueLoop = store.get('cueLoop');
  const loops = store.get('loops');

  const handleClick = () => {
    setIsLooping(!isLooping);
    cueLoop.isLooping = !cueLoop.isLooping

    // if disabling loop, set loopCompleted on last object to true
    if (!cueLoop.isLooping) {
      console.log('loops[loops.length - 1]', loops[loops.length - 1]);
      loops[loops.length - 1].endTime =  performance.now();
      loops[loops.length - 1].duration =  (loops[loops.length - 1].endTime - loops[loops.length - 1].startTime);
      loops[loops.length - 1].loopCompleted = true;
    }


    // // if looping and no loop time
    // // if (!cueLoop.isLooping  && !isLoopTimeDetermined) {
    // if (!cueLoop.isLooping) {
    //   cueLoop.loopTime = (performance.now() - cueLoop.loopTime);
    //   setIsLoopTimeDetermined(true)
    // }

    store.set('cueLoop')(cueLoop);
    // console.log('cueLoop', cueLoop);

  };

  return (
    <div onClick={handleClick} className="col-6  settings__cue-loop">
      CueLoop {`${cueLoop.isLooping}`}
    </div>
  );
}

export default CueLoop;
