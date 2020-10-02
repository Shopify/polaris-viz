import React from 'react';
import {mount} from '@shopify/react-testing';
import {Color} from 'types';

import {StackedAreaChart} from '../StackedAreaChart';
import {Chart} from '../Chart';
import {Legend} from '../components';

(global as any).DOMRect = class DOMRect {
  width = 500;
  height = 250;
  top = 100;
  left = 100;
};

const mockData = [
  {
    label: 'Asia',
    data: [502, 1000, 2000, 1000, 100, 1000, 5000],
    color: 'colorPurple' as Color,
  },
  {
    label: 'Africa',
    data: [106, 107, 111, 133, 100, 767, 1766],
    color: 'colorTeal' as Color,
  },
];

const xAxisLabels = ['1', '2', '3', '4', '5', '6', '7'];

describe('<AreaChart />', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => {
        return {matches: false};
      }),
    });
  });

  it('renders the provided accessibility label on an "img" role container', () => {
    const areaChart = mount(
      <StackedAreaChart
        series={mockData}
        xAxisLabels={xAxisLabels}
        accessibilityLabel="Test label"
      />,
    );

    expect(areaChart).toContainReactComponent('div', {
      role: 'img',
      'aria-label': 'Test label',
    });
  });

  it('renders a <Chart />', () => {
    const areaChart = mount(
      <StackedAreaChart series={mockData} xAxisLabels={xAxisLabels} />,
    );

    expect(areaChart).toContainReactComponent(Chart);
  });

  it('renders a Legend', () => {
    const areaChart = mount(
      <StackedAreaChart series={mockData} xAxisLabels={xAxisLabels} />,
    );

    expect(areaChart).toContainReactComponent(Legend, {
      series: mockData,
    });
  });
});
