import {getCSSBackgroundFromColor} from '../getCSSBackgroundFromColor';

describe('getCSSBackgroundFromColor', () => {
  it('returns solid color', () => {
    expect(getCSSBackgroundFromColor('red')).toStrictEqual('red');
  });

  it('returns css gradient', () => {
    expect(
      getCSSBackgroundFromColor([
        {color: 'red', offset: 0},
        {color: 'green', offset: 100},
      ]),
    ).toStrictEqual('linear-gradient(90deg, red 0%,green 100%)');
  });

  it('uses provided angle', () => {
    expect(
      getCSSBackgroundFromColor(
        [
          {color: 'red', offset: 0},
          {color: 'green', offset: 100},
        ],
        180,
      ),
    ).toStrictEqual('linear-gradient(180deg, red 0%,green 100%)');
  });
});
