import React from 'react';
import {mount} from '@shopify/react-testing';

import {ChartContainer} from '../../ChartContainer';
import {SimpleBarChart, SimpleBarChartProps} from '../SimpleBarChart';
import {Chart} from '../Chart';

const mockProps: SimpleBarChartProps = {
  data: [{name: 'Test', data: [{value: 10, key: 'data'}]}],
};

describe('<SimpleBarChart />', () => {
  it('renders <ChartContainer />', () => {
    const barChart = mount(<SimpleBarChart {...mockProps} />);

    expect(barChart).toContainReactComponent(ChartContainer);
  });

  it('renders <Chart />', () => {
    const barChart = mount(<SimpleBarChart {...mockProps} />);

    expect(barChart).toContainReactComponent(Chart);
  });
});
