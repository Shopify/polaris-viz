import {mount, Root} from '@shopify/react-testing';
import type {DataSeries} from '@shopify/polaris-viz-core';

import {useHorizontalStackedValues} from '../useHorizontalStackedValues';

function parseData(result: Root<any>) {
  return JSON.parse(result.domNode?.dataset.data ?? '');
}

const DATA: DataSeries[] = [
  {
    name: 'Breakfast',
    data: [
      {key: 'Monday', value: 3},
      {key: 'Tuesday', value: -7},
      {key: 'Wednesday', value: -7},
    ],
  },
  {
    name: 'Lunch',
    data: [
      {key: 'Monday', value: 4},
      {key: 'Tuesday', value: 0},
      {key: 'Wednesday', value: -10},
    ],
  },
  {
    name: 'Dinner',
    data: [
      {key: 'Monday', value: 7},
      {key: 'Tuesday', value: 0},
      {key: 'Wednesday', value: -15},
    ],
  },
];

describe('useHorizontalStackedValues()', () => {
  it('returns data when data is empty', () => {
    function TestComponent() {
      const data = useHorizontalStackedValues({
        data: [],
        isStacked: true,
      });

      return <span data-data={`${JSON.stringify(data)}`} />;
    }

    const result = mount(<TestComponent />);

    const data = parseData(result);

    expect(data).toStrictEqual({
      stackedValues: [],
      stackedMin: 0,
      stackedMax: 0,
    });
  });

  describe('isStacked', () => {
    it('returns data when true', () => {
      function TestComponent() {
        const data = useHorizontalStackedValues({
          data: DATA,
          isStacked: true,
        });

        return <span data-data={`${JSON.stringify(data)}`} />;
      }

      const result = mount(<TestComponent />);

      const data = parseData(result);

      expect(data).toStrictEqual({
        stackedValues: [
          [
            [0, 3],
            [3, 7],
            [7, 14],
          ],
          [
            [-7, 0],
            [0, 0],
            [0, 0],
          ],
          [
            [-7, 0],
            [-17, -7],
            [-32, -17],
          ],
        ],
        stackedMin: -32,
        stackedMax: 14,
      });
    });

    it('returns data when false', () => {
      function TestComponent() {
        const data = useHorizontalStackedValues({
          data: [],
          isStacked: true,
        });

        return <span data-data={`${JSON.stringify(data)}`} />;
      }

      const result = mount(<TestComponent />);

      const data = parseData(result);

      expect(data).toStrictEqual({
        stackedValues: [],
        stackedMin: 0,
        stackedMax: 0,
      });
    });
  });
});
