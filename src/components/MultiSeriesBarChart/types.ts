import {Series as ShapeSeries} from 'd3-shape';

import {Color, DataSeries, Data, GradientColor} from '../../types';

export interface Series extends Omit<DataSeries<Data>, 'color'> {
  highlightColor?: Color | GradientColor;
  color?: Color | GradientColor;
}

export type StackSeries = ShapeSeries<
  {
    [key: string]: number;
  },
  string
>;

export interface RenderTooltipContentData {
  data: {
    color: Color | GradientColor;
    label: string;
    value: number;
  }[];
  title: string;
}

export interface AccessibilitySeries {
  title: string;
  data: {
    label: string;
    value: string;
  }[];
}
