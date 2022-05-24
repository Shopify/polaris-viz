import type {Interpolation, InterpolatorFn} from '@react-spring/web';
import type {
  Color,
  DataPoint,
  DataSeries,
  Shape,
} from '@shopify/polaris-viz-core';
import type {Series, SeriesPoint} from 'd3-shape';

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

export type AnimatedCoordinate = Interpolation<
  number,
  | DOMPoint
  | {
      x: number;
      y: number;
    }
>;

export interface RenderTooltipDataPoint extends DataPoint {
  color?: Color;
  isComparison?: boolean;
}

export interface RenderTooltipContentData {
  data: {
    shape: Shape;
    data: RenderTooltipDataPoint[];
    name?: string;
  }[];
  activeIndex: number;
  dataSeries: DataSeries[];
  title?: string;
}

export interface TooltipData {
  shape: Shape;
  data: {
    key: string;
    value: string;
    color?: Color;
    isComparison?: boolean;
  }[];
  name?: string;
}

export interface TooltipAnnotation {
  key: string;
  value: string;
}

export interface MetricWithTrend {
  metric: string;
  trend: 'positive' | 'negative' | 'neutral';
  accessibilityLabel: string;
}
