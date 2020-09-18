import React from 'react';
import {mount} from '@shopify/react-testing';

import {BarChart} from '../BarChart';
import {Chart} from '../Chart';

describe('BarChart />', () => {
  const mockProps = {data: [{rawValue: 10, label: 'data'}]};

  it('renders accessibility props', () => {
    const label = 'A bar chart showing sales data';
    const barChart = mount(
      <BarChart {...mockProps} accessibilityLabel={label} />,
    );

    expect(barChart).toContainReactComponent('div', {
      'aria-label': label,
      role: 'img',
    });
  });

  it('renders a <Chart />', () => {
    const barChart = mount(<BarChart {...mockProps} />);

    expect(barChart).toContainReactComponent(Chart);
  });
});
