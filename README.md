# Gifs-R-Us 🎉

A GIF browser built on [giphy.com's API][1]. I spent just about 8 hours on this project beginning
with Trending, then a single GIF page, and finally the Search page.

## Running locally

The app is built using [create-react-app][0] and can be run according to CRA's setup:

1. `yarn install`
2. `yarn start`

## Author

Ross Allen &lt;https://github.com/ssorallen&gt;

## The grid

The grid uses a [CSS Grid][2] layout with columns 200px wide and an automatic number of rows 10px
tall. Trending and Search pages use fixed-height GIFs so the GIFs are assigned a fix number of rows,
rounded up to the nearest 10px, so that the browser can handle the columns as the window is resized.

## Data loading

LOOP ->

1. Trending/Search pages check if scrollY+clientHeight is within `offset` of bottom of
   scrollable height
   - Not within `offset` of bottom? END
2. Request next block of GIFs starting at `offset`
3. Update of `offset` when fetch returns, triggers start of LOOP

<- END

- Scroll listener on window starts at top of LOOP
- Unmounting the page removes scroll listener and cancels any inflight requests

## Notes

- Search and Trending pages ended up being quite similar in their data loading, and ideally could be
  factored into a common hook and potentially a common reducer and set of actions. Because of the
  time constraint, I focused on getting the functionality working and then would return to pull out
  shared functionality.
- Added Bootstrap to the project with intentions of using more of the CSS but ended up only using
  the Navbar and the inline form. I'm quite familiar with the CSS, and so in a time constraint it
  was simple to drop it in and use the classes I needed.

## Resources

- Grid layout w/ CSS Grid and self-sizing of GIFs:
  https://medium.com/@andybarefoot/a-masonry-style-layout-using-css-grid-8c663d355ebb
- Pulsing background color keyframe animation: https://codepen.io/LukeAskew/pen/gabgom
- Rainbow hover text:
  https://w3bits.com/rainbow-text/#:~:text=Animated%20Rainbow%20text,-Below%20are%20some&text=Use%20repeating%2Dlinear%2Dgradient%20function,background%2Dposition%20at%20different%20keyframes.

[0]: https://github.com/facebook/create-react-app
[1]: https://developers.giphy.com/docs/api#quick-start-guide
[2]: https://developer.mozilla.org/en-US/docs/Web/CSS/grid
