import React from 'react';
import {PolarisVizProvider as OriginalPolarisVizProvider} from '@shopify/polaris-viz-core';
import {animated, useTransition} from '@react-spring/web';
import type {PartialTheme} from '@shopify/polaris-viz-core';

import {useWatchColorVisionEvents} from '../../hooks';

export const WebPolarisVizProvider = ({
  themes,
  children,
}: {
  children: React.ReactNode;
  themes?: {[key: string]: PartialTheme};
}) => {
  return (
    <OriginalPolarisVizProvider
      themes={themes}
      animated={animated}
      useTransition={useTransition}
      useWatchColorVisionEvents={useWatchColorVisionEvents}
    >
      {children}
    </OriginalPolarisVizProvider>
  );
};
