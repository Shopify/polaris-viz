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

  it('throws an error if the index provided is greater than the number of default colors', () => {
    expect(() => getDefaultColor(4)).toThrow(
      'There are too many series to rely on default color values. Please pass a color value for every series',
    );
  });
});
