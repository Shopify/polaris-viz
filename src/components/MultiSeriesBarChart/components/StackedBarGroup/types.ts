import {ScaleLinear, ScaleBand} from 'd3-scale';

import {StackSeries} from '../../types';
import {SeriesColor} from '../../../../types';

export interface StackedBarGroupProps {
  groupIndex: number;
  data: StackSeries;
  yScale: ScaleLinear<number, number>;
  xScale: ScaleBand<string>;
  colors: SeriesColor[];
  activeBarGroup: number | null;
  accessibilityData: {
    title: string;
    data: {
      label: string;
      value: string;
    }[];
  }[];
  onFocus: (index: number) => void;
}
