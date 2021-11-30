import React from 'react';
import {mount} from '@shopify/react-testing';

import {ChartContainer} from '../../ChartContainer';
import {HorizontalBarChart} from '../HorizontalBarChart';
import {Chart} from '../Chart';

const mockProps = {
  series: [{name: 'Test', data: [{rawValue: 10, label: 'data'}]}],
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
