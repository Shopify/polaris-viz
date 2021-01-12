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
    name: 'Asia',
    data: [
      {label: '1', rawValue: 502},
      {label: '2', rawValue: 1000},
      {label: '3', rawValue: 2000},
      {label: '4', rawValue: 1000},
      {label: '5', rawValue: 100},
      {label: '6', rawValue: 1000},
      {label: '7', rawValue: 5000},
    ],
    color: 'colorPurple' as Color,
  },
  {
    name: 'Africa',
    data: [
      {label: '1', rawValue: 106},
      {label: '2', rawValue: 107},
      {label: '3', rawValue: 111},
      {label: '4', rawValue: 133},
      {label: '5', rawValue: 100},
      {label: '6', rawValue: 767},
      {label: '7', rawValue: 1766},
    ],
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
