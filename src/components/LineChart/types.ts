import type {
  LegacyDataSeries,
  Data,
  LineStyle,
  StringLabelFormatter,
  NumberLabelFormatter,
  Color,
} from '../../types';

export interface Series extends LegacyDataSeries<Data, Color> {
  areaColor?: string | null;
  lineStyle?: LineStyle;
}

export type SeriesWithDefaults = Required<LegacyDataSeries<Data, Color>> & {
  lineStyle: LineStyle;
  areaColor?: string | null;
};

export interface TooltipData {
  name: string;
  point: {
    label: string;
    value: number;
  };
  color: Color;
  lineStyle: LineStyle;
}

export interface RenderTooltipContentData {
  data: TooltipData[];
}

export interface XAxisOptions {
  labelFormatter: StringLabelFormatter;
  xAxisLabels: string[];
  useMinimalLabels: boolean;
  hide?: boolean;
  wrapLabels: boolean;
}

export interface YAxisOptions {
  labelFormatter: NumberLabelFormatter;
  integersOnly: boolean;
}
