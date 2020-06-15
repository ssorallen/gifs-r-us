import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../types";
import Gif from "../Gif";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import React from "react";
import { cancelFetchTrending, fetchTrending } from "../store/actions";

// Must match .grid{row-gap, grid-row-height} in Trending.css. Extract to a values sharable in JS?
const GRID_GAP_PX = 10;
const GRID_ROW_HEIGHT_PX = 10;

// If the scroll offset reaches anywhere from the bottom up to this many pixels away, fire off
// another request for trending.
const SCROLL_BOTTOM_THRESHOLD_PX = 50;

export default function TrendingPage() {
  const dispatch = useDispatch();
  const gifs = useSelector((state: AppState) => state.trending.gifs);
  const offsetBottom = useSelector(
    (state: AppState) => state.trending.offsetBottom
  );

  React.useEffect(() => {
    dispatch(fetchTrending({ offset: 0 }));
    return () => {
      dispatch(cancelFetchTrending());
    };
  }, [dispatch]);

  React.useEffect(() => {
    function handleScroll() {
      if (
        document.documentElement.scrollHeight -
          (window.scrollY + document.documentElement.clientHeight) <=
        SCROLL_BOTTOM_THRESHOLD_PX
      ) {
        dispatch(fetchTrending({ offset: offsetBottom }));
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
  }, [dispatch, offsetBottom]);

  return (
    <>
      <Helmet title="Trending GIFs" />
      <div className="py-3">
        <h3>Trending</h3>
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
                to={`/gifs/${gif.slug}`}
              >
                <Gif fluid={false} gif={gif} />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
