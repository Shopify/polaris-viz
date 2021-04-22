import {Data, Color, StringLabelFormatter, NumberLabelFormatter} from 'types';

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
  color: Color;
  highlightColor: Color;
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
}

export interface YAxisOptions {
  labelFormatter: NumberLabelFormatter;
  labelColor: string;
}

export interface BarChartData extends Data {
  annotation?: Annotation;
}

export interface Annotation {
  width: number;
  color: Color;
  tooltipData?: {
    label: string;
    value: string;
  };
  ariaLabel?: string;
  // offset ranging from 0 to 1.0
  // TODO: figure out how to clamp this
  xOffset?: number;
}
