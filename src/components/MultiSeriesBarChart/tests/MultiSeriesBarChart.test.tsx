import React from 'react';
import {mount} from '@shopify/react-testing';
import {Color} from 'types';

import {MultiSeriesBarChart} from '../MultiSeriesBarChart';
import {Chart} from '../Chart';

describe('<MultiSeriesBarChart />', () => {
  const mockProps = {
    series: [
      {
        data: [
          {label: 'Something', rawValue: 10},
          {label: 'Another', rawValue: 20},
          {label: 'Thing', rawValue: 30},
        ],
        color: 'colorBlack' as Color,
        name: 'LABEL1',
      },
    ],
    xAxisOptions: {labels: ['Something', 'Another', 'Thing']},
  };

  it('renders a <Chart />', () => {
    const multiSeriesBarChart = mount(<MultiSeriesBarChart {...mockProps} />);

    expect(multiSeriesBarChart).toContainReactComponent(Chart);
  });
});
