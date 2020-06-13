type Gif = {
  bitly_url: string;
  id: string;
  images: {
    fixed_height: { url: string };
    fixed_height_downsampled: { url: string };
    fixed_height_still: { url: string };
    fixed_width: {
      height: string;
      url: string;
      width: string;
    };
  };
  rating: string;
  title: string;
  type: "gif";
  url: string;
};

export type GiphyApiResponse = {
  data: Array<Gif>;
  metadata: any;
  pagination: {
    count: number;
    offset: number;
    total_count: number;
  };
};

type FetchGifsCanceledAction = {
  type: "fetch-gifs-cancelled";
};

type FetchGifsErrorAction = {
  data: {
    error: Error;
  };
  type: "fetch-gifs-error";
};

type FetchGifsStartAction = {
  data: {
    controller: AbortController;
  };
  type: "fetch-gifs-start";
};

type FetchGifsSucessAction = {
  data: {
    response: GiphyApiResponse;
  };
  type: "fetch-gifs-success";
};

export type Action =
  | FetchGifsCanceledAction
  | FetchGifsErrorAction
  | FetchGifsStartAction
  | FetchGifsSucessAction;

export type AppState = {
  fetch: { controller: AbortController } | null;
  gifs: Array<Gif>;
};
