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

const primarySeries: Series = {
  name: 'Primary',
  data: [
    {x: 'Jan 1', y: 1500},
    {x: 'Jan 2', y: 1000},
    {x: 'Jan 3', y: 800},
    {x: 'Jan 4', y: 1300},
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

  it('renders a <Chart /> if container dimensions have been measured', () => {
    jest.useFakeTimers();
    const lineChart = mount(
      <LineChart series={[primarySeries]} xAxisLabels={['Jan 1']} />,
    );

    lineChart.act(() => {
      jest.runAllTimers();
    });

    expect(lineChart).toContainReactComponent(Chart);
    jest.useRealTimers();
  });

  it('does not render a <Chart /> if container dimensions have not been measured', () => {
    const lineChart = mount(
      <LineChart series={[primarySeries]} xAxisLabels={['Jan 1']} />,
    );

    expect(lineChart).not.toContainReactComponent(Chart);
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
