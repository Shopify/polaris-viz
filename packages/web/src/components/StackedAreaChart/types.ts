import type {Series} from 'd3-shape';

import type {Color} from '../../types';

export interface RenderTooltipContentData {
  title: string;
  data: {
    color: Color;
    label: string;
    value: number;
  }[];
}

export type StackedSeries = Series<
  {
    [key: string]: number;
  },
  string
>;
