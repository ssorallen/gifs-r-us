import "./Gif.css";
import React from "react";
import { Gif as TGif } from "./types";

type Props = {
  gif: TGif;
  rowSpan: number;
};

export default function Gif({ gif, rowSpan }: Props) {
  const [imageComplete, setImageComplete] = React.useState(false);

  React.useEffect(() => {
    const image = new Image();
    setImageComplete(false);

    // Once the image has finished loading, render the actual `<img>` tag and unset `onload` so the
    // Image object has no other reference in memory and can be garbage collected.
    image.onload = () => {
      setImageComplete(true);
      image.onload = null;
    };

    image.src = gif.images.fixed_width.url;
  }, [gif.images.fixed_width.url]);

  return (
    <div
      className={`gif ${imageComplete ? "" : "gif-loading"}`}
      style={{ gridRowEnd: `span ${rowSpan}` }}
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
