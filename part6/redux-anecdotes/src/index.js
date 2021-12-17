import ReactDOM from "react-dom";
import { createStore } from "redux";
import App from "./App";
import reducer from "./reducers/anecdoteReducer";
import { Provider } from "react-redux";

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
