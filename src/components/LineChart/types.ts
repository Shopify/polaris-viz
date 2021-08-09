import type {
  DataSeries,
  Data,
  LineStyle,
  StringLabelFormatter,
  NumberLabelFormatter,
  SeriesColor,
} from '../../types';

export interface Series extends DataSeries<Data, SeriesColor> {
  areaColor?: string | null;
  lineStyle?: LineStyle;
}

export type SeriesWithDefaults = Required<DataSeries<Data, SeriesColor>> & {
  lineStyle: LineStyle;
  areaColor?: string | null;
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

export interface XAxisOptions {
  labelFormatter: StringLabelFormatter;
  xAxisLabels: string[];
  useMinimalLabels: boolean;
}

export interface YAxisOptions {
  labelFormatter: NumberLabelFormatter;
  integersOnly: boolean;
}
