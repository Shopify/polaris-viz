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
  xAxisOptions: {},
  renderTooltipContent: (value) => `${value}`,
};

describe('<HorizontalBarChart />', () => {
  it('renders <ChartContainer />', () => {
    const barChart = mount(<HorizontalBarChart {...mockProps} />);

    expect(barChart).toContainReactComponent(ChartContainer);
  });

  it('renders <Chart />', () => {
    const barChart = mount(<HorizontalBarChart {...mockProps} />);

    expect(barChart).toContainReactComponent(Chart);
  });
});
