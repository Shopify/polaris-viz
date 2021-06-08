import React from 'react';
import {mount} from '@shopify/react-testing';
import type {Color} from 'types';
import {SkipLink} from 'components/SkipLink';

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
    skipLinkText: 'Skip Chart Content',
  };

  it('renders a <Chart />', () => {
    const multiSeriesBarChart = mount(<MultiSeriesBarChart {...mockProps} />);

    expect(multiSeriesBarChart).toContainReactComponent(Chart);
  });

  describe('skipLinkText', () => {
    it('renders a <SkipLink />', () => {
      const multiSeriesBarChart = mount(<MultiSeriesBarChart {...mockProps} />);

      expect(multiSeriesBarChart).toContainReactComponent(SkipLink);
    });

    it('does not render a <SkipLink /> when series is empty', () => {
      const multiSeriesBarChart = mount(
        <MultiSeriesBarChart {...mockProps} series={[]} />,
      );

      expect(multiSeriesBarChart).not.toContainReactComponent(SkipLink);
    });
  });
});
