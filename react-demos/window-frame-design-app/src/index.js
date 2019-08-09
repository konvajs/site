import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import createStore from "./store";
import App from "./components/App";

window.store = createStore();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={window.store}>
    <App />
  </Provider>,
  rootElement
);
