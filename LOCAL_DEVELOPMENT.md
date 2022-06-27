<br/>

## 👨🏽‍💻 Local Development

To get started developing locally:

- Clone the repo: `git clone https://github.com/Shopify/polaris-viz.git`
- Install all dependencies: `yarn install`
- Start Storybook locally: `yarn storybook`
- Commit your changes as you would usually. Make sure to describe your edits or additions in the package's corresponding CHANGELOG.md.

> ⚠️ If you don't have [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) installed on your computer, install it first by running `npm install --global yarn`

### Scripts

**Note🗒️** These are the most common scripts. See the `package.json` for a full list of all available scripts.

- **`yarn build`:**
Cleans all `build` directories and rebuilds all packages

- **`yarn type-check`:**
Will type check all packages

- **`yarn test`:**
Will start the jest test runner

- **`yarn dev`:**
Builds all libraries and automatically rebuilds on code change. This can be combined with the [Sandbox](http://polaris-viz.shopify.io/?path=/docs/contributing-sandbox--page) to get near live updates.

- **`yarn storybook`:**
Runs storybook locally

- **`yarn lint`:**
Lints all files

- **`yarn version-bump`:**
Creates a new release and a tag. Does not push to github. Save to use for testing without pushing.

<br />

### Dependency management

Due to the monorepo setup Polaris Viz now has an additional `package.json` in the root on top of the individual `package.json` files of the libraries.

Add new dependencies to whichever library requires them. For example: When adding a new dependency to `@shopify/polaris-viz` run `yarn add @some/library` (or `yarn add @some/library --dev` respectively) as you usually would while in the `packages/polaris-viz` directory.

The root `package.json` merely contains `devDependencies` that are needed to build all libraries successfully when running `yarn build`. Any runtime libraries need to be added to the individual packages.

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

If you add a new prop to an existing component or create a new chart component or a new subcomponent that are used throughout the repo, ensure any new states are covered by stories.

For complex props, like callback functions, consider adding a select to stories with a few different predefined options.


<br>

### `/sandbox`

The sandbox folder contains an [Expo](https://docs.expo.dev/) app pre-configured so you can test the build of each library in a web browser, an iOS simulator or an Android simulator. Read more about how to use it on the [Sandbox page](http://polaris-viz.shopify.io/?path=/docs/contributing-sandbox--page).
