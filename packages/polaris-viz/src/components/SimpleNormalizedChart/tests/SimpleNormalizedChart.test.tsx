import React from 'react';
import {mount} from '@shopify/react-testing';

import {ChartContainer} from '../../ChartContainer';
import {
  SimpleNormalizedChart,
  SimpleNormalizedChartProps,
} from '../SimpleNormalizedChart';
import {Chart} from '../Chart';

const mockProps: SimpleNormalizedChartProps = {
  data: [
    {
      name: 'label0',
      data: [
        {
          key: 'April 2022',
          value: 993.9266809283133,
        },
      ],
    },
    {
      name: 'label1',
      data: [
        {
          key: 'April 2022',
          value: 666.4681407384194,
        },
      ],
    },
    {
      name: 'label2',
      data: [
        {
          key: 'April 2022',
          value: 500,
        },
      ],
    },
    {
      name: 'label3',
      data: [
        {
          key: 'April 2022',
          value: 200,
        },
      ],
    },
  ],

  labelFormatter: (value) => `$${Number(value).toFixed(2)}`,
};

describe('<SimpleNormalizedChart />', () => {
  it('renders <ChartContainer />', () => {
    const barChart = mount(<SimpleNormalizedChart {...mockProps} />);

    expect(barChart).toContainReactComponent(ChartContainer);
  });

  it('renders <Chart />', () => {
    const barChart = mount(<SimpleNormalizedChart {...mockProps} />);

    expect(barChart).toContainReactComponent(Chart);
  });
});
