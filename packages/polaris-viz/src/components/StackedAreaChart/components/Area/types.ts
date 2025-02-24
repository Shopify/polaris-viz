import type {Area as D3Area, Line} from 'd3-shape';
import type {Color, Theme} from '@shopify/polaris-viz-core';
import type {ReactNode} from 'react';

import type {StackedSeries} from '../../../../types';

export interface AreaProps {
  activeLineIndex: number;
  animationIndex: number;
  areaGenerator: D3Area<number[]>;
  colors: Color[];
  data: StackedSeries;
  zeroLineValues: StackedSeries;
  duration: number;
  id: string;
  index: number;
  lineGenerator: Line<number[]>;
  selectedTheme: Theme;
  tooltipAreas: ReactNode;
}
