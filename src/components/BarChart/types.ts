import {
  Color,
  StringLabelFormatter,
  NumberLabelFormatter,
  GradientStop,
} from 'types';

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
  margin: keyof typeof BarMargin;
  color: Color | GradientStop[];
  hasRoundedCorners: boolean;
}

export interface GridOptions {
  showHorizontalLines: boolean;
  color: string;
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
}

export interface Annotation {
  dataIndex: number;
  width: number;
  color: string;
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
