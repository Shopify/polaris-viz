import {getColorVisionStylesForActiveIndex} from '../getColorVisionStylesForActiveIndex';

describe('getColorVisionStylesForActiveIndex', () => {
  it('returns full opacity when activeIndex is -1', () => {
    expect(
      getColorVisionStylesForActiveIndex({activeIndex: -1, index: 0}).opacity,
    ).toStrictEqual(1);
  });

  it('returns full opacity when activeIndex and index match', () => {
    expect(
      getColorVisionStylesForActiveIndex({activeIndex: 1, index: 1}).opacity,
    ).toStrictEqual(1);
  });

  it('returns transition style', () => {
    expect(
      getColorVisionStylesForActiveIndex({activeIndex: -1, index: 0}),
    ).toStrictEqual({opacity: 1, transition: 'opacity 100ms ease'});
  });

  describe('fadedOpacity', () => {
    it('returns default when no match', () => {
      expect(
        getColorVisionStylesForActiveIndex({activeIndex: 0, index: 1}).opacity,
      ).toStrictEqual(0.3);
    });

    it('returns fadedOpacity when provided and no match', () => {
      expect(
        getColorVisionStylesForActiveIndex({
          activeIndex: 0,
          index: 1,
          fadedOpacity: 0,
        }).opacity,
      ).toStrictEqual(0);
    });
  });
});
