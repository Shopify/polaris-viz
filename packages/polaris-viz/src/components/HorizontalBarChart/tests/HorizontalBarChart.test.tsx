import React from 'react';
import {mount} from '@shopify/react-testing';

import {ChartContainer} from '../../ChartContainer';
import {
  HorizontalBarChart,
  HorizontalBarChartProps,
} from '../HorizontalBarChart';
import {Chart} from '../Chart';

const mockProps: HorizontalBarChartProps = {
  data: [{name: 'Test', data: [{value: 10, key: 'data'}]}],
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
});
