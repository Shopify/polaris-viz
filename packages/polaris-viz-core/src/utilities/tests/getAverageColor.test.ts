import {getAverageColor} from '../getAverageColor';

describe('getAverageColor', () => {
  it('returns average color from 2 different colors', () => {
    const result = getAverageColor('rgb(255, 227, 0)', 'rgb(0, 137, 255)');
    expect(result).toStrictEqual('rgb(128,182,128)');
  });

  it('returns first color if both are the same', () => {
    const result = getAverageColor('red', 'red');
    expect(result).toStrictEqual('red');
  });

  it('returns last color if first value is empty', () => {
    const result = getAverageColor('', 'red');
    expect(result).toStrictEqual('rgb(255, 0, 0)');
  });

  it('returns first color if last value is empty', () => {
    const result = getAverageColor('red', '');
    expect(result).toStrictEqual('rgb(255, 0, 0)');
  });

  it('returns empty string if both values are empty', () => {
    const result = getAverageColor('', '');
    expect(result).toStrictEqual('');
  });

  it('returns empty string is both values are not valid colors', () => {
    const result = getAverageColor('trees', 'cars');
    expect(result).toStrictEqual('');
  });
});
