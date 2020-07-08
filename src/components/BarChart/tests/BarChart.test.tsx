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

  it('renders a <Chart /> if container dimensions have been measured', () => {
    jest.useFakeTimers();
    const barChart = mount(<BarChart {...mockProps} />);

    barChart.act(() => {
      jest.runAllTimers();
    });

    expect(barChart).toContainReactComponent(Chart);
    jest.useRealTimers();
  });

  it('does not render a <Chart /> if container dimensions have not been measured', () => {
    const barChart = mount(<BarChart {...mockProps} />);

    expect(barChart).not.toContainReactComponent(Chart);
  });
});
