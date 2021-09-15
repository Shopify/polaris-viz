import React from 'react';
import {mount} from '@shopify/react-testing';
import {SkipLink} from 'components/SkipLink';

import {MultiSeriesBarChart} from 'components/MultiSeriesBarChart/MultiSeriesBarChart';
import {Chart} from 'components/MultiSeriesBarChart/Chart';

describe('<MultiSeriesBarChart />', () => {
  const mockProps = {
    series: [
      {
        data: [
          {label: 'Something', rawValue: 10},
          {label: 'Another', rawValue: 20},
          {label: 'Thing', rawValue: 30},
        ],
        color: 'black',
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
