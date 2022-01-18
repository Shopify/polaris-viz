import {capitalize, getDataSetItem, getEventName} from '../utilities';

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
});
