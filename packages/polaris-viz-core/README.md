<br/>

## 🧠 `polaris-viz-core`

`packages/polaris-viz-core` contains platform agnostic utility functions, hooks, constants, types and UI components.

It gets published as the `@shopify/polaris-viz-core` library that is used by both `@shopify/polaris-viz` and `@shopify/polaris-viz-native`


<br/>
<hr/>
<br/>

## 👯‍♀️ Sharing code between React and React Native

<br/>
<br/>

### Keeping the bundle size small

To keep the bundle size of the libraries small, `@shopify/polaris-viz-core` shouldn't depend on platform specific packages, like ` @react-native` or `@react-spring/web`, directly.

<br/>
<br/>

### Sharing UI components

To render SVG tags in React Native, we use [the `react-native-svg` library](https://github.com/react-native-svg/react-native-svg). `@shopify/polaris-viz` doesn't need this package as a dependency though, since its targets are web browsers only. If we added `react-native-svg` as a depency of `@shopify/polaris-viz-core` we would also increase `@shopify/polaris-viz` bundle size for something that only `@shopify/polaris-viz-native` needs.

To solve this, we:

- Store all regular SVG tags as React components in the `polaris-viz-context` used by `PolarisVizProvider`:

```ts
// packages/polaris-viz-core/polaris-viz-context.ts

export const PolarisVizContext = createContext({
  components: {
    Svg: ({children, ...props}) => createElement('svg', props, children),
    Circle: ({children, ...props}) => createElement('circle', props, children),
    Ellipse: ({children, ...props}) => createElement('ellipse', props, children),
    G: ({children, ...props}) => createElement('g', props, children),
    Text: ({children, ...props}) => createElement('text', props, children),
    // ... other SVG tags
  },
});
```

- Re-export `PolarisVizProvider` from `polaris-viz-native` overwriting the regular SVG tags, with the equivalent tags from `react-native-svg`

```ts
// packages/polaris-viz-native/PolarisVizProvider.tsx

import {PolarisVizProvider as OriginalPolarisVizProvider} from '@shopify/polaris-viz-core';

import  {
  Svg,
  Circle,
  // ...
} from 'react-native-svg';

export const NativeComponents = {
  Svg,
  Circle,
  // ...
}

export const PolarisVizProvider = ({themes, children}) => {
  return (
    <OriginalPolarisVizProvider
      themes={themes}
      components={NativeComponents}
      animated={animated}
    >
      {children}
    </OriginalPolarisVizProvider>
  );
};

```




- When building UI components in `polaris-viz-core`, instead of using `<svg>` directly, we get `<Svg>` from the context:

```ts
// packages/polaris-viz-core/SomeSharedComponent.tsx

export function SomeSharedComponent() {
  const {
    components: {Svg, Rect},
  } = usePolarisVizContext();

  return (
    <Svg>
      <Rect />
    </Svg>
  )
}

```

With these changes in place,
- in `polaris-viz`:
  <br/>
  `<Svg>` and `<Rect>` will fetch the `svg` and `rect` tags from the default values of `polaris-viz-context` and render correctly in web browsers
  <br/>
  <br/>
- in `polaris-viz-native`:
  <br/>
  `<Svg>` and `<Rect>` will fetch the `Svg` and `Rect` tags from the `react-native-svg` library that were used to overwrite the default tags in the `PolarisVizProvider`, thus rendering correctly in React Native

To summarize:

![graph demontrating that core components fetching svg tags from PolarisVizProvider will use regular SVG tags in polaris-viz and native SVG tags in polaris-viz-native](../../public/PolarisVizProvider_graph.png)

<br/>
<hr/>
<br/>
### Animating shared UI components

We use [react-spring](https://react-spring.io/) to handle animations. This library also has platform specific exports to keep bundle size small: `@react-spring/web` and `@react-spring/native`

To animate components in core, we fetch the platform specific `animated` function from the ` PolarisVizContext`, similarly to how we get the correct SVG tags.

```tsx

// packages/polaris-viz-core/SomeSharedComponent.tsx

import { useSpring } from "@react-spring/core"

export function SomeSharedComponent() {
  const {
    components: {Svg, Circle},
    animated,
  } = usePolarisVizContext();

  const {animatedRadius} = useSpring({
    from: {
      animatedRadius: 0,
    },
    to: {
      animatedRadius: 100,
    },
  });

  const AnimatedCircle = animated(Circle);


  return (
    <Svg>
      <AnimatedCircle radius={animatedRadius} />
    </Svg>
  )
}

```
