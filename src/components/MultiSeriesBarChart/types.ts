import {Series as ShapeSeries} from 'd3-shape';

import {
  StringLabelFormatter,
  NumberLabelFormatter,
  DataSeries,
  Data,
  SeriesColor,
} from '../../types';

export type Series = DataSeries<Data, SeriesColor>;

export type StackSeries = ShapeSeries<
  {
    [key: string]: number;
  },
  string
>;

export interface RenderTooltipContentData {
  data: {
    color: SeriesColor;
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

export enum BarMargin {
  Small = 0.1,
  Medium = 0.3,
  Large = 0.5,
  None = 0,
}

export interface BarOptions {
  innerMargin: keyof typeof BarMargin;
  outerMargin: keyof typeof BarMargin;
  hasRoundedCorners: boolean;
  isStacked: boolean;
}

export interface GridOptions {
  showHorizontalLines: boolean;
  color: string;
  horizontalOverflow: boolean;
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
}
