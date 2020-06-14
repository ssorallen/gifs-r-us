import "./Gif.css";
import React from "react";
import { Gif as TGif } from "./types";

type Props = {
  gif: TGif;
};

export default function Gif({ gif }: Props) {
  const [imageComplete, setImageComplete] = React.useState(false);

  React.useEffect(() => {
    // Once the image has finished loading, render the actual `<img>` tag and unset `onload` so the
    // Image object has no other reference in memory and can be garbage collected.
    const image = new Image();
    setImageComplete(false);
    image.onload = () => {
      setImageComplete(true);
      image.onload = null;
    };
    image.src = gif.images.fixed_width.url;

    // If the Gif is removed before loading is complete:
    // * ensure no onload runs
    // * set the `src` to empty string to cancel inflight requests
    return () => {
      image.onload = null;
      image.src = "";
    };
  }, [gif.images.fixed_width.url]);

  return (
    <div
      className={`gif ${imageComplete ? "" : "gif-loading"}`}
      // Ensure container always has dimensions even when the <img> is not yet rendered.
      style={{
        height: `${gif.images.fixed_width.height}px`,
        width: `${gif.images.fixed_width.width}px`,
      }}
    >
      {imageComplete ? (
        <img
          alt=""
          height={gif.images.fixed_width.height}
          loading="lazy"
          src={gif.images.fixed_width.url}
          title={gif.title}
          width={gif.images.fixed_width.width}
        />
      ) : null}
    </div>
  );
}
