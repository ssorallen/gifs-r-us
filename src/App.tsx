import "./App.css";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import GifPage from "./pages/GifPage";
import TrendingPage from "./pages/TrendingPage";
import { Provider } from "react-redux";
import React from "react";
import store from "./store/store";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <nav className="navbar">
          <Link className="navbar-brand" to="/">
            Gifs-R-Us
          </Link>
        </nav>
        <div className="app">
          <Switch>
            <Route path="/gifs/:id">
              <GifPage />
            </Route>
            <Route path="/">
              <TrendingPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}
