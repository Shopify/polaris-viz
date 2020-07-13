import React from 'react';
import {mount} from '@shopify/react-testing';
import {Color} from 'types';

import {GroupedBarChart} from '../GroupedBarChart';
import {Chart} from '../Chart';
import {Legend} from '../components';

describe('GroupedBarChart />', () => {
  const mockProps = {
    series: [
      {data: [10, 20, 30], color: 'colorBlack' as Color, label: 'LABEL1'},
    ],
    labels: ['Something', 'Another', 'Thing'],
  };

  it('renders accessibility props', () => {
    const label = 'A bar chart showing sales data';
    const groupedBarChart = mount(
      <GroupedBarChart {...mockProps} accessibilityLabel={label} />,
    );

    expect(groupedBarChart).toContainReactComponent('div', {
      'aria-label': label,
      role: 'img',
    });
  });

  it('renders a <Legend />', () => {
    const groupedBarChart = mount(<GroupedBarChart {...mockProps} />);

    expect(groupedBarChart).toContainReactComponent(Legend);
  });

  it('renders a <Chart /> if container dimensions have been measured', () => {
    jest.useFakeTimers();
    const groupedBarChart = mount(<GroupedBarChart {...mockProps} />);

    groupedBarChart.act(() => {
      jest.runAllTimers();
    });

    expect(groupedBarChart).toContainReactComponent(Chart);
    jest.useRealTimers();
  });

  it('does not render a <Chart /> if container dimensions have not been measured', () => {
    const groupedBarChart = mount(<GroupedBarChart {...mockProps} />);

    expect(groupedBarChart).not.toContainReactComponent(Chart);
  });
});
