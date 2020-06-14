import {
  Dispatch,
  GetState,
  GiphyApiGifResponse,
  GiphyApiTrendingResponse,
} from "../types";
import { GIPHY_API_KEY, GIPHY_REQUEST_LIMIT } from "../GiphyApiConstants";

export function cancelFetchTrending() {
  return (dispatch: Dispatch, getState: GetState) => {
    const { fetch: stateFetch } = getState().trending;
    if (stateFetch != null) {
      stateFetch.controller.abort();
      dispatch({ type: "fetch-trending-cancelled" });
    }
  };
}

export function fetchTrending({ offset }: { offset: number }) {
  return async function (dispatch: Dispatch, getState: GetState) {
    const { fetch: stateFetch } = getState().trending;
    if (stateFetch != null) {
      console.log("[trending] Fetch already pending. Ignoring fetch action.");
      return;
    }

    const controller = new AbortController();
    dispatch({ data: { controller }, type: "fetch-trending-start" });

    console.log(
      `[trending] Fetching with offset:${offset}, limit:${GIPHY_REQUEST_LIMIT} `
    );

    let json: GiphyApiTrendingResponse;
    try {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}&limit=${GIPHY_REQUEST_LIMIT}&offset=${offset}`
      );
      json = await res.json();
    } catch (error) {
      dispatch({ data: { error }, type: "fetch-trending-error" });
      return;
    }

    dispatch({ data: { response: json }, type: "fetch-trending-success" });
  };
}

export function cancelFetchGif() {
  return (dispatch: Dispatch, getState: GetState) => {
    const { fetch: stateFetch } = getState().gif;
    if (stateFetch != null) {
      stateFetch.controller.abort();
      dispatch({ type: "fetch-gif-cancelled" });
    }
  };
}

export function fetchGif(id: string) {
  return async function (dispatch: Dispatch) {
    cancelFetchGif();

    const controller = new AbortController();
    dispatch({ data: { controller }, type: "fetch-gif-start" });

    let json: GiphyApiGifResponse;
    try {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/${id}?api_key=${GIPHY_API_KEY}`
      );
      json = await res.json();
    } catch (error) {
      dispatch({ data: { error }, type: "fetch-gif-error" });
      return;
    }

    dispatch({ data: { response: json }, type: "fetch-gif-success" });
  };
}
