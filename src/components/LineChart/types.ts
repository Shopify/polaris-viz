import {
  Color,
  DataSeries,
  Data,
  LineStyle,
  StringLabelFormatter,
  NumberLabelFormatter,
} from '../../types';

export interface Series extends DataSeries<Data> {
  showArea?: boolean;
  lineStyle?: LineStyle;
}

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

export interface LineOptions {
  hasSpline: boolean;
  width: number;
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
  labelBackgroundColor?: string;
}

export interface GridOptions {
  showVerticalLines: boolean;
  showHorizontalLines: boolean;
  color: string;
}

export interface CrossHairOptions {
  width: number;
  color: string;
  opacity: number;
}
