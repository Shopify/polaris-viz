import type {Series as ShapeSeries} from 'd3-shape';

import type {
  StringLabelFormatter,
  NumberLabelFormatter,
  DataSeries,
  Data,
  Color,
} from '../../types';

export type Series = DataSeries<Data, Color>;

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
  /**
   * @deprecated This prop is experimental and not ready for general use. If you want to use this, come talk to us in #polaris-data-viz
   */
  zeroAsMinHeight: boolean;
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
  backgroundColor: string;
  integersOnly: boolean;
}
