import {PolarisVizProvider as OriginalPolarisVizProvider} from '@shopify/polaris-viz-core';
import {animated} from '@react-spring/web';
import type {PartialTheme} from '@shopify/polaris-viz-core';
import type {ReactNode} from 'react';

export const PolarisVizProvider = ({
  themes,
  children,
}: {
  children: ReactNode;
  themes?: {[key: string]: PartialTheme};
}) => {
  return (
    <OriginalPolarisVizProvider themes={themes} animated={animated}>
      {children}
    </OriginalPolarisVizProvider>
  );
};
