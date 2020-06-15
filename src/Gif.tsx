import "./Gif.css";
import React from "react";
import { Gif as TGif } from "./types";

type Props = {
  gif: TGif;
  size?: "downsized" | "fixed_width";
};

export default function Gif({ gif, size = "fixed_width" }: Props) {
  const gifImage = gif.images[size];
  const [imageComplete, setImageComplete] = React.useState(false);

  React.useEffect(() => {
    // Once the image has finished loading, render the actual `<img>` tag and unset `onload` so the
    // Image object has no other reference in memory and can be garbage collected.
    const image = new Image();
    image.onload = () => {
      setImageComplete(true);
      image.onload = null;
    };
    image.src = gifImage.url;

    // If the Gif is removed before loading is complete:
    // * ensure no onload runs
    // * set the `src` to empty string to cancel inflight requests
    return () => {
      image.onload = null;
      image.src = "";
    };
  }, [gifImage.url]);

  return (
    <div
      className={`gif ${imageComplete ? "" : "gif-loading"}`}
      // Ensure container always has dimensions even when the <img> is not yet rendered.
      style={{
        height: `${gifImage.height}px`,
        width: `${gifImage.width}px`,
      }}
    >
      {imageComplete ? (
        <img
          alt=""
          className="img-fluid"
          height={gifImage.height}
          loading="lazy"
          src={gifImage.url}
          title={gif.title}
          width={gifImage.width}
        />
      ) : null}
    </div>
  );
}
