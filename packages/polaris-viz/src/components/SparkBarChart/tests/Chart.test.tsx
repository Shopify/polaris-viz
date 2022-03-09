import React from 'react';
import {mount} from '@shopify/react-testing';
import {Bar, DataSeries} from '@shopify/polaris-viz-core';

import {Chart} from '../Chart';

const sampleData: DataSeries = {
  data: [
    {key: 1, value: 100},
    {key: 2, value: 200},
    {key: 3, value: 300},
    {key: 4, value: 500},
  ],
};

describe('<Chart/>', () => {
  describe('data', () => {
    it('renders a single non-comparison chart', () => {
      const chart = mount(<Chart data={[sampleData]} />);

      expect(chart).toContainReactComponentTimes(Bar, 4);
    });

    it('renders a single comparison chart', () => {
      const chart = mount(
        <Chart
          data={[
            {
              data: [
                {key: 1, value: 200},
                {key: 2, value: 200},
                {key: 3, value: 200},
                {key: 4, value: 200},
              ],
              isComparison: true,
            },
          ]}
        />,
      );

      const line = chart.find('path');

      expect(line).not.toBeNull();
    });

    it('renders a chart with 2 data sets', () => {
      const chart = mount(
        <Chart
          data={[
            sampleData,
            {
              data: [
                {key: 1, value: 200},
                {key: 2, value: 200},
                {key: 3, value: 200},
                {key: 4, value: 200},
              ],
              isComparison: true,
            },
          ]}
        />,
      );

      const line = chart.find('path');

      expect(line).not.toBeNull();
      expect(chart).toContainReactComponentTimes(Bar, 4);
    });
  });
});
