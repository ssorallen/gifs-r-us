import { Action, TrendingState } from "../types";

const initialState: TrendingState = {
  fetch: null,
  gifs: [],
  offsetBottom: 0,
  offsetTop: 0,
};

export default function trendingReducer(state = initialState, action: Action) {
  switch (action.type) {
    case "fetch-trending-cancelled":
      return {
        ...state,
        fetch: null,
      };
    case "fetch-trending-error":
      return {
        ...state,
        fetch: null,
      };
    case "fetch-trending-start":
      return {
        ...state,
        fetch: {
          ...action.data,
        },
      };
    case "fetch-trending-success": {
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
        offsetBottom:
          state.offsetBottom + action.data.response.pagination.count,
      };
    }
    default:
      return state;
  }
}
