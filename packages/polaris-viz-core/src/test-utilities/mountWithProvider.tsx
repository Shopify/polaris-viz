import React from 'react';
import {mount} from '@shopify/react-testing';
import {useTransition} from '@react-spring/core';

import type {PartialTheme} from '../types';
import {PolarisVizProvider} from '../components';

export const mountWithProvider = (
  child: React.ReactElement<any, any>,
  providerValues?: {
    themes: {[key: string]: PartialTheme};
  },
) => {
  const {themes} = providerValues || {themes: {}};

  return mount(
    <PolarisVizProvider
      themes={themes}
      animated={(element) => element}
      useTransition={useTransition}
      useWatchColorVisionEvents={() => {}}
    >
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
