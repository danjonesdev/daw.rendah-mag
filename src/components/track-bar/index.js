import React from 'react';
import ChannelManager from './channel-manager';
import Store from '../../store';

function SessionView() {
  const store = Store.useStore();
  const settings = store.get('settings');

  return (
    <div className="w-100  flex  align-center  justify-center  track-bar-wrapper">
    <div className="w-100  flex  align-center  justify-center  track-bar">
      {settings.categories.map((item, index) => {
        return <ChannelManager key={index} {...item} />;
      })}
    </div>
    </div>
  );
}

export default SessionView;
