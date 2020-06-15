import { combineReducers, createStore, applyMiddleware } from "redux";
import gifReducer from "./gifReducer";
import searchReducer from "./searchReducer";
import thunk from "redux-thunk";
import trendingReducer from "./trendingReducer";

export default createStore(
  combineReducers({
    gif: gifReducer,
    search: searchReducer,
    trending: trendingReducer,
  }),
  applyMiddleware(thunk)
);
