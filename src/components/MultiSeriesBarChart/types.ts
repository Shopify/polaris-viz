import {Series as D3Series} from 'd3-shape';
import {Color, DataSeries} from 'types';

export interface Series extends DataSeries {
  color: Color;
  highlightColor?: Color;
}

export type StackSeries = D3Series<
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
