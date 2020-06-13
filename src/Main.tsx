import "./Main.css";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "./types";
import Gif from "./Gif";
import React from "react";
import { fetchGifs } from "./actions";

// Must match .grid{row-gap, grid-row-height} in Main.css. Extract to a values sharable in JS?
const GRID_GAP_PX = 10;
const GRID_ROW_HEIGHT_PX = 10;

export default function Main() {
  const dispatch = useDispatch();
  const gifs = useSelector((state: AppState) => state.gifs);

  React.useEffect(() => {
    dispatch(fetchGifs());
  }, [dispatch]);

  return (
    <div className="grid">
      {gifs.map((gif) => {
        const rowSpan = Math.ceil(
          (parseInt(gif.images.fixed_width.height, 10) + GRID_GAP_PX) /
            (GRID_ROW_HEIGHT_PX + GRID_GAP_PX)
        );
        return <Gif gif={gif} key={gif.id} rowSpan={rowSpan} />;
      })}
    </div>
  );
}
