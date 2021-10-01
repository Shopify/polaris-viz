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
  position: TooltipPositionOffset;
  activeIndex: number | null;
}

export interface TooltipPositionParams {
  event?: MouseEvent | TouchEvent;
  index?: number;
  eventType?: 'mouse' | 'focus';
}
