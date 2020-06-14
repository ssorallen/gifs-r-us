export type Gif = {
  bitly_url: string;
  create_datetime?: string;
  id: string;
  images: {
    downsized: { height: string; size: string; url: string; width: string };
    fixed_height: { url: string };
    fixed_height_downsampled: { url: string };
    fixed_height_still: { url: string };
    fixed_width: { height: string; url: string; width: string };
  };
  import_datetime: string;
  rating: string;
  title: string;
  type: "gif";
  url: string;
  username: string | null;
};

type GiphyApiMetadata = {
  msg: string;
  response_id: string;
  status: number;
};

export type GiphyApiGifResponse = {
  data: Gif;
  metadata: GiphyApiMetadata;
};

export type GiphyApiTrendingResponse = {
  data: Array<Gif>;
  metadata: GiphyApiMetadata;
  pagination: {
    count: number;
    offset: number;
    total_count: number;
  };
};

type FetchGifCanceledAction = {
  type: "fetch-gif-cancelled";
};

type FetchGifErrorAction = {
  data: {
    error: Error;
  };
  type: "fetch-gif-error";
};

type FetchGifStartAction = {
  data: {
    controller: AbortController;
  };
  type: "fetch-gif-start";
};

type FetchGifSucessAction = {
  data: {
    response: GiphyApiGifResponse;
  };
  type: "fetch-gif-success";
};

type FetchTrendingCanceledAction = {
  type: "fetch-trending-cancelled";
};

type FetchTrendingErrorAction = {
  data: {
    error: Error;
  };
  type: "fetch-trending-error";
};

type FetchTrendingStartAction = {
  data: {
    controller: AbortController;
  };
  type: "fetch-trending-start";
};

type FetchTrendingSucessAction = {
  data: {
    response: GiphyApiTrendingResponse;
  };
  type: "fetch-trending-success";
};

export type Action =
  | FetchGifCanceledAction
  | FetchGifErrorAction
  | FetchGifStartAction
  | FetchGifSucessAction
  | FetchTrendingCanceledAction
  | FetchTrendingErrorAction
  | FetchTrendingStartAction
  | FetchTrendingSucessAction;

export type Dispatch = (action: Action) => void;

export type GifState = {
  fetch: { controller: AbortController } | null;
  gif: Gif | null;
};

export type TrendingState = {
  fetch: { controller: AbortController } | null;
  gifs: Array<Gif>;
  offsetBottom: number;
  offsetTop: number;
};

export type AppState = {
  gif: GifState;
  trending: TrendingState;
};

export type GetState = () => AppState;
