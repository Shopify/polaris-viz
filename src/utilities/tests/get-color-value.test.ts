import {getColorValue} from '../get-color-value';

describe('getColorValue', () => {
  it('returns Polaris tokens colors', () => {
    const actual = getColorValue('colorPurple');
    expect(actual).toBe('rgb(156, 106, 222)');
  });

  it('returns viz colors', () => {
    const actual = getColorValue('primary');
    expect(actual).toBe('rgb(0,161,159)');
  });

  it('returns gradient colors', () => {
    const actual = getColorValue('primaryGradient');
    expect(actual).toBe(
      'linear-gradient(180deg, rgb(0,161,159) 0%, rgb(0,161,159) 100%), rgb(0,161,159)',
    );
  });

  it('throws an error for other colors', () => {
    expect(() => {
      getColorValue('red' as any);
    }).toThrow('Color value is not valid.');
  });
});
