import {rgbToRgba} from '../rgb-to-rgba';

describe('rgbToRgba', () => {
  it('returns an rgba value', () => {
    const actual = rgbToRgba({rgb: 'rgb(10, 20, 30)', alpha: 0.5});
    expect(actual).toBe('rgba(10, 20, 30, 0.5)');
  });
});
