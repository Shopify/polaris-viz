<br/>

## 🧠 polaris-viz-core

`packages/polaris-viz-core` contains platform agnostic utility functions, hooks, constants, types and UI components.

It gets published as the `@shopify/polaris-viz-core` library that is used by both `@shopify/polaris-viz` and `@shopify/polaris-viz-native`


<br/>
<hr/>
<br/>

## Sharing code between React and React Native

To keep the bundle size of the libraries small, `@shopify/polaris-viz-core` shouldn't depend on platform specific packages, like ` @react-native` or `@react-spring/web`, directly.

We should instead fetch the correct version of platform specific code through the `PolarisVizProvider`. This guarantees that consumers that install `@shopify/polaris-viz` don't need to download native libraries and that who installs `@shopify/polaris-viz-native` doesn't need to download browser specific dependencies.


<!-- TODO explain how PolarisVizProvider gets re-exported by polaris-viz and polaris-viz-native -->



