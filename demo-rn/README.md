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

<p>
  <!-- iOS -->
  <a href="https://itunes.apple.com/app/apple-store/id982107779">
    <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  </a>
  <!-- Android -->
  <a href="https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=blankexample">
    <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  </a>
  <!-- Web -->
  <a href="https://docs.expo.dev/workflow/web/">
    <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
  </a>
</p>

## 🚀 How to use

- Install packages with `yarn` or `npm install`.
- Run `yarn start` to start the bundler.
- Open the project in a React runtime to try it:
  - iOS: [Client iOS](https://itunes.apple.com/app/apple-store/id982107779)
  - Android: [Client Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=blankexample)
  - Web: Any web browser
- When it's time to customize your runtime, refer to the ["Adding custom native code"](https://docs.expo.dev/workflow/customizing/) guide!

## Publishing

- Deploy the native app to the App store and Play store using this guide: [Deployment](https://docs.expo.dev/distribution/app-stores/).
- Deploy the website using this guide: [Web deployment](https://docs.expo.dev/distribution/publishing-websites/).

## 📝 Notes

- Learn more about [Universal React](https://docs.expo.dev/).
- See what API and components are [available in the React runtimes](https://docs.expo.dev/versions/latest/).
- Find out more about developing apps and websites: [Official guides](https://docs.expo.dev/guides/).
