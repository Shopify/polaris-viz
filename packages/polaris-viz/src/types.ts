import type {Interpolation, InterpolatorFn} from '@react-spring/web';
import type {Series, SeriesPoint} from 'd3-shape';

export type LabelFormatter = (value: string | number | null) => string;

export type StringLabelFormatter = (
  value: string,
  index?: number,
  data?: string[],
) => string;

export type NumberLabelFormatter = (value: number) => string;

export interface YAxisTick {
  value: number;
  formattedValue: string;
  yOffset: number;
}

export interface SparkChartData {
  value: number | null;
}

export type PathInterpolator = InterpolatorFn<readonly number[], string>;
export type NumberInterpolator = InterpolatorFn<readonly number[], number>;

export interface XAxisOptions {
  labelFormatter?: StringLabelFormatter;
  useMinimalLabels?: boolean;
  hide?: boolean;
  wrapLabels?: boolean;
}
export interface YAxisOptions {
  labelFormatter?: NumberLabelFormatter;
  integersOnly?: boolean;
}

// === Theme types === //
export enum BarMargin {
  Small = 0.05,
  Medium = 0.1,
  Large = 0.3,
  None = 0,
}

export interface Margin {
  Top: number;
  Left: number;
  Right: number;
  Bottom: number;
}

export type StackedSeries = Series<
  {
    [key: string]: number;
  },
  string
>;
export type FormattedStackedSeries = SeriesPoint<{
  [key: string]: number;
}>[];

export interface SingleIndexGap {
  index: number;
  gap: number;
}
export interface StackedBarGapDirections {
  positive: SingleIndexGap[];
  negative: SingleIndexGap[];
}

export type GradientUnits = 'userSpaceOnUse' | 'objectBoundingBox';

export interface CharacterWidths {
  [key: string]: number;
}

export interface LinearXAxisOptions {
  labelFormatter: StringLabelFormatter;
  xAxisLabels: string[];
  useMinimalLabels: boolean;
  hide?: boolean;
}

export interface LinearYAxisOptions {
  labelFormatter: NumberLabelFormatter;
  integersOnly: boolean;
}

export type AnimatedCoordinate = Interpolation<
  number,
  | DOMPoint
  | {
      x: number;
      y: number;
    }
>;
