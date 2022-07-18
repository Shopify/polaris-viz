import React from 'react';
import {mount} from '@shopify/react-testing';
import {DataSeries} from '@shopify/polaris-viz-core';

import {
  HorizontalBarChart,
  HorizontalBarChartProps,
} from '../HorizontalBarChart';
import {Chart} from '../Chart';

jest.mock('@shopify/polaris-viz-core/src/utilities', () => ({
  ...jest.requireActual('@shopify/polaris-viz-core/src/utilities'),
  estimateStringWidth: jest.fn(() => 50),
}));

const mockProps: HorizontalBarChartProps = {
  data: [
    {
      name: 'Test',
      data: [
        {value: 10, key: 'Label 01'},
        {value: 12, key: 'Label 02'},
      ],
    },
  ],
  xAxisOptions: {
    labelFormatter: (value) => `${value}`,
    hide: false,
  },
  yAxisOptions: {
    labelFormatter: (value) => `${value}`,
    integersOnly: false,
  },
  renderTooltipContent: (value) => `${value}`,
  showLegend: false,
  dimensions: {
    height: 400,
    width: 400,
  },
};

describe('<HorizontalBarChart />', () => {
  it('renders <Chart />', () => {
    const barChart = mount(<HorizontalBarChart {...mockProps} />);

    expect(barChart).toContainReactComponent(Chart);
  });

  it('correctly rerenders if new data object is passed in as prop', () => {
    const alteredData = [
      {
        name: 'Test',
        data: [{value: 12, key: 'Label 02'}],
      },
    ] as DataSeries[];

    const chart = mount(<HorizontalBarChart {...mockProps} />);
    chart.setProps({...mockProps, data: alteredData});

    expect(chart).toContainReactComponent(Chart);
  });
});
