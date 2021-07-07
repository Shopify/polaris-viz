import type {Color, StringLabelFormatter, NumberLabelFormatter} from 'types';

export interface BarChartData {
  barOptions?: {
    color: Color;
  };
  label: string;
  rawValue: number;
}

export interface RenderTooltipContentData {
  label: string;
  value: number;
  annotation?: Annotation;
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
  integersOnly: boolean;
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
