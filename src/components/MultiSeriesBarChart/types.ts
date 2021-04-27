import {Series as ShapeSeries} from 'd3-shape';

import {
  Color,
  DataSeries,
  Data,
  StringLabelFormatter,
  NumberLabelFormatter,
} from '../../types';

export interface Series extends DataSeries<Data, Color> {
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

export interface AccessibilitySeries {
  title: string;
  data: {
    label: string;
    value: string;
  }[];
}

export interface BarOptions {
  hasRoundedCorners: boolean;
  isStacked: boolean;
}

export interface GridOptions {
  showHorizontalLines: boolean;
  color: string;
}

export interface XAxisOptions {
  labelFormatter: StringLabelFormatter;
  showTicks: boolean;
  labels: string[];
  labelColor: string;
}

export interface YAxisOptions {
  labelFormatter: NumberLabelFormatter;
  labelColor: string;
  labelBackgroundColor?: string;
}
