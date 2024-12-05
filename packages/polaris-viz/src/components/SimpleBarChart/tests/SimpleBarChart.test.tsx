import {mount} from '@shopify/react-testing';
import type {DataSeries} from '@shopify/polaris-viz-core';

import {ChartContainer} from '../../ChartContainer/ChartContainer';
import type {SimpleBarChartProps} from '../SimpleBarChart';
import {SimpleBarChart} from '../SimpleBarChart';
import {Chart} from '../Chart';

const mockProps: SimpleBarChartProps = {
  data: [
    {
      name: 'Test',
      data: [
        {value: 1, key: 'Label 01'},
        {value: 2, key: 'Label 02'},
        {value: 3, key: 'Label 03'},
      ],
    },
  ] as DataSeries[],
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

  it('correctly rerenders if new data object is passed in as prop', () => {
    const alteredData = [
      {
        name: 'Test',
        data: [
          {value: 1, key: 'Label 01'},
          {value: 2, key: 'Label 02'},
        ],
      },
    ] as DataSeries[];

    const chart = mount(<SimpleBarChart {...mockProps} />);
    chart.setProps({...mockProps, data: alteredData});

    expect(chart).toContainReactComponent(Chart);
  });
});
