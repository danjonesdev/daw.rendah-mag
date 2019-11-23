import React from 'react';
import Store from '../../../../../store';

import Effects from './effetcs';

import mutateObject from '../../../../../helpers/mutate-object';

function Row(props) {
  const store = Store.useStore();

  const toggleActive = () => {
    store.set('settings')(
      mutateObject(
        store.get('settings'),
        props.sample,
        'active',
        !props.sample.active
      )
    );
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
      <div className="col-10  flex  flex-wrap">
        {props.sample.effects && props.sample.effects.map(effect => {
          return <Effects channel={props.channel} sample={props.sample} effect={effect} />;
        })}
      </div>
    </div>
  );
}

export default Row;
