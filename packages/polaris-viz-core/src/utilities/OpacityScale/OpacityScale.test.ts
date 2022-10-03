import {Hue} from '../../types';

import {OpacityScale} from './OpacityScale';
import {HUE_OPACITIES} from './constants';

describe('OpacityScale', () => {
  describe('HUE_OPACITIES', () => {
    it('has 7 hues', () => {
      expect(Object.values(HUE_OPACITIES)).toHaveLength(7);
    });

    it.each(Object.keys(HUE_OPACITIES))('%s has 10 steps', (key) => {
      expect(HUE_OPACITIES[key]).toHaveLength(10);
    });
  });

  it('returns color with opacity applied', () => {
    const scale = OpacityScale({hue: Hue.Blue});

    expect(scale(2).backgroundColor).toStrictEqual('rgba(75, 146, 229, 0.3)');
    expect(scale(7).backgroundColor).toStrictEqual('rgba(75, 146, 229, 0.8)');
  });

  it('returns #1f1f25 for textColor', () => {
    const scale = OpacityScale({hue: Hue.Blue, max: 16});

    expect(scale(2).textColor).toStrictEqual('#1f1f25');
    expect(scale(7).textColor).toStrictEqual('#1f1f25');
  });
});
