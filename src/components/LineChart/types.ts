import type {
  DataSeries,
  Data,
  LineStyle,
  StringLabelFormatter,
  NumberLabelFormatter,
  SeriesColor,
} from '../../types';

export interface Series extends DataSeries<Data, SeriesColor> {
  areaColor?: string;
  lineStyle?: LineStyle;
}

export type SeriesWithDefaults = Required<DataSeries<Data, SeriesColor>> & {
  lineStyle: LineStyle;
  areaColor?: string;
};

export interface TooltipData {
  name: string;
  point: {
    label: string;
    value: number;
  };
  color: SeriesColor;
  lineStyle: LineStyle;
}

export interface RenderTooltipContentData {
  data: TooltipData[];
}

export interface LineOptions {
  hasSpline: boolean;
  width: number;
  pointStroke: string;
}

export interface XAxisOptions {
  labelFormatter: StringLabelFormatter;
  xAxisLabels: string[];
  hideXAxisLabels: boolean;
  showTicks: boolean;
  labelColor: string;
  useMinimalLabels: boolean;
}

export interface YAxisOptions {
  labelFormatter: NumberLabelFormatter;
  labelColor: string;
  backgroundColor: string;
  integersOnly: boolean;
}

export interface GridOptions {
  showVerticalLines: boolean;
  showHorizontalLines: boolean;
  color: string;
  horizontalOverflow: boolean;
  horizontalMargin: number;
}

export interface CrossHairOptions {
  width: number;
  color: string;
  opacity: number;
}
