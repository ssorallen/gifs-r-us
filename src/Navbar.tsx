import { Link } from "react-router-dom";
import React from "react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const loc = new URLSearchParams(useLocation().search);
  const q = loc.get("q");
  const [value, setValue] = React.useState(q);

  // Sync the local state when the `q` search param changes but let the form submission handle
  // persisting the new value to the URL.
  React.useEffect(() => {
    setValue(q);
  }, [q]);

  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/">
        Gifs-R-Us{" "}
        <span aria-label="" role="img">
          🎉
        </span>
      </Link>
      <form action="/search" className="form-inline">
        <div className="input-group">
          <input
            aria-label="Search all the GIFs"
            className="form-control"
            name="q"
            onChange={(e) => {
              setValue(e.target.value);
            }}
            placeholder="Search all the GIFs"
            type="search"
            value={value == null ? "" : value}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-success" type="submit">
              <span aria-label="Search" role="img">
                🔎
              </span>
            </button>
          </div>
        </div>
      </form>
    </nav>
  );
}
