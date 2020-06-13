import "./App.css";
import Main from "./Main";
import { Provider } from "react-redux";
import React from "react";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Main />
      </div>
    </Provider>
  );
}

export default App;
