import {request} from 'https';

import React from 'react';
import {mount} from '@shopify/react-testing';

import {Chart as DonutChart} from '../Chart';
import type {ChartProps} from '../Chart';
import {Arc, InnerValue} from '../components';
import {ComparisonMetric} from '../../ComparisonMetric';

jest.mock('../components', () => ({
  ...jest.requireActual('../components'),
  ComparisonMetric: () => null,
}));

jest.mock('@shopify/polaris-viz-core/src/utilities', () => ({
  ...jest.requireActual('@shopify/polaris-viz-core/src/utilities'),
  changeColorOpacity: jest.fn(() => 'black'),
}));

describe('<DonutChart />', () => {
  describe('<Chart/>', () => {
    const mockProps: ChartProps = {
      isAnimated: false,
      showLegend: true,
      theme: `Default`,
      labelFormatter: (value) => `${value}`,
      dimensions: {width: 500, height: 500},
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
    const valueSum = 89000;

    it('renders an SVG element', () => {
      const chart = mount(<DonutChart {...mockProps} />);
      chart.act(() => {
        requestAnimationFrame(() => {
          expect(chart).toContainReactComponent('svg');
        });
      });
    });

    it('renders total value', () => {
      const chart = mount(<DonutChart {...mockProps} />);

      chart.act(() => {
        requestAnimationFrame(() => {
          expect(chart).toContainReactComponent(InnerValue, {
            totalValue: valueSum,
          });
        });
      });
    });

    describe('<ComparisonMetric />', () => {
      it('does not render if comparisonMetric is not provided', () => {
        const chart = mount(
          <DonutChart {...mockProps} comparisonMetric={undefined} />,
        );

        chart.act(() => {
          requestAnimationFrame(() => {
            expect(chart).not.toContainReactComponent(ComparisonMetric);
          });
        });
      });

      it('renders if comparisonMetric is provided', () => {
        const chart = mount(<DonutChart {...mockProps} />);

        chart.act(() => {
          requestAnimationFrame(() => {
            expect(chart).toContainReactComponent(
              ComparisonMetric,
              mockProps.comparisonMetric,
            );
          });
        });
      });
    });

    describe('empty state', () => {
      it('renders single <Arc /> when true', () => {
        const chart = mount(<DonutChart {...mockProps} data={[]} />);
        chart.act(() => {
          requestAnimationFrame(() => {
            expect(chart).toContainReactComponentTimes(Arc, 1);
          });
        });
      });

      it('renders multiple <Arc /> when false', () => {
        const chart = mount(<DonutChart {...mockProps} />);
        chart.act(() => {
          requestAnimationFrame(() => {
            expect(chart).toContainReactComponentTimes(Arc, 4);
          });
        });
      });
    });
  });
});
