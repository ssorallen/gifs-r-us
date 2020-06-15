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
  slug: string;
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

type GiphyApiPagination = {
  count: number;
  offset: number;
  total_count: number;
};

export type GiphyApiGifResponse = {
  data: Gif;
  meta: GiphyApiMetadata;
};

export type GiphyApiSearchResponse = {
  data: Array<Gif>;
  meta: GiphyApiMetadata;
  pagination: GiphyApiPagination;
};

export type GiphyApiTrendingResponse = {
  data: Array<Gif>;
  meta: GiphyApiMetadata;
  pagination: GiphyApiPagination;
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

type FetchGifSuccessAction = {
  data: {
    response: GiphyApiGifResponse;
  };
  type: "fetch-gif-success";
};

type SearchCanceledAction = {
  type: "search-cancelled";
};

type SearchErrorAction = {
  data: {
    error: Error;
  };
  type: "search-error";
};

type SearchStartAction = {
  data: {
    controller: AbortController;
  };
  type: "search-start";
};

type SearchSuccessAction = {
  data: {
    response: GiphyApiSearchResponse;
  };
  type: "search-success";
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

type FetchTrendingSuccessAction = {
  data: {
    response: GiphyApiTrendingResponse;
  };
  type: "fetch-trending-success";
};

export type Action =
  | FetchGifCanceledAction
  | FetchGifErrorAction
  | FetchGifStartAction
  | FetchGifSuccessAction
  | SearchCanceledAction
  | SearchErrorAction
  | SearchStartAction
  | SearchSuccessAction
  | FetchTrendingCanceledAction
  | FetchTrendingErrorAction
  | FetchTrendingStartAction
  | FetchTrendingSuccessAction;

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

export type SearchState = {
  fetch: { controller: AbortController } | null;
  gifs: Array<Gif>;
  offsetBottom: number;
  offsetTop: number;
  totalCount: number;
};

export type AppState = {
  gif: GifState;
  search: SearchState;
  trending: TrendingState;
};

export type GetState = () => AppState;
