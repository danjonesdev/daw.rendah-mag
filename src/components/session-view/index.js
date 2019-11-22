import React from "react";
import Channel from "./channel";
import Store from "../../store";

function SessionView() {
  const store = Store.useStore();
  const settings = store.get("settings");

  return (
    <div className="w-100  flex  flex-wrap  session-view">
      {settings.channels.map(item => {
        return <Channel {...item} />;
      })}
    </div>
  );
}

export default SessionView;
