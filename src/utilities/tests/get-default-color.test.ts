import {getDefaultColor} from '../get-default-color';

describe('getDefaultColor()', () => {
  it('returns a default color when there is no index provided', () => {
    expect(getDefaultColor()).toStrictEqual('primary');
  });

  it('returns a default color when there is an index provided', () => {
    expect(getDefaultColor(0)).toStrictEqual('primary');
    expect(getDefaultColor(1)).toStrictEqual('secondary');
    expect(getDefaultColor(2)).toStrictEqual('tertiary');
    expect(getDefaultColor(3)).toStrictEqual('quaternary');
  });

  it('warns if the index provided is greater than the number of default colors', () => {
    const consoleSpy = jest.spyOn(console, 'warn');
    const environment = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    expect(getDefaultColor(4)).toStrictEqual('primary');
    expect(consoleSpy).toHaveBeenCalledWith(
      'There are too many series to rely on default color values. Please pass a color value for every series',
    );

    process.env.NODE_ENV = environment;
  });
});
