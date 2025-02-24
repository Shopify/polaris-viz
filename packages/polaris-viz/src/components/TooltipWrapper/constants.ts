import {InternalChartType} from '@shopify/polaris-viz-core';

import type {TooltipPosition} from './types';
import {TooltipHorizontalOffset, TooltipVerticalOffset} from './types';

export const DEFAULT_TOOLTIP_POSITION = {
  horizontal: TooltipHorizontalOffset.Center,
  vertical: TooltipVerticalOffset.Above,
};

export const TOOLTIP_POSITION_DEFAULT_RETURN: TooltipPosition = {
  x: 0,
  y: 0,
  activeIndex: null,
  seriesBounds: null,
};

// The space between the cursor and the tooltip
export const TOOLTIP_MARGIN = 20;
export const SCROLLBAR_WIDTH = 20;

export const ALWAYS_UPDATE_TOOLTIP_POSITION_CHART_TYPES: InternalChartType[] = [
  InternalChartType.Line,
  InternalChartType.Donut,
];
