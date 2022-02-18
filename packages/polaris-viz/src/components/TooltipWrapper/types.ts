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
  event?: MouseEvent | TouchEvent;
  index?: number;
  eventType?: 'mouse' | 'focus';
}
