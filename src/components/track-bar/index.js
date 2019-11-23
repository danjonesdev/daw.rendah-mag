import React from 'react';
import ChannelManager from './channel-manager';
import Store from '../../store';

function SessionView() {
  const store = Store.useStore();
  const settings = store.get('settings');

  return (
    <div className="w-100  flex  flex-wrap  pa1  track-bar">
      {settings.channels.map(item => {
        return <ChannelManager {...item} />;
      })}
    </div>
  );
}

export default SessionView;
