import type {ScaleLinear, ScaleBand} from 'd3-scale';

import type {StackSeries} from '../../types';
import type {Color} from '../../../../types';

export interface StackedBarGroupProps {
  groupIndex: number;
  data: StackSeries;
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
}
