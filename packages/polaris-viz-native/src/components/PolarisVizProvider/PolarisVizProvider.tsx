import {PolarisVizProvider as OriginalPolarisVizProvider} from '@shopify/polaris-viz-core';
import {animated} from '@react-spring/native';
import type {PartialTheme} from '@shopify/polaris-viz-core';
import type {ReactNode} from 'react';

import {DEFAULT_COMPONENTS as NativeComponents} from '../../constants';

export const PolarisVizProvider = ({
  themes,
  children,
}: {
  children: ReactNode;
  themes?: {[key: string]: PartialTheme};
}) => {
  return (
    <OriginalPolarisVizProvider
      themes={themes}
      components={NativeComponents}
      animated={animated}
    >
      {children}
    </OriginalPolarisVizProvider>
  );
};
