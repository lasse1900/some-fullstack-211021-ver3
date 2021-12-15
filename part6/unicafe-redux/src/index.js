import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./reducer";
import "./style.css";

const store = createStore(reducer);

const App = () => {
  const good = () => {
    store.dispatch({ type: "GOOD" });
  };
  const ok = () => {
    store.dispatch({ type: "OK" });
  };
  const bad = () => {
    store.dispatch({ type: "BAD" });
  };
  const reset = () => {
    store.dispatch({ type: "ZERO" });
  };

  return (
    <>
      <div className="header">Unicafe</div>
      <div className="display-buttons">
        <button onClick={good}>good</button>
        <button onClick={ok}>ok</button>
        <button onClick={bad}>bad</button>
        <button onClick={reset}>reset</button>
      </div>
      <div className="display-counts">
        <div>good {store.getState().good}</div>
        <div>neutral {store.getState().ok}</div>
        <div>bad {store.getState().bad}</div>
      </div>
    </>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
