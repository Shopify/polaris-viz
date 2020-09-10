import {getColorValue} from '../get-color-value';

describe('getColorValue', () => {
  it('returns Polaris tokens colors', () => {
    const actual = getColorValue('colorPurple');
    expect(actual).toBe('rgb(156, 106, 222)');
  });

  it('returns viz colors', () => {
    const actual = getColorValue('primary');
    expect(actual).toBe('#00A19F');
  });

  it('throws an error for other colors', () => {
    expect(() => {
      getColorValue('red' as any);
    }).toThrow('Color value is not valid.');
  });
});
