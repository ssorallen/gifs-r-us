import { cancelFetchGif, fetchGif } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../types";
import Gif from "../Gif";
import React from "react";
import { useParams } from "react-router-dom";

export default function GifPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const gif = useSelector((state: AppState) => state.gif.gif);

  React.useEffect(() => {
    dispatch(fetchGif(id));
    return () => {
      dispatch(cancelFetchGif());
    };
  }, [dispatch, id]);

  return (
    <div>
      {gif == null ? null : (
        <>
          <h3>{gif.title}</h3>
          <p>
            {gif.username == null ? null : <>@{gif.username} &middot; </>}
            {gif.import_datetime}
          </p>
          <Gif gif={gif} size="downsized" />
        </>
      )}
    </div>
  );
}
