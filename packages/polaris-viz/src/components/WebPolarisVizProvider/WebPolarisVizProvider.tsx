import React from 'react';
import {PolarisVizProvider as OriginalPolarisVizProvider} from '@shopify/polaris-viz-core';
import {animated} from '@react-spring/web';

export const WebPolarisVizProvider = ({themes, children}) => {
  return (
    <OriginalPolarisVizProvider themes={themes} animated={animated}>
      {children}
    </OriginalPolarisVizProvider>
  );
};
