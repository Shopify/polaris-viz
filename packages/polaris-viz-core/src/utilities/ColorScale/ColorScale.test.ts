import {HUES} from '../../constants';
import {Hue} from '../../types';

import {ColorScale} from './ColorScale';

describe('ColorScale', () => {
  describe('min', () => {
    it.each([undefined, 5, 10])('returns first color for %s', (min) => {
      const scale = ColorScale({hue: Hue.Blue, min, max: 100});

      expect(scale(0).backgroundColor).toStrictEqual(HUES[Hue.Blue][0]);
    });
  });

  describe('max', () => {
    it.each([undefined, 50, 100])('returns last color for %s', (min) => {
      const scale = ColorScale({hue: Hue.Blue, min, max: 100});

      expect(scale(110).backgroundColor).toStrictEqual(HUES[Hue.Blue][16]);
    });
  });

  it('drops colors if min/max are small', () => {
    const scale = ColorScale({hue: Hue.Blue, min: 0, max: 8});

    expect(scale(0).backgroundColor).toStrictEqual(HUES[Hue.Blue][0]);
    expect(scale(1).backgroundColor).toStrictEqual(HUES[Hue.Blue][2]);
    expect(scale(2).backgroundColor).toStrictEqual(HUES[Hue.Blue][4]);
  });

  it('returns dark textColor for light hues', () => {
    const scale = ColorScale({hue: Hue.Blue, max: 16});

    expect(scale(2).textColor).toStrictEqual('#2e2e36');
    expect(scale(7).textColor).toStrictEqual('#2e2e36');
  });

  it('returns light textColor for light hues', () => {
    const scale = ColorScale({hue: Hue.Blue, max: 16});

    expect(scale(8).textColor).toStrictEqual('rgb(255, 255, 255)');
    expect(scale(11).textColor).toStrictEqual('rgb(255, 255, 255)');
  });
});
