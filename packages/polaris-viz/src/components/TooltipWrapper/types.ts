import type {
  BoundingRect,
  ChartType,
  DataSeries,
  Dimensions,
} from '@shopify/polaris-viz-core';
import type {ScaleBand, ScaleLinear} from 'd3-scale';

import type {Margin} from '../../types';

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

export interface TooltipPositionOffset {
  horizontal: TooltipHorizontalOffset;
  vertical: TooltipVerticalOffset;
}

export interface TooltipPosition {
  x: number;
  y: number;
  activeIndex: number | null;
  position?: TooltipPositionOffset;
}

export interface TooltipPositionParams {
  chartBounds: Required<BoundingRect>;
  data: DataSeries[];
  eventType: 'mouse' | 'focus';
  longestSeriesIndex: number;
  xScale: ScaleBand<string> | ScaleLinear<number, number>;
  event?: MouseEvent | TouchEvent;
  index?: number;
  type?: ChartType;
  yScale?: ScaleLinear<number, number>;
}

export interface AlteredPositionProps {
  bandwidth: number;
  chartBounds: BoundingRect;
  currentX: number;
  currentY: number;
  containerBounds: BoundingRect;
  isPerformanceImpacted: boolean;
  isTouchDevice: boolean;
  margin: Margin;
  position: TooltipPositionOffset;
  tooltipDimensions: Dimensions;
  scrollContainer?: Element | null;
}

export interface AlteredPositionReturn {
  x: number;
  y: number;
}

export type AlteredPosition = (
  props: AlteredPositionProps,
) => AlteredPositionReturn;
