import { Action, AppState } from "./types";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialState: AppState = {
  fetch: null,
  gifs: [],
};

function rootReducer(state = initialState, action: Action) {
  switch (action.type) {
    case "fetch-gifs-cancelled":
      return {
        ...state,
        fetch: null,
      };
    case "fetch-gifs-error":
      return {
        ...state,
        fetch: null,
      };
    case "fetch-gifs-start":
      return {
        ...state,
        fetch: {
          ...action.data,
        },
      };
    case "fetch-gifs-success": {
      // Use the `gifs` array as a sparse array so the offset can match the offset on the server
      // without taking up actual memory in the client.
      const nextGifs = state.gifs.slice();
      const offset = action.data.response.pagination.offset;
      action.data.response.data.forEach((gif, index) => {
        nextGifs[offset + index] = gif;
      });

      return {
        ...state,
        fetch: null,
        gifs: nextGifs,
      };
    }
    default:
      return state;
  }
}

export default createStore(rootReducer, applyMiddleware(thunk));
