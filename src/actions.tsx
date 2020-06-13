import { Action, AppState, GiphyApiResponse } from "./types";
import { GIPHY_API_KEY, GIPHY_REQUEST_LIMIT } from "./GiphyApiConstants";

export function fetchGifs() {
  return async function (
    dispatch: (action: Action) => any,
    getState: () => AppState
  ) {
    const { fetch: stateFetch } = getState();
    if (stateFetch != null) {
      stateFetch.controller.abort();
      dispatch({ type: "fetch-gifs-cancelled" });
    }

    const controller = new AbortController();
    dispatch({ data: { controller }, type: "fetch-gifs-start" });

    let json: GiphyApiResponse;
    try {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}&limit=${GIPHY_REQUEST_LIMIT}`
      );
      json = await res.json();
    } catch (error) {
      dispatch({ data: { error }, type: "fetch-gifs-error" });
      return;
    }

    dispatch({ data: { response: json }, type: "fetch-gifs-success" });
  };
}
