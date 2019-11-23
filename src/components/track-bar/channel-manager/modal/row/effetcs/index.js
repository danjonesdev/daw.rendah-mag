import React from 'react';
import Store from '../../../../../../store';

function Effects(props) {
  const store = Store.useStore();
  const settings = store.get('settings');
  const functions = store.get('functions');
  const { mutateObject } = functions;

  const toggleActive = () => {
    store.set('settings')(mutateObject(settings, props.effect, 'test', 2));
  };

  return (
    <div className="col-10" onClick={toggleActive}>
      {props.effect.name} {props.effect.test}
    </div>
  );
}

export default Effects;
