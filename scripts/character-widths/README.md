# 📏 Character Widths

To speed up the truncation logic for [Labels](https://polaris-viz.shopify.com/?path=/docs/shared-labels--page) we use a pre-built `json` file that includes the width of each available character the browser provides. This includes multiple languages.

Currently this process is manual, but it only needs to be re-ran if the font size, or family changes.

## Getting the json data

1. Drag `build-character-widths.html` into a blank browser window.
2. Once the page loads (this can take 15+ seconds), open your console with `Cmd+Alt+I`.
3. Copy the json object.
4. Paste the new object in `packages/polaris-viz/src/data/character-widths.json`.
