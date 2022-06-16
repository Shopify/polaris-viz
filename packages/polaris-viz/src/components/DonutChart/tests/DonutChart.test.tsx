import React from 'react';
import {mount} from '@shopify/react-testing';

import {DonutChart} from '../DonutChart';
import type {DonutChartProps} from '../DonutChart';
import {Arc} from '../components';
import {ComparisonMetric} from '../../ComparisonMetric';

jest.mock('../components', () => ({
  ...jest.requireActual('../components'),
  ComparisonMetric: () => null,
}));

describe('<DonutChart />', () => {
  const mockProps: DonutChartProps = {
    data: [
      {
        name: 'Shopify Payments',
        data: [{key: 'april - march', value: 50000}],
      },
      {
        name: 'Paypal',
        data: [{key: 'april - march', value: 25000}],
      },
      {
        name: 'Other',
        data: [{key: 'april - march', value: 10000}],
      },
      {
        name: 'Amazon Pay',
        data: [{key: 'april - march', value: 4000}],
      },
    ],
    comparisonMetric: {
      metric: '10%',
      trend: 'negative',
      accessibilityLabel: 'trending down 10%',
    },
  };

  // the sum of the values in the data array
  const valueSum = '89000';

  it('renders an SVG element', () => {
    const chart = mount(<DonutChart {...mockProps} />);

    expect(chart).toContainReactComponent('svg');
  });

  it('renders total value', () => {
    const chart = mount(<DonutChart {...mockProps} />);

    expect(chart).toContainReactComponent('p', {
      children: valueSum,
    });
  });

  describe('<ComparisonMetric />', () => {
    it('does not render if comparisonMetric is not provided', () => {
      const chart = mount(
        <DonutChart {...mockProps} comparisonMetric={undefined} />,
      );

      expect(chart).not.toContainReactComponent(ComparisonMetric);
    });

    it('renders if comparisonMetric is provided', () => {
      const chart = mount(<DonutChart {...mockProps} />);

      expect(chart).toContainReactComponent(ComparisonMetric);
    });
  });
});
