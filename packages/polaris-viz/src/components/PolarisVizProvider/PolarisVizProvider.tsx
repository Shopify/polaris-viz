import {PolarisVizProvider as OriginalPolarisVizProvider} from '@shopify/polaris-viz-core';
import {animated} from '@react-spring/web';
import type {
  ErrorBoundaryResponse,
  PartialTheme,
} from '@shopify/polaris-viz-core';
import type {ReactNode} from 'react';

export const PolarisVizProvider = ({
  themes,
  children,
  defaultTheme,
  onError,
}: {
  children: ReactNode;
  themes?: {[key: string]: PartialTheme};
  defaultTheme?: string;
  onError?: ErrorBoundaryResponse;
}) => {
  return (
    <OriginalPolarisVizProvider
      themes={themes}
      animated={animated}
      defaultTheme={defaultTheme}
      onError={onError}
    >
      {children}
    </OriginalPolarisVizProvider>
  );
};
