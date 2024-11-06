import {FONT_SIZE, TOUCH_FONT_SIZE} from '@shopify/polaris-viz-core';

import {getFontSize} from '../getFontSize';

const originalWindow = {...window};

describe('getFontSize()', () => {
  afterEach(() => {
    // eslint-disable-next-line no-global-assign
    window = {...originalWindow};
  });

  it('returns default font size', () => {
    expect(getFontSize()).toStrictEqual(FONT_SIZE);
  });

  it('returns mobile font size when ontouchstart is in window', () => {
    Object.defineProperty(window, 'ontouchstart', {
      value: () => {},
    });

    expect(getFontSize()).toStrictEqual(TOUCH_FONT_SIZE);
  });

  it('returns mobile font size when maxTouchPoints is greater than 0', () => {
    Object.defineProperty(navigator, 'maxTouchPoints', {
      value: 1,
    });

    expect(getFontSize()).toStrictEqual(TOUCH_FONT_SIZE);
  });
});
