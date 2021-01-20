import {Series as ShapeSeries} from 'd3-shape';
import {Color, DataSeries} from 'types';

export interface Series extends DataSeries {
  highlightColor?: Color;
}

export type StackSeries = ShapeSeries<
  {
    [key: string]: number;
  },
  string
>;

export interface RenderTooltipContentData {
  data: {
    color: Color;
    label: string;
    value: number;
  }[];
  title: string;
}
