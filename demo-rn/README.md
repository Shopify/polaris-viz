# Polaris Viz React Native Sandbox

Use this sandbox to import `@shopify/polaris-viz-native` components and test them on real devices. The sandbox consists of a boilerplate expo project.

## Start Sandbox

1. `yarn install`
2. `yarn dev`
3. Open second terminal
4. `yarn sandbox`
6. Hit `i` for `iOS` or `a` for android. You can also scan the QR Code to open the app on your phone (with the expo app)

### Additional Context on building with the sandbox

If you notice file updates are not being picked up, abort the `yarn sandbox` command using `CTRL+C` and then run `yarn start -c`. This will clear the metro cache.

Any file changes within the libraries will automatically trigger the metro bundler to rebuild. However, because `demo-rn` consumes the libraries `build` folders you will also need to rebuild the packages themselves. A `dev` command has been added to the root `package.json`. `yarn dev` will automatically rebuild `polaris-viz-core` and `polaris-viz-native` as soon as any `tsx` or `ts` files are changed (with the exception of `.d.ts`).
