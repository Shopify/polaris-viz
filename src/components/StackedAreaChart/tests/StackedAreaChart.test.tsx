import React from 'react';
import {mount} from '@shopify/react-testing';
import type {DataSeries} from 'types';

import {StackedAreaChart} from '../StackedAreaChart';
import {Chart} from '../Chart';
import {SkipLink} from '../../SkipLink';

const mockData: DataSeries[] = [
  {
    name: 'Asia',
    data: [
      {key: '1', value: 502},
      {key: '2', value: 1000},
      {key: '3', value: 2000},
      {key: '4', value: 1000},
      {key: '5', value: 100},
      {key: '6', value: 1000},
      {key: '7', value: 5000},
    ],
    color: 'purple',
  },
  {
    name: 'Africa',
    data: [
      {key: '1', value: 106},
      {key: '2', value: 107},
      {key: '3', value: 111},
      {key: '4', value: 133},
      {key: '5', value: 100},
      {key: '6', value: 767},
      {key: '7', value: 1766},
    ],
    color: 'teal',
  },
];

const xAxisLabels = ['1', '2', '3', '4', '5', '6', '7'];

describe('<AreaChart />', () => {
  it('renders a <Chart />', () => {
    const areaChart = mount(
      <StackedAreaChart data={mockData} xAxisOptions={{labels: xAxisLabels}} />,
    );

    expect(areaChart).toContainReactComponent(Chart);
  });

  describe('skipLinkText', () => {
    it('renders an anchor tag that allows skipping the chart content', () => {
      const areaChart = mount(
        <StackedAreaChart
          data={mockData}
          xAxisOptions={{labels: xAxisLabels}}
          skipLinkText="Skip chart content"
        />,
      );

      expect(areaChart).toContainReactComponent(SkipLink, {
        children: 'Skip chart content',
      });
    });

    it('does not render an anchor tag if empty', () => {
      const areaChart = mount(
        <StackedAreaChart
          data={mockData}
          xAxisOptions={{labels: xAxisLabels}}
          skipLinkText=""
        />,
      );

      expect(areaChart).not.toContainReactComponent('a');
    });
  });
});
