import {mount} from '@shopify/react-testing';
import type {DataSeries} from '@shopify/polaris-viz-core';

import {useDataForHorizontalChart} from '../useDataForHorizontalChart';

jest.mock('@shopify/polaris-viz-core/src/utilities', () => {
  return {
    ...jest.requireActual('@shopify/polaris-viz-core/src/utilities'),
    estimateStringWidth: jest.fn(() => 100),
  };
});

const DATA: DataSeries[] = [
  {
    name: 'Group 1',
    data: [
      {value: 5, key: 'Label 01'},
      {value: -10, key: 'Label 02'},
      {value: 12, key: 'Label 03'},
    ],
  },
  {
    name: 'Group 2',
    data: [
      {value: 1, key: 'Label 01'},
      {value: -2, key: 'Label 02'},
      {value: 3, key: 'Label 03'},
    ],
  },
];

const MOCK_PROPS = {
  data: DATA,
  isSimple: false,
  isStacked: false,
  labelFormatter: (value: string | number) => `${value}`,
};

describe('useDataForHorizontalChart()', () => {
  it('returns data', () => {
    function TestComponent() {
      const data = useDataForHorizontalChart(MOCK_PROPS);

      return <span data-data={`${JSON.stringify(data)}`} />;
    }

    const result = mount(<TestComponent />);

    const data = JSON.parse(result.domNode?.dataset.data ?? '');

    expect(data).toStrictEqual({
      allNumbers: [5, -10, 12, 1, -2, 3],
      areAllNegative: false,
      highestPositive: 12,
      longestLabel: {negative: 0, positive: 0},
      lowestNegative: -10,
    });
  });

  it('returns data for all negative values', () => {
    function TestComponent() {
      const data = useDataForHorizontalChart({
        ...MOCK_PROPS,
        data: [
          {
            name: 'Group 1',
            data: [
              {value: -5, key: 'Label 01'},
              {value: -10, key: 'Label 02'},
              {value: -12, key: 'Label 03'},
            ],
          },
          {
            name: 'Group 2',
            data: [
              {value: -1, key: 'Label 01'},
              {value: -2, key: 'Label 02'},
              {value: -3, key: 'Label 03'},
            ],
          },
        ],
      });

      return <span data-data={`${JSON.stringify(data)}`} />;
    }

    const result = mount(<TestComponent />);

    const data = JSON.parse(result.domNode?.dataset.data ?? '');

    expect(data).toStrictEqual({
      allNumbers: [-5, -10, -12, -1, -2, -3],
      areAllNegative: true,
      highestPositive: 0,
      longestLabel: {negative: 0, positive: 0},
      lowestNegative: -12,
    });
  });

  describe('longestLabel', () => {
    it('returns longest labels for simple charts', () => {
      function TestComponent() {
        const data = useDataForHorizontalChart({...MOCK_PROPS, isSimple: true});

        return <span data-data={`${JSON.stringify(data)}`} />;
      }

      const result = mount(<TestComponent />);

      const data = JSON.parse(result.domNode?.dataset.data ?? '');

      expect(data.longestLabel).toStrictEqual({negative: 110, positive: 110});
    });

    it('returns zeros for stacked charts', () => {
      function TestComponent() {
        const data = useDataForHorizontalChart({
          ...MOCK_PROPS,
          isStacked: true,
        });

        return <span data-data={`${JSON.stringify(data)}`} />;
      }

      const result = mount(<TestComponent />);

      const data = JSON.parse(result.domNode?.dataset.data ?? '');

      expect(data.longestLabel).toStrictEqual({negative: 0, positive: 0});
    });
  });

  it('allNumbers will not filter out values of 0', () => {
    function TestComponent() {
      const data = useDataForHorizontalChart({
        ...MOCK_PROPS,
        data: [
          {
            name: 'Group 1',
            data: [
              {value: 0, key: 'Label 01'},
              {value: 0, key: 'Label 02'},
              {value: 0, key: 'Label 03'},
            ],
          },
        ],
      });

      return <span data-data={`${JSON.stringify(data)}`} />;
    }

    const result = mount(<TestComponent />);

    const data = JSON.parse(result.domNode?.dataset.data ?? '');

    expect(data.allNumbers).toStrictEqual([0, 0, 0]);
  });

  it('areAllNegative returns true when all numbers are 0', () => {
    function TestComponent() {
      const data = useDataForHorizontalChart({
        ...MOCK_PROPS,
        data: [
          {
            name: 'Group 1',
            data: [
              {value: 0, key: 'Label 01'},
              {value: 0, key: 'Label 02'},
              {value: 0, key: 'Label 03'},
            ],
          },
        ],
      });

      return <span data-data={`${JSON.stringify(data)}`} />;
    }

    const result = mount(<TestComponent />);

    const data = JSON.parse(result.domNode?.dataset.data ?? '');

    expect(data.areAllNegative).toStrictEqual(true);
  });
});
