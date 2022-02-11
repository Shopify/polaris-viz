import React from 'react';
import {PolarisVizProvider as OriginalPolarisVizProvider} from '@shopify/polaris-viz-core';

import {DEFAULT_COMPONENTS as NativeComponents} from '../../constants';

export const NativePolarisVizProvider = ({themes, animated, children}) => {
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
