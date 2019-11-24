import React, { useState } from "react";

import Store from '../../../store';

import mutateObject from '../../../helpers/mutate-object';

function CueLoop(props) {
  const [modalActive, setModalActive] = useState(false);

  const store = Store.useStore();
  const cueLoop = store.get('cueLoop');

  const handleClick = () => {
    cueLoop.isLooping = !cueLoop.isLooping
    store.set('cueLoop')(cueLoop);

  };

  return (
    <div onClick={handleClick} className="col-6  settings__cue-loop">
      CueLoop {`${cueLoop.isLooping}`}
    </div>
  );
}

export default CueLoop;
