import type {Root} from '@shopify/react-testing';
import {mount} from '@shopify/react-testing';
import React from 'react';

import {useBuildFunnelTrends} from '../useBuildFunnelTrends';
import type {UseBuildFunnelTrendsProps} from '../useBuildFunnelTrends';

function parseData(result: Root<any>) {
  if (!result.domNode?.dataset.data) {
    return undefined;
  }
  return JSON.parse(result.domNode.dataset.data);
}

describe('useBuildFunnelTrends', () => {
  const mockProps: UseBuildFunnelTrendsProps = {
    data: [
      {
        name: 'Primary',
        data: [
          {value: 1000, key: '0'},
          {value: 800, key: '1'},
          {value: 400, key: '2'},
        ],
        isComparison: false,
        metadata: {
          trends: {
            0: {
              value: '10%',
              trend: 'positive',
              direction: 'upward',
            },
            1: {
              value: '20%',
              trend: 'positive',
              direction: 'upward',
            },
            2: {
              value: '50%',
              trend: 'negative',
              direction: 'downward',
            },
          },
        },
      },
      {
        name: 'Comparison',
        data: [
          {value: 900, key: '0'},
          {value: 600, key: '1'},
          {value: 200, key: '2'},
        ],
        isComparison: true,
      },
    ],
    percentageFormatter: (value) => `${value}%`,
  };

  it('returns undefined when primary series is missing', () => {
    function TestComponent() {
      const result = useBuildFunnelTrends({
        ...mockProps,
        data: [
          {
            name: 'Comparison',
            data: [],
            isComparison: true,
          },
        ],
      });

      return <span data-data={JSON.stringify(result)} />;
    }

    const component = mount(<TestComponent />);
    const data = parseData(component);

    expect(data).toBeUndefined();
  });

  it('returns undefined when comparison series is missing', () => {
    function TestComponent() {
      const result = useBuildFunnelTrends({
        ...mockProps,
        data: [
          {
            name: 'Primary',
            data: [],
            isComparison: false,
          },
        ],
      });

      return <span data-data={JSON.stringify(result)} />;
    }

    const component = mount(<TestComponent />);
    const data = parseData(component);

    expect(data).toBeUndefined();
  });

  it('calculates trends correctly for valid data', () => {
    function TestComponent() {
      const result = useBuildFunnelTrends(mockProps);
      return <span data-data={JSON.stringify(result)} />;
    }

    const component = mount(<TestComponent />);
    const data = parseData(component);

    expect(data).toStrictEqual({
      trends: {
        0: {
          reached: {
            value: '10%',
            trend: 'positive',
            direction: 'upward',
          },
        },
        1: {
          reached: {
            value: '20%',
            trend: 'positive',
            direction: 'upward',
          },
          dropped: {
            value: '50%',
            trend: 'positive',
            direction: 'downward',
          },
        },
        2: {
          reached: {
            value: '50%',
            trend: 'negative',
            direction: 'downward',
          },
          dropped: {
            value: '0%',
            trend: 'neutral',
            direction: 'upward',
          },
        },
      },
    });
  });

  it('does not include dropped trend for the first step', () => {
    function TestComponent() {
      const result = useBuildFunnelTrends(mockProps);
      return <span data-data={JSON.stringify(result)} />;
    }

    const component = mount(<TestComponent />);
    const data = parseData(component);

    expect(data.trends[0]).toStrictEqual({
      reached: {
        value: '10%',
        trend: 'positive',
        direction: 'upward',
      },
    });
    expect(data.trends[0].dropped).toBeUndefined();
  });

  describe('null value handling', () => {
    it('handles null values in data series', () => {
      function TestComponent() {
        const result = useBuildFunnelTrends({
          ...mockProps,
          data: [
            {
              name: 'Primary',
              data: [
                {value: 1000, key: '0'},
                {value: null, key: '1'},
                {value: 400, key: '2'},
              ],
              isComparison: false,
              metadata: {
                trends: mockProps.data[0].metadata!.trends,
              },
            },
            {
              name: 'Comparison',
              data: [
                {value: 900, key: '0'},
                {value: null, key: '1'},
                {value: 200, key: '2'},
              ],
              isComparison: true,
            },
          ],
        });
        return <span data-data={JSON.stringify(result)} />;
      }

      const component = mount(<TestComponent />);
      const data = parseData(component);

      expect(data.trends[1].dropped).toStrictEqual({
        value: null,
      });
    });
  });
});
