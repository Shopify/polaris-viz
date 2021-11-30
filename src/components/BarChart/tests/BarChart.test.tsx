import React from 'react';
import {mount} from '@shopify/react-testing';

import {SkipLink} from '../../../components/SkipLink';
import {BarChart, BarChartProps} from '../BarChart';
import {Chart} from '../Chart';

describe('<BarChart />', () => {
  const mockProps: BarChartProps = {
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
    xAxisOptions: {labels: ['Something', 'Another', 'Thing']},
    skipLinkText: 'Skip Chart Content',
  };

  it('renders a <Chart />', () => {
    const barChart = mount(<BarChart {...mockProps} />);

    expect(barChart).toContainReactComponent(Chart);
  });

  describe('skipLinkText', () => {
    it('renders a <SkipLink />', () => {
      const barChart = mount(<BarChart {...mockProps} />);

      expect(barChart).toContainReactComponent(SkipLink);
    });

    it('does not render a <SkipLink /> when series is empty', () => {
      const barChart = mount(<BarChart {...mockProps} data={[]} />);

      expect(barChart).not.toContainReactComponent(SkipLink);
    });
  });
});
