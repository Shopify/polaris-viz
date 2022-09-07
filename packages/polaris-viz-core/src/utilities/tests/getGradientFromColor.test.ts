import {getGradientFromColor} from '../';

describe('getGradientFromColor()', () => {
  it('returns a gradient when gradient is provided', () => {
    const gradient = getGradientFromColor([
      {color: 'red', offset: 0},
      {color: 'green', offset: 100},
    ]);

    expect(gradient).toStrictEqual([
      {color: 'red', offset: 0},
      {color: 'green', offset: 100},
    ]);
  });

  it('returns a gradient when a string is provided', () => {
    const gradient = getGradientFromColor('red');

    expect(gradient).toStrictEqual([
      {color: 'red', offset: 0},
      {color: 'red', offset: 1},
    ]);
  });
});
