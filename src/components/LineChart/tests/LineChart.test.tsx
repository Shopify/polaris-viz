import React from 'react';
import {mount} from '@shopify/react-testing';

import {LineChart} from '../LineChart';
import {Chart} from '../Chart';
import {Series} from '../types';
import {Legend} from '../components';

(global as any).DOMRect = class DOMRect {
  width = 500;
  height = 250;
  top = 100;
  left = 100;
};

const primarySeries: Required<Series> = {
  name: 'Primary',
  color: 'primary',
  lineStyle: 'solid',
  data: [
    {label: 'Jan 1', rawValue: 1500},
    {label: 'Jan 2', rawValue: 1000},
    {label: 'Jan 3', rawValue: 800},
    {label: 'Jan 4', rawValue: 1300},
  ],
};

describe('<LineChart />', () => {
  it('renders the provided accessibility label on an "img" role container', () => {
    const lineChart = mount(
      <LineChart
        accessibilityLabel="Test label"
        series={[primarySeries]}
        xAxisLabels={['Jan 1']}
      />,
    );

    expect(lineChart).toContainReactComponent('div', {
      role: 'img',
      'aria-label': 'Test label',
    });
  });

  it('renders a <Chart />', () => {
    const lineChart = mount(
      <LineChart series={[primarySeries]} xAxisLabels={['Jan 1']} />,
    );

    expect(lineChart).toContainReactComponent(Chart);
  });

  it('renders a Legend', () => {
    const lineChart = mount(
      <LineChart series={[primarySeries]} xAxisLabels={['Jan 1']} />,
    );

    expect(lineChart).toContainReactComponent(Legend, {
      series: [primarySeries],
    });
  });
});
