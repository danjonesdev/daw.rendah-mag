import React from "react";
import SamplePad from "./sample-pad";

import Store from "../../store";

function SessionView() {
  const store = Store.useStore();
  const settings = store.get("settings");

  if (settings.categories) {
    return (
      <div className="w-100  flex  align-center  justify-center  session-view-wrapper">
        <div className="w-100  flex  align-center  justify-center  session-view">
          {settings.categories.map((category, categoryIndex) => {
            return (
              <div
                key={categoryIndex}
                className="col-4  flex  flex-wrap  content-start  h-100"
              >
                {category.samples.map((sample, sampleIndex) => {
                  if (sample.active) {
                    return (
                      <SamplePad
                        category={category}
                        key={`${categoryIndex}-${sampleIndex}`}
                        {...sample}
                      />
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return false;
}

export default SessionView;
