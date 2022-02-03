import {
  capitalize,
  getDataSetItem,
  getEventName,
  getOpacityForActive,
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
        colorBlindEventHello: 'world',
      };

      expect(getDataSetItem(dataset, 'hello')).toStrictEqual('world');
    });
  });

  describe('getEventName()', () => {
    it('returns the event name', () => {
      expect(getEventName('123', 'someType')).toStrictEqual(
        '123:color-blind-event:someType',
      );
    });
  });

  describe('getOpacityForActive()', () => {
    it('returns full opacity when activeIndex is -1', () => {
      expect(getOpacityForActive({activeIndex: -1, index: 0})).toStrictEqual(1);
    });

    it('returns full opacity when activeIndex and index match', () => {
      expect(getOpacityForActive({activeIndex: 1, index: 1})).toStrictEqual(1);
    });

    describe('fadedOpacity', () => {
      it('returns default when no match', () => {
        expect(getOpacityForActive({activeIndex: 0, index: 1})).toStrictEqual(
          0.3,
        );
      });

      it('returns fadedOpacity when provided and no match', () => {
        expect(
          getOpacityForActive({activeIndex: 0, index: 1, fadedOpacity: 0}),
        ).toStrictEqual(0);
      });
    });
  });
});
