import React from "react";
import Channel from "./channel";
import Store from "../../store";

function SessionView() {
  const store = Store.useStore();
  const settings = store.get("settings");

  if (settings.categories) {
    return (
      <div className="w-100  flex  flex-wrap  session-view">
        {settings.categories.map((item, index) => {
          return <Channel key={index} {...item} />
        })}
      </div>
    );
  }

  return false;
}

export default SessionView;
