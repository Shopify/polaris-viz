import React from 'react';
import {mount} from '@shopify/react-testing';

import {VerticalBarChart, VerticalBarChartProps} from '../VerticalBarChart';
import {Chart} from '../Chart';

describe('<VerticalBarChart />', () => {
  const mockProps: VerticalBarChartProps = {
    data: [
      {
        data: [
          {key: 'Something', value: 10},
          {key: 'Another', value: 20},
          {key: 'Thing', value: 30},
        ],
        color: 'black',
        name: 'LABEL1',
      },
    ],
    renderTooltipContent: (value) => `${value}`,
    showLegend: false,
    xAxisOptions: {
      labelFormatter: (value) => `${value}`,
      hide: false,
      useMinimalLabels: false,
    },
    yAxisOptions: {
      labelFormatter: (value) => `${value}`,
      integersOnly: false,
    },
  };

  it('renders a <Chart />', () => {
    const verticalBarChart = mount(<VerticalBarChart {...mockProps} />);

    expect(verticalBarChart).toContainReactComponent(Chart);
  });
});
