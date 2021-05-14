import {
  Color,
  StringLabelFormatter,
  NumberLabelFormatter,
  GradientStop,
} from 'types';

export interface BarChartData {
  barOptions?: {
    color: Color;
  };
  label: string;
  rawValue: number;
}

export enum BarMargin {
  Small = 0.05,
  Medium = 0.1,
  Large = 0.3,
  None = 0,
}

export interface RenderTooltipContentData {
  label: string;
  value: number;
  annotation?: Annotation;
}

export interface BarOptions {
  innerMargin: keyof typeof BarMargin;
  outerMargin: keyof typeof BarMargin;
  color: Color | GradientStop[];
  hasRoundedCorners: boolean;
}

export interface GridOptions {
  showHorizontalLines: boolean;
  horizontalOverflow: boolean;
  color: string;
  horizontalMargin: number;
}

export interface XAxisOptions {
  labelFormatter: StringLabelFormatter;
  showTicks: boolean;
  labelColor: string;
  useMinimalLabels: boolean;
}

export interface YAxisOptions {
  labelFormatter: NumberLabelFormatter;
  labelColor: string;
  backgroundColor: string;
}

export interface Annotation {
  dataIndex: number;
  width: number;
  color: Color | string;
  tooltipData?: {
    label: string;
    value: string;
  };
  ariaLabel?: string;
  xOffset?: number;
}

export interface AnnotationLookupTable {
  [key: number]: Annotation;
}
