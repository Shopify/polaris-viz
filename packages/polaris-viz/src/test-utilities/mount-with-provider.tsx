import React from 'react';
import {mount} from '@shopify/react-testing';
import type {PartialTheme} from 'types';

import {PolarisVizProvider} from '../components';

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

export const mockDefaultTheme = (overrides: PartialTheme) => {
  return {
    themes: {
      Default: overrides,
    },
  };
};
