import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../types";
import Gif from "../Gif";
import { Link } from "react-router-dom";
import React from "react";
import { cancelSearch, search } from "../store/actions";
import { useLocation } from "react-router-dom";

// Must match .grid{row-gap, grid-row-height} in Trending.css. Extract to a values sharable in JS?
const GRID_GAP_PX = 10;
const GRID_ROW_HEIGHT_PX = 10;

// If the scroll offset reaches anywhere from the bottom up to this many pixels away, fire off
// another request for trending.
const SCROLL_BOTTOM_THRESHOLD_PX = 50;

export default function SearchPage() {
  const q = new URLSearchParams(useLocation().search).get("q");
  const dispatch = useDispatch();
  const gifs = useSelector((state: AppState) => state.search.gifs);
  const offsetBottom = useSelector(
    (state: AppState) => state.search.offsetBottom
  );
  const totalCount = useSelector((state: AppState) => state.search.totalCount);

  React.useEffect(() => {
    // No query? Nothing to search for.
    if (q == null) return;

    dispatch(search({ offset: 0, q }));
    return () => {
      dispatch(cancelSearch());
    };
  }, [dispatch, q]);

  React.useEffect(() => {
    // No query? Nothing to search for.
    if (q == null) return;

    function handleScroll() {
      if (
        document.documentElement.scrollHeight -
          (window.scrollY + document.documentElement.clientHeight) <=
        SCROLL_BOTTOM_THRESHOLD_PX
      ) {
        // Should the `q == null` check above not narrow the type to `string`?
        // @ts-ignore
        dispatch(search({ offset: offsetBottom, q }));
      }
    }

    // Check the first time whether more GIFs are needed. This ensures screens that are taller than
    // initial set of GIFs will load more. This works to fill the screen because as `offsetBottom`
    // changes this `useEffect` will get called again.
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, offsetBottom, q]);

  return (
    <div className="py-3">
      <h3>
        {q}{" "}
        <small className="text-muted">{totalCount.toLocaleString()} GIFs</small>
      </h3>
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
              <Gif fluid={false} gif={gif} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
