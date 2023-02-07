import {mount, Root} from '@shopify/react-testing';

import {useStackedGapsForVerticalChart} from '../useStackedGapsForVerticalChart';

function parseData(result: Root<any>) {
  return JSON.parse(result.domNode?.dataset.data ?? '');
}

const DATA = [
  [
    [0, 3],
    [-7, 0],
    [-7, 0],
  ],
  [
    [3, 7],
    [0, 0],
    [-17, -7],
  ],
  [
    [7, 14],
    [0, 0],
    [-32, -17],
  ],
] as any;

describe('useStackedGapsForVerticalChart()', () => {
  it('returns values', () => {
    function TestComponent() {
      const data = useStackedGapsForVerticalChart({
        stackedValues: DATA,
        labels: ['Monday', 'Tuesday', 'Wednesday'],
      });

      return <span data-data={`${JSON.stringify(data)}`} />;
    }

    const result = mount(<TestComponent />);

    const data = parseData(result);

    expect(data).toStrictEqual({
      '0': {
        negative: [],
        positive: [
          {gap: 0, index: 0},
          {gap: 2, index: 1},
          {gap: 4, index: 2},
        ],
      },
      '1': {
        negative: [{gap: 0, index: 0}],
        positive: [],
      },
      '2': {
        negative: [
          {gap: 0, index: 0},
          {gap: 2, index: 1},
          {gap: 4, index: 2},
        ],
        positive: [],
      },
    });
  });
});
