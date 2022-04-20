import type {SyntheticEvent} from 'react';

import {isTouchEvent} from '../isTouchEvent';

describe('isTouchEvent', () => {
  it('returns true for touch events', () => {
    const event = {
      nativeEvent: new TouchEvent('touchend'),
    } as unknown as SyntheticEvent;

    expect(isTouchEvent(event)).toBe(true);
  });

  it('returns false for non-touch events', () => {
    const event = {
      nativeEvent: new MouseEvent('click'),
    } as unknown as SyntheticEvent;

    expect(isTouchEvent(event)).toBe(false);
  });
});
