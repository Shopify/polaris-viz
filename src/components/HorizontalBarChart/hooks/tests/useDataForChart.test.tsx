import React from 'react';
import {mount} from '@shopify/react-testing';

import type {Series} from '../../types';
import {useDataForChart} from '../useDataForChart';

jest.mock('../../../../utilities/get-text-dimensions', () => ({
  getTextWidth: jest.fn(() => 100),
}));

const SERIES: Series[] = [
  {
    name: 'Group 1',
    data: [
      {rawValue: 5, label: 'Label 01'},
      {rawValue: -10, label: 'Label 02'},
      {rawValue: 12, label: 'Label 03'},
    ],
  },
  {
    name: 'Group 2',
    data: [
      {rawValue: 1, label: 'Label 01'},
      {rawValue: -2, label: 'Label 02'},
      {rawValue: 3, label: 'Label 03'},
    ],
  },
];

const MOCK_PROPS = {
  series: SERIES,
  isSimple: false,
  isStacked: false,
  labelFormatter: (value: string | number) => `${value}`,
};

describe('useDataForChart', () => {
  it('returns data', () => {
    function TestComponent() {
      const data = useDataForChart(MOCK_PROPS);

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
      const data = useDataForChart({
        ...MOCK_PROPS,
        series: [
          {
            name: 'Group 1',
            data: [
              {rawValue: -5, label: 'Label 01'},
              {rawValue: -10, label: 'Label 02'},
              {rawValue: -12, label: 'Label 03'},
            ],
          },
          {
            name: 'Group 2',
            data: [
              {rawValue: -1, label: 'Label 01'},
              {rawValue: -2, label: 'Label 02'},
              {rawValue: -3, label: 'Label 03'},
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
      highestPositive: -1,
      longestLabel: {negative: 0, positive: 0},
      lowestNegative: -12,
    });
  });

  describe('longestLabel', () => {
    it('returns longest labels for simple charts', () => {
      function TestComponent() {
        const data = useDataForChart({...MOCK_PROPS, isSimple: true});

        return <span data-data={`${JSON.stringify(data)}`} />;
      }

      const result = mount(<TestComponent />);

      const data = JSON.parse(result.domNode?.dataset.data ?? '');

      expect(data.longestLabel).toStrictEqual({negative: 110, positive: 110});
    });

    it('returns zeros for stacked charts', () => {
      function TestComponent() {
        const data = useDataForChart({...MOCK_PROPS, isStacked: true});

        return <span data-data={`${JSON.stringify(data)}`} />;
      }

      const result = mount(<TestComponent />);

      const data = JSON.parse(result.domNode?.dataset.data ?? '');

      expect(data.longestLabel).toStrictEqual({negative: 0, positive: 0});
    });
  });
});
