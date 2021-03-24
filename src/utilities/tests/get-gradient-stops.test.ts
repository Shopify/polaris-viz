import {getGradientStops, GradientPosition} from '../get-gradient-stops';

describe('getGradientStops', () => {
  it('returns the start color of a gradient', () => {
    const actual = getGradientStops('primaryGradient', GradientPosition.Start);

    expect(actual).toBe('#44C0BE');
  });

  it('returns the end color of a gradient', () => {
    const actual = getGradientStops('primaryGradient', GradientPosition.End);

    expect(actual).toBe('rgb(0,161,159)');
  });

  it('returns the same start and end color if provided a non-gradient color', () => {
    const start = getGradientStops('colorPurple', GradientPosition.Start);
    const end = getGradientStops('colorPurple', GradientPosition.End);

    expect(start).toBe('rgb(156, 106, 222)');
    expect(end).toBe('rgb(156, 106, 222)');
  });
});
