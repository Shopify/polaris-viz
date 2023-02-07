import {mount, Root} from '@shopify/react-testing';

import {useReducedLabelIndexes, Props} from '../useReducedLabelIndexes';

describe('useReducedLabelIndexes', () => {
  function TestComponent(props: Props) {
    const reducedLabelIndexes = useReducedLabelIndexes(props);
    return <div>{JSON.stringify(reducedLabelIndexes)}</div>;
  }

  function parseResult(mockComponent: Root<any>) {
    return JSON.parse(mockComponent.text());
  }

  it('returns array with even indexes', () => {
    const mockComponent = mount(
      <TestComponent dataLength={10} skipEveryNthLabel={2} />,
    );

    expect(parseResult(mockComponent)).toStrictEqual([0, 2, 4, 6, 8]);
  });

  it('returns array with each 5th label skipped', () => {
    const mockComponent = mount(
      <TestComponent dataLength={20} skipEveryNthLabel={5} />,
    );

    expect(parseResult(mockComponent)).toStrictEqual([0, 5, 10, 15]);
  });

  describe('skipEveryNthLabel', () => {
    it('returns empty array when skipEveryNthLabel is 1', () => {
      const mockComponent = mount(
        <TestComponent dataLength={10} skipEveryNthLabel={1} />,
      );

      expect(parseResult(mockComponent)).toStrictEqual([]);
    });
  });

  describe('dataLength', () => {
    it('returns empty array when dataLength is 0', () => {
      const mockComponent = mount(
        <TestComponent dataLength={0} skipEveryNthLabel={2} />,
      );

      expect(parseResult(mockComponent)).toStrictEqual([]);
    });
  });
});
