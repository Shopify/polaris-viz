import React from 'react';
import {mount} from '@shopify/react-testing';
import {Color} from 'types';

import {MultiSeriesBarChart} from '../MultiSeriesBarChart';
import {Chart} from '../Chart';
import {Legend} from '../components';

<<<<<<< HEAD:src/components/GroupedBarChart/tests/GroupedBarChart.test.tsx
describe('<GroupedBarChart />', () => {
=======
describe('<MultiSeriesBarChart />', () => {
>>>>>>> 47017d2... [multi series bar chart] update docs and rename base component:src/components/MultiSeriesBarChart/tests/MultiSeriesBarChart.tsx
  const mockProps = {
    series: [
      {data: [10, 20, 30], color: 'colorBlack' as Color, label: 'LABEL1'},
    ],
    labels: ['Something', 'Another', 'Thing'],
  };

  it('renders accessibility props', () => {
    const label = 'A bar chart showing sales data';
    const multiSeriesBarChart = mount(
      <MultiSeriesBarChart {...mockProps} accessibilityLabel={label} />,
    );

    expect(multiSeriesBarChart).toContainReactComponent('div', {
      'aria-label': label,
      role: 'img',
    });
  });

  it('renders a <Legend />', () => {
    const multiSeriesBarChart = mount(<MultiSeriesBarChart {...mockProps} />);

    expect(multiSeriesBarChart).toContainReactComponent(Legend);
  });

  it('renders a <Chart />', () => {
    const multiSeriesBarChart = mount(<MultiSeriesBarChart {...mockProps} />);

    expect(multiSeriesBarChart).toContainReactComponent(Chart);
  });
});
