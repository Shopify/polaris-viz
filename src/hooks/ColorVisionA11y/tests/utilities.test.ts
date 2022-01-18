import {
  capitalize,
  getDataSetItem,
  getEventName,
  getOpacityStylesForActive,
} from '../utilities';

describe('utilities', () => {
  describe('capitalize()', () => {
    it('capitalizes a string', () => {
      expect(capitalize('hello world')).toStrictEqual('Hello world');
    });
  });

  describe('getDataSetItem()', () => {
    it('returns a single data-set item', () => {
      const dataset = {
        colorVisionEventHello: 'world',
      };

      expect(getDataSetItem(dataset, 'hello')).toStrictEqual('world');
    });
  });

  describe('getEventName()', () => {
    it('returns the event name', () => {
      expect(getEventName('123', 'someType')).toStrictEqual(
        '123:color-vision-event:someType',
      );
    });
  });

  describe('getOpacityStylesForActive()', () => {
    it('returns full opacity when activeIndex is -1', () => {
      expect(
        getOpacityStylesForActive({activeIndex: -1, index: 0}).opacity,
      ).toStrictEqual(1);
    });

    it('returns full opacity when activeIndex and index match', () => {
      expect(
        getOpacityStylesForActive({activeIndex: 1, index: 1}).opacity,
      ).toStrictEqual(1);
    });

    it('returns transition style', () => {
      expect(
        getOpacityStylesForActive({activeIndex: -1, index: 0}),
      ).toStrictEqual({opacity: 1, transition: 'opacity 100ms ease'});
    });

    describe('fadedOpacity', () => {
      it('returns default when no match', () => {
        expect(
          getOpacityStylesForActive({activeIndex: 0, index: 1}).opacity,
        ).toStrictEqual(0.3);
      });

      it('returns fadedOpacity when provided and no match', () => {
        expect(
          getOpacityStylesForActive({
            activeIndex: 0,
            index: 1,
            fadedOpacity: 0,
          }).opacity,
        ).toStrictEqual(0);
      });
    });
  });
});
