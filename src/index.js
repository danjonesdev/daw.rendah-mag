import React from "react";
import ReactDOM from "react-dom";
import Store from "./store";
import Components from "./components";

import "./styles.scss";

function App() {
  return (
    <div className="App">
      <Components />
    </div>
  );
}

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Store.Container>
    <App />
  </Store.Container>,
  rootElement
);
