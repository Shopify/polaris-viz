import React from 'react';
import {PolarisVizProvider as OriginalPolarisVizProvider} from '@shopify/polaris-viz-core';
import {animated} from '@react-spring/web';
import type {PartialTheme} from '@shopify/polaris-viz-core';

export const WebPolarisVizProvider = ({
  themes,
  children,
}: {
  children: React.ReactNode;
  themes?: {[key: string]: PartialTheme};
}) => {
  return (
    <OriginalPolarisVizProvider themes={themes} animated={animated}>
      {children}
    </OriginalPolarisVizProvider>
  );
};
