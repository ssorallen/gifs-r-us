import React from "react";

// If the scroll offset reaches anywhere from the bottom up to this many pixels away, fire off
// another request for trending.
const SCROLL_BOTTOM_THRESHOLD_PX = 50;

export default function useOffsetScroll({
  onCancelFetch,
  onFetch,
}: {
  onCancelFetch: () => void;
  onFetch: () => void;
}) {
  React.useEffect(() => {
    onFetch();
    return () => {
      onCancelFetch();
    };
  }, [onCancelFetch, onFetch]);

  React.useEffect(() => {
    function handleScroll() {
      if (
        document.documentElement.scrollHeight -
          (window.scrollY + document.documentElement.clientHeight) <=
        SCROLL_BOTTOM_THRESHOLD_PX
      ) {
        onFetch();
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onFetch]);
}
