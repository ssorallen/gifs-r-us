import { cancelFetchGif, fetchGif } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../types";
import Gif from "../Gif";
import React from "react";
import { useParams } from "react-router-dom";

const SLUG_REGEXP = /([^-]+)$/;

export default function GifPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const gif = useSelector((state: AppState) => state.gif.gif);
  const match = SLUG_REGEXP.exec(slug);
  const id = match == null ? "" : match[0];

  React.useEffect(() => {
    dispatch(fetchGif(id));
    return () => {
      dispatch(cancelFetchGif());
    };
  }, [dispatch, id]);

  return (
    <div className="py-3">
      {gif == null ? null : (
        <>
          {gif.title === "" ? null : <h3>{gif.title}</h3>}
          <p>
            {gif.username === "" ? null : <>@{gif.username} &middot; </>}
            {gif.import_datetime}
          </p>
          <Gif gif={gif} size="downsized" />
        </>
      )}
    </div>
  );
}
