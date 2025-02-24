import type {
  BoundingRect,
  ChartType,
  DataSeries,
} from '@shopify/polaris-viz-core';
import type {ScaleBand, ScaleLinear} from 'd3-scale';

export enum TooltipHorizontalOffset {
  Left,
  Right,
  Center,
}

export enum TooltipVerticalOffset {
  Above,
  Below,
  Inline,
  Center,
}

export interface TooltipPosition {
  x: number;
  y: number;
  activeIndex: number | null;
  seriesBounds: BoundingRect | null;
}

export interface TooltipPositionParams {
  chartBounds: Required<BoundingRect>;
  data: DataSeries[];
  eventType: 'mouse' | 'focus';
  longestSeriesIndex: number;
  xScale: ScaleBand<string> | ScaleLinear<number, number>;
  event?: MouseEvent | TouchEvent | FocusEvent;
  index?: number;
  type?: ChartType;
  yScale?: ScaleLinear<number, number>;
}
