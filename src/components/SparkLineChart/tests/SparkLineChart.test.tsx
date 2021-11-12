import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

import {SparkLineChart} from '../SparkLineChart';
import {Series} from '../components';
import type {DataSeries} from '../../../types';

jest.mock('../../../utilities/unique-id', () => ({
  uniqueId: jest.fn(() => 'stackedAreas-1'),
}));

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
    it('renders', () => {
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

  describe('Series', () => {
    it('renders a Series for each series provided', () => {
      const sparkLineChart = mount(<SparkLineChart data={mockData} />);

      expect(sparkLineChart.findAll(Series)).toHaveLength(mockData.length);
    });

    it('reduces the series width according to the offset and margin', () => {
      let rangeSpy = jest.fn();
      (scaleLinear as jest.Mock).mockImplementation(() => {
        const scale = (value: any) => value;
        rangeSpy = jest.fn((range: any) => (range ? scale : range));
        scale.range = rangeSpy;
        scale.domain = (domain: any) => (domain ? scale : domain);
        return scale;
      });

      const offsetLeft = 100;
      const offsetRight = 50;
      const margin = 2;
      const mockWidth = 0;

      mount(
        <SparkLineChart
          data={[
            {
              data: [{key: 0, value: 100}],
            },
          ]}
          offsetLeft={offsetLeft}
          offsetRight={offsetRight}
        />,
      );

      expect(rangeSpy).toHaveBeenCalledWith([
        offsetLeft + margin,
        mockWidth - offsetRight - margin,
      ]);
    });
  });
});
