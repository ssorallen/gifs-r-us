import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import GifPage from "./pages/GifPage";
import { Helmet } from "react-helmet";
import Navbar from "./Navbar";
import SearchPage from "./pages/SearchPage";
import TrendingPage from "./pages/TrendingPage";
import { Provider } from "react-redux";
import React from "react";
import store from "./store/store";

export default function App() {
  return (
    <>
      <Helmet defaultTitle="Gifs-R-Us" titleTemplate="%s &middot; Gifs-R-Us" />
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route path="/gifs/:slug">
                <GifPage />
              </Route>
              <Route path="/search">
                <SearchPage />
              </Route>
              <Route path="/">
                <TrendingPage />
              </Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    </>
  );
}
