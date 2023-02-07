import {createMount} from '@quilted/react-testing';
import type {PartialTheme} from '@shopify/polaris-viz-core';

import {PolarisVizProvider} from '../components';

interface Options {
  themes: {[key: string]: PartialTheme};
}

interface Context {
  themes: {[key: string]: PartialTheme};
}

export const mountWithProvider = createMount<Options, Context>({
  context({themes}) {
    return {themes};
  },
  render(element, {themes}) {
    return <PolarisVizProvider themes={themes}>{element}</PolarisVizProvider>;
  },
  // Final step: if we need post-mount behavior, inject it in. If it returns
  // a promise, like it does here, the final mount function will be async too.
  afterMount() {},
});

export const mockDefaultTheme = (overrides: PartialTheme) => {
  return {
    themes: {
      Default: overrides,
    },
  };
};
