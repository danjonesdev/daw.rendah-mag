import React from "react";
import SamplePad from "./sample-pad";

function Channel(props) {
  return (
    <div className="col-6  session-view__channel">
      <div className="flex  flex-wrap  h-100">
        {props.samples.map(item => {
          if (item.active) {
            return <SamplePad {...item} />;
          }
        })}
      </div>
    </div>
  );
}

export default Channel;
