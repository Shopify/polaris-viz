import {mount} from '@shopify/react-testing';
import type {DataSeries} from '@shopify/polaris-viz-core';
import {LineSeries} from '@shopify/polaris-viz-core';

import {SparkLineChart} from '../SparkLineChart';
import {Chart} from '../Chart';

jest.mock('d3-scale', () => ({
  scaleLinear: jest.fn(() => {
    const scale = (value: any) => value;
    scale.range = (range: any) => (range ? scale : range);
    scale.domain = (domain: any) => (domain ? scale : domain);
    return scale;
  }),
}));

describe('<SparkLineChart />', () => {
  const mockData: DataSeries[] = [
    {
      color: 'red',
      data: [
        {key: 0, value: 100},
        {key: 1, value: 200},
        {key: 2, value: 300},
        {key: 3, value: 400},
        {key: 4, value: 400},
        {key: 5, value: 1000},
        {key: 6, value: 200},
        {key: 7, value: 800},
        {key: 8, value: 900},
        {key: 9, value: 200},
        {key: 10, value: 400},
      ],
    },
    {
      color: 'purple',
      isComparison: true,
      data: [
        {key: 0, value: 10},
        {key: 1, value: 20},
        {key: 2, value: 30},
        {key: 3, value: 40},
        {key: 4, value: 40},
        {key: 5, value: 400},
        {key: 6, value: 20},
        {key: 7, value: 80},
        {key: 8, value: 90},
        {key: 9, value: 20},
        {key: 10, value: 40},
      ],
    },
  ];

  describe('SVG', () => {
    it('renders <svg />', () => {
      const sparkLineChart = mount(<SparkLineChart data={mockData} />);

      expect(sparkLineChart).toContainReactComponentTimes('svg', 1);
    });
  });

  describe('Accessibility', () => {
    it('gives the SVG an aria-hidden attribute', () => {
      const sparkLineChart = mount(<SparkLineChart data={mockData} />);

      expect(sparkLineChart).toContainReactComponent('svg', {
        'aria-hidden': true,
      });
    });

    it('has a hidden label when an accessibility label is passed to the component', () => {
      const label = 'Showing sales over the last 30 days';
      const sparkLineChart = mount(
        <SparkLineChart data={mockData} accessibilityLabel={label} />,
      );

      expect(sparkLineChart.find('span')!.text()).toBe(label);
    });
  });

  describe('<LineSeries />', () => {
    it('renders a LineSeries for each series provided', () => {
      const sparkLineChart = mount(<SparkLineChart data={mockData} />);

      expect(sparkLineChart.findAll(LineSeries)).toHaveLength(mockData.length);
    });
  });

  describe('theme', () => {
    it('gets passed to <Chart/>', () => {
      const sparklineChart = mount(
        <SparkLineChart data={mockData} theme="Light" />,
      );

      expect(sparklineChart).toContainReactComponent(Chart, {
        theme: 'Light',
      });
    });

    it('`Default` is used if no value is provided', () => {
      const barChart = mount(<SparkLineChart data={mockData} />);

      expect(barChart).toContainReactComponent(Chart, {
        theme: 'Default',
      });
    });
  });
});
