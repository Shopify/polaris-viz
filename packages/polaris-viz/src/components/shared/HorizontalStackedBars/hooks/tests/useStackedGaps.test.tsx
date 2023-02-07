import type {Root} from '@shopify/react-testing';
import {mount} from '@shopify/react-testing';

import {useStackedGaps} from '../useStackedGaps';

function parseData(result: Root<any>) {
  return JSON.parse(result.domNode?.dataset.data ?? '');
}

const DATA = [
  [
    [0, 3],
    [3, 7],
    [7, 14],
  ],
  [
    [-7, 0],
    [0, 3],
    [3, 7],
  ],
  [
    [-7, 0],
    [-17, -7],
    [-32, -17],
  ],
] as any;

const ALL_POSITIVE_RESULT = {
  negative: [],
  positive: [
    {index: 0, gap: 0},
    {index: 1, gap: 2},
    {index: 2, gap: 4},
  ],
};

const MIXED_RESULTS = {
  positive: [
    {index: 1, gap: 0},
    {index: 2, gap: 2},
  ],
  negative: [{index: 0, gap: 2}],
};

const ALL_NEGATIVE_RESULTS = {
  negative: [
    {index: 0, gap: 2},
    {index: 1, gap: 4},
    {index: 2, gap: 6},
  ],
  positive: [],
};

describe('useStackedGaps()', () => {
  it.each([
    ['all positive', 0, ALL_POSITIVE_RESULT],
    ['positive & negative', 1, MIXED_RESULTS],
    ['all negative', 2, ALL_NEGATIVE_RESULTS],
  ])('returns values for %s', (_, groupIndex, expected) => {
    function TestComponent() {
      const data = useStackedGaps({
        stackedValues: DATA,
        groupIndex,
      });

      return <span data-data={`${JSON.stringify(data)}`} />;
    }

    const result = mount(<TestComponent />);

    const data = parseData(result);

    expect(data).toStrictEqual(expected);
  });
});
