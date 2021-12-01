import React from 'react';
import {mount} from '@shopify/react-testing';

import {SkipLink} from '../../../components/SkipLink';
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
    xAxisOptions: {},
    skipLinkText: 'Skip Chart Content',
  };

  it('renders a <Chart />', () => {
    const verticalBarChart = mount(<VerticalBarChart {...mockProps} />);

    expect(verticalBarChart).toContainReactComponent(Chart);
  });

  describe('skipLinkText', () => {
    it('renders a <SkipLink />', () => {
      const verticalBarChart = mount(<VerticalBarChart {...mockProps} />);

      expect(verticalBarChart).toContainReactComponent(SkipLink);
    });

    it('does not render a <SkipLink /> when series is empty', () => {
      const verticalBarChart = mount(
        <VerticalBarChart {...mockProps} data={[]} />,
      );

      expect(verticalBarChart).not.toContainReactComponent(SkipLink);
    });
  });
});
