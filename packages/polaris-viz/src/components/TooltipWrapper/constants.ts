import type {TooltipPosition} from './types';
import {TooltipHorizontalOffset, TooltipVerticalOffset} from './types';

export const DEFAULT_TOOLTIP_POSITION = {
  horizontal: TooltipHorizontalOffset.Center,
  vertical: TooltipVerticalOffset.Above,
};

export const TOOLTIP_POSITION_DEFAULT_RETURN: TooltipPosition = {
  x: 0,
  y: 0,
  position: DEFAULT_TOOLTIP_POSITION,
  activeIndex: null,
};

// The space between the cursor and the tooltip
export const TOOLTIP_MARGIN = 20;
export const SCROLLBAR_WIDTH = 20;
