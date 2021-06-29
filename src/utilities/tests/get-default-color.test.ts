import {getDefaultColor} from '../get-default-color';
import {
  QUARTERNARY_COLOR,
  TERTIARY_COLOR,
  SECONDARY_COLOR,
  PRIMARY_COLOR,
} from '../../constants';

describe('getDefaultColor()', () => {
  it('returns a default color when there is no index provided', () => {
    expect(getDefaultColor()).toStrictEqual(PRIMARY_COLOR);
  });

  it('returns a default color when there is an index provided', () => {
    expect(getDefaultColor(0)).toStrictEqual(PRIMARY_COLOR);
    expect(getDefaultColor(1)).toStrictEqual(SECONDARY_COLOR);
    expect(getDefaultColor(2)).toStrictEqual(TERTIARY_COLOR);
    expect(getDefaultColor(3)).toStrictEqual(QUARTERNARY_COLOR);
  });

  it('warns if the index provided is greater than the number of default colors', () => {
    const consoleSpy = jest.spyOn(console, 'warn');
    const environment = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    expect(getDefaultColor(4)).toStrictEqual(PRIMARY_COLOR);
    expect(consoleSpy).toHaveBeenCalledWith(
      'There are too many series to rely on default color values. Please pass a color value for every series',
    );

    process.env.NODE_ENV = environment;
  });
});
