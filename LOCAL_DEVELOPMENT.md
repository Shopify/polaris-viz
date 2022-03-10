<br/>

## 👨🏽‍💻 Local Development

To get started developing locally:

- Clone the repo: `git clone https://github.com/Shopify/polaris-viz.git`
- Install all dependencies: `yarn install`
- Start Storybook locally: `yarn storybook`
- Commit your changes as you would usually. Make sure to describe your edits or additions in the package's corresponding changelog.

> ⚠️ If you don't have [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) installed in your computer, install it first by running `npm install --global yarn`

### Scripts

**Note🗒️** These are the most common scripts. See the `package.json` for a full list of all available scripts.

- **`yarn build`:**
Cleans all `build` directories and rebuilds all packages

- **`yarn type-check`:**
Will type check all packages

- **`yarn test`:**
Will start the jest test runner

- **`yarn dev`:**
Build all libraries and automatically rebuild on code change. This can be combined with the [Sandbox](http://polaris-viz.shopify.io/?path=/docs/contributing-sandbox--page) to get near live updates.

- **`yarn storybook`:**
Run storybook locally

- **`yarn lint`:**
Lint all files

- **`yarn version-bump`:**
Create a new release and tag. Does not push to github. Save to use for testing without pushing.


### Developing in React Native

To test `@shopify/polaris-viz-native` code please use our [Sandbox](http://polaris-viz.shopify.io/?path=/docs/contributing-sandbox--page).

<br>

## 🗂 Folder Structure

<br>

### `/packages`

In the packages folder you'll find the source code of the libraries that get published to NPM:

- `/packages/polaris-viz` => `@shopify/polaris-viz`
- `/packages/polaris-viz-native` => `@shopify/polaris-viz-native`
- `/packages/polaris-viz-core` => `@shopify/polaris-viz-core`

`@shopify/polaris-viz-core` contains platform agnostic code shared by both `@shopify/polaris-viz` and `@shopify/polaris-viz-native`

This monorepo is managed with Shopify's [Loom](https://www.npmjs.com/package/@shopify/loom) for building and testing and [Lerna](https://github.com/lerna/lerna) for the publishing workflow. To learn more about how to create releases please see our [Creating Releases page](http://polaris-viz.shopify.io/?path=/docs/contributing-creating-releases--page).


<br>

### `*/**/stories/`

We use [Storybook](https://storybook.js.org/) to document and develop our components. Story files are located in `/stories/` folders in each package `/src/` folder.

If you create a new chart component, new subcomponent used throughout the repo or add a new prop to an existing component, ensure any new states are covered by stories.

For complex props, like callback functions, consider adding a select to stories with a few different predefined options.


<br>

### `/sandbox`

The sandbox folder contains an [Expo](https://docs.expo.dev/) app pre-configured so you can test the build of each library in a web browse, an iOS simulator or an Android simulator. Read more about how to use it on the [Sandbox page](http://polaris-viz.shopify.io/?path=/docs/contributing-sandbox--page).
