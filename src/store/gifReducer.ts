import { Action, GifState } from "../types";

const initialState: GifState = {
  fetch: null,
  gif: null,
};

export default function gifReducer(state = initialState, action: Action) {
  switch (action.type) {
    case "fetch-gif-cancelled":
      return {
        ...state,
        fetch: null,
      };
    case "fetch-gif-error":
      return {
        ...state,
        fetch: null,
      };
    case "fetch-gif-start":
      return {
        ...state,
        gif: null,
        fetch: {
          ...action.data,
        },
      };
    case "fetch-gif-success":
      return {
        ...state,
        fetch: null,
        gif: action.data.response.data,
      };
    default:
      return state;
  }
}
