import type React from 'react';

export function isMouseEvent(
  event: React.SyntheticEvent,
): event is React.MouseEvent {
  return event.nativeEvent instanceof MouseEvent;
}
