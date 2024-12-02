import {mount} from '@shopify/react-testing';
import {
  ChartState,
  THIN_ARC_CORNER_THICKNESS,
  useChartContext,
} from '@shopify/polaris-viz-core';

import {DonutChart} from '../DonutChart';
import type {ChartProps} from '../Chart';
import {InnerValue} from '../components';
import {ComparisonMetric} from '../../ComparisonMetric';
import {LegendContainer} from '../../LegendContainer';
import {Arc} from '../../Arc';

jest.mock('../components', () => ({
  ...jest.requireActual('../components'),
  ComparisonMetric: () => null,
}));

jest.mock('@shopify/polaris-viz-core/src/utilities', () => ({
  ...jest.requireActual('@shopify/polaris-viz-core/src/utilities'),
  changeColorOpacity: jest.fn(() => 'black'),
}));

const mockUseChartContext = useChartContext as jest.Mock;

describe('<DonutChart />', () => {
  describe('<Chart/>', () => {
    const mockProps: ChartProps = {
      showLegend: true,
      theme: `Light`,
      labelFormatter: (value) => `${value}`,
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
      seriesNameFormatter: (value) => `${value}`,
      legendPosition: 'left',
      showLegendValues: true,
      state: ChartState.Success,
    };

    // the sum of the values in the data array
    const valueSum = 89000;

    it('renders an SVG element', () => {
      const chart = mount(<DonutChart {...mockProps} />);

      expect(chart).toContainReactComponent('svg');
    });

    it('renders total value', () => {
      const chart = mount(<DonutChart {...mockProps} />);

      expect(chart).toContainReactComponent(InnerValue, {
        totalValue: valueSum,
      });
    });

    it('renders a thinner <Arc /> when container height is small', () => {
      mockUseChartContext.mockReturnValue({
        ...mockUseChartContext(),
        containerBounds: {
          width: 600,
          height: 100,
        },
      });

      const chart = mount(<DonutChart {...mockProps} />);

      expect(chart).toContainReactComponent(Arc, {
        thickness: THIN_ARC_CORNER_THICKNESS,
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

        expect(chart).toContainReactComponent(
          ComparisonMetric,
          mockProps.comparisonMetric,
        );
      });
    });

    describe('<LegendContainer />', () => {
      it('does not render if showLegend is false', () => {
        const chart = mount(<DonutChart {...mockProps} showLegend={false} />);

        expect(chart).not.toContainReactComponent(LegendContainer);
      });

      it('renders with renderLegendContent prop', () => {
        const renderLegendContent = () => (
          <ul>
            <li>Group 1</li>
            <li>Group 2</li>
            <li>Group 3</li>
          </ul>
        );

        const chart = mount(
          <DonutChart
            {...mockProps}
            renderLegendContent={renderLegendContent}
          />,
        );

        expect(chart).toContainReactComponent(LegendContainer, {
          renderLegendContent,
        });
      });
    });

    describe('empty state', () => {
      it('renders single <Arc /> when true', () => {
        const chart = mount(<DonutChart {...mockProps} data={[]} />);

        expect(chart).toContainReactComponentTimes(Arc, 1);
      });

      it('renders the empty state if all data values are 0', () => {
        const chart = mount(
          <DonutChart
            {...mockProps}
            data={[
              {
                name: 'Shopify Payments',
                data: [{key: 'april - march', value: 0}],
              },
              {
                name: 'Other',
                data: [{key: 'april - march', value: 0}],
              },
            ]}
          />,
        );

        expect(chart).toContainReactComponentTimes(Arc, 1);
      });

      it('renders multiple <Arc /> when false', () => {
        const chart = mount(<DonutChart {...mockProps} />);

        expect(chart).toContainReactComponentTimes(Arc, 4);
      });
    });

    describe('seriesNameFormatter', () => {
      it('formats series name', () => {
        const chart = mount(
          <DonutChart
            {...mockProps}
            seriesNameFormatter={(name) => `series: ${name}`}
          />,
        );

        expect(chart).toContainReactText('series: Shopify Payments');
      });

      it('does not format the series name twice', () => {
        const chart = mount(
          <DonutChart
            {...mockProps}
            seriesNameFormatter={(name) => `series: ${name}`}
          />,
        );

        expect(chart).not.toContainReactText(
          'series: series: Shopify Payments',
        );
      });
    });
  });
});
