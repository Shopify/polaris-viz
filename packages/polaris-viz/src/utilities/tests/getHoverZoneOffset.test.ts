import type {Props} from '../getHoverZoneOffset';
import {getHoverZoneOffset} from '../getHoverZoneOffset';

const mockProps: Props = {
  barSize: 15,
  zeroPosition: 0,
  max: 100,
  position: 'vertical',
  isNegative: false,
};

const mockPropsHorizontal: Props = {
  barSize: 20,
  zeroPosition: 0,
  max: 125,
  position: 'horizontal',
  isNegative: true,
};

describe('getHoverZoneOffset', () => {
  it('returns clampedSize and offset for a vertical bar', () => {
    const verticalBar = getHoverZoneOffset({...mockProps});
    expect(verticalBar).toStrictEqual({clampedSize: 15, offset: -15});
  });

  it('returns clampedSize and offset for a horizontal bar', () => {
    const horizontalBar = getHoverZoneOffset({...mockPropsHorizontal});
    expect(horizontalBar).toStrictEqual({clampedSize: 68, offset: 48});
  });
});
