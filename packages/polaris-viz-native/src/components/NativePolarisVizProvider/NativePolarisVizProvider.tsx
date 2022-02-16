import React from 'react';
import {PolarisVizProvider as OriginalPolarisVizProvider} from '@shopify/polaris-viz-core';
import {animated} from '@react-spring/native';

import {DEFAULT_COMPONENTS as NativeComponents} from '../../constants';

export const NativePolarisVizProvider = ({themes, children}) => {
  return (
    <OriginalPolarisVizProvider
      themes={themes}
      components={NativeComponents}
      animated={animated}
      native
    >
      {children}
    </OriginalPolarisVizProvider>
  );
};
