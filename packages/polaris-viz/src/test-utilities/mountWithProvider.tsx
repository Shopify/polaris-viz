import * as React from 'react';
import {mount} from '@shopify/react-testing';
import type {PartialTheme, Theme} from '@shopify/polaris-viz-core';
import {createTheme, DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';

import {PolarisVizProvider} from '../';

export const mountWithProvider = (
  child: React.ReactElement<any, any>,
  providerValues?: {
    themes: {[key: string]: PartialTheme};
  },
) => {
  const {themes} = providerValues || {themes: {}};

  return mount(
    <PolarisVizProvider themes={themes}>
      <React.Fragment>{child}</React.Fragment>
    </PolarisVizProvider>,
  );
};

export const mockDefaultTheme = (
  overrides: PartialTheme,
): {
  themes: {[key: string]: Theme};
} => {
  return {
    themes: {
      [DEFAULT_THEME_NAME]: createTheme(overrides),
    },
  };
};
