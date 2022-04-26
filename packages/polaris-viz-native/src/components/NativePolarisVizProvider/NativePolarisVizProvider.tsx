import React from 'react';
import {PolarisVizProvider as OriginalPolarisVizProvider} from '@shopify/polaris-viz-core';
import {animated, useTransition} from '@react-spring/native';
import type {PartialTheme} from '@shopify/polaris-viz-core';

import {DEFAULT_COMPONENTS as NativeComponents} from '../../constants';

export const NativePolarisVizProvider = ({
  themes,
  children,
}: {
  children: React.ReactNode;
  themes?: {[key: string]: PartialTheme};
}) => {
  return (
    <OriginalPolarisVizProvider
      themes={themes}
      components={NativeComponents}
      animated={animated}
      useTransition={useTransition}
      useWatchColorVisionEvents={() => {}}
    >
      {children}
    </OriginalPolarisVizProvider>
  );
};
