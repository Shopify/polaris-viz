import type {Color} from 'types';

export interface BarChartData {
  barColor?: Color | string;
  label: string;
  rawValue: number;
}

export interface RenderTooltipContentData {
  label: string;
  value: number;
  annotation?: Annotation;
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
