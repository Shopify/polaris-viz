import type {SyntheticEvent} from 'react';

import {isMouseEvent} from '../isMouseEvent';

describe('isMouseEvent', () => {
  it('returns true for mouse events', () => {
    const event = {
      nativeEvent: new MouseEvent('click'),
    } as unknown as SyntheticEvent;

    expect(isMouseEvent(event)).toBe(true);
  });

  it('returns false for non-mouse events', () => {
    const event = {
      nativeEvent: new TouchEvent('touchend'),
    } as unknown as SyntheticEvent;

    expect(isMouseEvent(event)).toBe(false);
  });
});
