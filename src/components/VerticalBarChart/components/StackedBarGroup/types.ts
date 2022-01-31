import type {ScaleLinear, ScaleBand} from 'd3-scale';

import type {
  Color,
  StackedBarGapDirections,
  StackedSeries,
} from '../../../../types';

export interface StackedBarGroupProps {
  groupIndex: number;
  data: StackedSeries;
  yScale: ScaleLinear<number, number>;
  xScale: ScaleBand<string>;
  colors: Color[];
  activeBarGroup: number | null;
  accessibilityData: {
    title: string;
    data: {
      label: string;
      value: string;
    }[];
  }[];
  gaps: {[key: number]: StackedBarGapDirections};
}
