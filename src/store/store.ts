import { combineReducers, createStore, applyMiddleware } from "redux";
import gifReducer from "./gifReducer";
import thunk from "redux-thunk";
import trendingReducer from "./trendingReducer";

export default createStore(
  combineReducers({
    gif: gifReducer,
    trending: trendingReducer,
  }),
  applyMiddleware(thunk)
);
