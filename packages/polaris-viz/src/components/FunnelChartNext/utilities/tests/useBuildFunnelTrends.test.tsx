import type {Root} from '@shopify/react-testing';
import {mount} from '@shopify/react-testing';
import React from 'react';
import type {DataSeries} from '@shopify/polaris-viz-core';

import {useBuildFunnelTrends} from '../useBuildFunnelTrends';

function parseData(result: Root<any>) {
  if (!result.domNode?.dataset.data) {
    return undefined;
  }
  return JSON.parse(result.domNode.dataset.data);
}

describe('useBuildFunnelTrends', () => {
  const mockData: DataSeries[] = [
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
            value: '10.0%',
            trend: 'positive',
            direction: 'upward',
          },
          1: {
            value: '20.0%',
            trend: 'positive',
            direction: 'upward',
          },
          2: {
            value: '50.0%',
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
  ];

  it('returns undefined when primary series is missing', () => {
    function TestComponent() {
      const result = useBuildFunnelTrends([
        {
          name: 'Comparison',
          data: [],
          isComparison: true,
        },
      ]);

      return <span data-data={JSON.stringify(result)} />;
    }

    const component = mount(<TestComponent />);
    const data = parseData(component);

    expect(data).toBeUndefined();
  });

  it('returns undefined when comparison series is missing', () => {
    function TestComponent() {
      const result = useBuildFunnelTrends([
        {
          name: 'Primary',
          data: [],
          isComparison: false,
        },
      ]);

      return <span data-data={JSON.stringify(result)} />;
    }

    const component = mount(<TestComponent />);
    const data = parseData(component);

    expect(data).toBeUndefined();
  });

  it('calculates trends correctly for valid data', () => {
    function TestComponent() {
      const result = useBuildFunnelTrends(mockData);
      return <span data-data={JSON.stringify(result)} />;
    }

    const component = mount(<TestComponent />);
    const data = parseData(component);

    expect(data).toStrictEqual({
      trends: {
        0: {
          reached: {
            value: '10.0%',
            trend: 'positive',
            direction: 'upward',
          },
        },
        1: {
          reached: {
            value: '20.0%',
            trend: 'positive',
            direction: 'upward',
          },
          dropped: {
            value: '50.0%',
            trend: 'positive',
            direction: 'downward',
          },
        },
        2: {
          reached: {
            value: '50.0%',
            trend: 'negative',
            direction: 'downward',
          },
          dropped: {
            value: '0.0%',
            trend: 'neutral',
            direction: 'upward',
          },
        },
      },
    });
  });

  it('does not include dropped trend for the first step', () => {
    function TestComponent() {
      const result = useBuildFunnelTrends(mockData);
      return <span data-data={JSON.stringify(result)} />;
    }

    const component = mount(<TestComponent />);
    const data = parseData(component);

    expect(data.trends[0]).toStrictEqual({
      reached: {
        value: '10.0%',
        trend: 'positive',
        direction: 'upward',
      },
    });
    expect(data.trends[0].dropped).toBeUndefined();
  });
});
