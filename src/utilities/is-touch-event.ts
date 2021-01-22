import type React from 'react';

export function isTouchEvent(
  event: React.SyntheticEvent,
): event is React.TouchEvent {
  return event.nativeEvent instanceof TouchEvent;
}
