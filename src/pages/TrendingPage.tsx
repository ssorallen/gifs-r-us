import "./TrendingPage.css";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../types";
import Gif from "../Gif";
import { Link } from "react-router-dom";
import React from "react";
import { cancelFetchTrending, fetchTrending } from "../store/actions";

// Must match .grid{row-gap, grid-row-height} in Trending.css. Extract to a values sharable in JS?
const GRID_GAP_PX = 10;
const GRID_ROW_HEIGHT_PX = 10;

export default function TrendingPage() {
  const dispatch = useDispatch();
  const gifs = useSelector((state: AppState) => state.trending.gifs);

  React.useEffect(() => {
    dispatch(fetchTrending());
    return () => {
      dispatch(cancelFetchTrending());
    };
  }, [dispatch]);

  return (
    <div className="grid">
      {gifs.map((gif) => {
        const rowSpan = Math.ceil(
          (parseInt(gif.images.fixed_width.height, 10) + GRID_GAP_PX) /
            (GRID_ROW_HEIGHT_PX + GRID_GAP_PX)
        );
        return (
          <Link
            key={gif.id}
            style={{ gridRowEnd: `span ${rowSpan}` }}
            to={`/gifs/${gif.id}`}
          >
            <Gif gif={gif} />
          </Link>
        );
      })}
    </div>
  );
}
