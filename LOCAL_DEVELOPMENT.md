<br/>

## 👨🏽‍💻 Local Development

<br/>

To get started developing locally:

- Clone the repo: `git clone https://github.com/Shopify/polaris-viz.git`
- Install all dependencies: `yarn install`
- Start Storybook locally: `yarn storybook`

> ⚠️ If you don't have [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) installed in your computer, install it first by running `npm install --global yarn`

<br>

## 🗂 Folder Structure

<br>

### `/packages`

In the packages folder you'll find the source code of the libraries that get published to NPM:

- `/packages/polaris-viz` => `@shopify/polaris-viz`
- `/packages/polaris-viz-native` => `@shopify/polaris-viz-native`
- `/packages/polaris-viz-core` => `@shopify/polaris-viz-core`

`@shopify/polaris-viz-core` contains platform agnostic code shared by both `@shopify/polaris-viz` and `@shopify/polaris-viz-native`

<!-- TODO add link -->
This monorepo is managed with [Lerna](https://github.com/lerna/lerna). We use it to control package versions and dependencies. To learn more about how we use Lerna head to the [Managing Dependencies & Versions]() page


<br>

### `*/**/stories/`

We use [Storybook](https://storybook.js.org/) to document and develop our components. Story files are located in `/stories/` folders in each package `/src/` folder.

If you create a new chart component, new subcomponent used throughout the repo or add a new prop to an existing component, ensure any new states are covered by stories.

For complex props, like callback functions, consider adding a select to stories with a few different predefined options.


<br>

### `/sandbox`

The sandbox folder contains an [Expo](https://docs.expo.dev/) app pre-configured so you can test the build of each library in a web browse, an iOS simulator or an Android simulator. Read more about how to use it on the [Sandbox page](http://polaris-viz.shopify.io/?path=/story/contributing-sandbox--page)
