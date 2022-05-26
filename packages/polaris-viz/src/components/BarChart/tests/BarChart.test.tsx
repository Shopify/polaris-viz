import React from 'react';
import {mount} from '@shopify/react-testing';

import {SkipLink} from '../../../components/SkipLink';
import {BarChart, BarChartProps} from '../BarChart';
import {VerticalBarChart} from '../../VerticalBarChart';
import {HorizontalBarChart} from '../../HorizontalBarChart';

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
    xAxisOptions: {},
    skipLinkText: 'Skip Chart Content',
  };

  describe('theme', () => {
    it('gets passed to <VerticalBarChart/>', () => {
      const barChart = mount(<BarChart {...mockProps} theme="Light" />);

      expect(barChart).toContainReactComponent(VerticalBarChart, {
        theme: 'Light',
      });
    });

    it('gets passed to <HorizontalBarChart/>', () => {
      const barChart = mount(
        <BarChart {...mockProps} theme="Light" direction="horizontal" />,
      );

      expect(barChart).toContainReactComponent(HorizontalBarChart, {
        theme: 'Light',
      });
    });

    it('`Default` is used if no value is provided', () => {
      const barChart = mount(<BarChart {...mockProps} />);

      expect(barChart).toContainReactComponent(VerticalBarChart, {
        theme: 'Default',
      });
    });
  });

  it('passes down renderTooltipContent() when not provided to parent props', () => {
    const chart = mount(<BarChart {...mockProps} />);
    const barChart = chart.find(VerticalBarChart);

    expect(barChart?.props.renderTooltipContent).toBeDefined();
  });

  it('sets defaults for xAxisOptions', () => {
    const chart = mount(<BarChart {...mockProps} />);
    const barChart = chart.find(VerticalBarChart);

    expect(barChart?.props.xAxisOptions.labelFormatter).toBeDefined();
    expect(barChart?.props.xAxisOptions.hide).toStrictEqual(false);
  });

  describe('direction', () => {
    it('renders a <VerticalBarChart /> when vertical', () => {
      const chart = mount(<BarChart {...mockProps} />);

      expect(chart).toContainReactComponent(VerticalBarChart);
    });

    it('renders a <HorizontalBarChart /> when horizontal', () => {
      const chart = mount(<BarChart {...mockProps} direction="horizontal" />);

      expect(chart).toContainReactComponent(HorizontalBarChart);
    });
  });

  describe('skipLinkText', () => {
    it('renders a <SkipLink />', () => {
      const chart = mount(<BarChart {...mockProps} />);

      expect(chart).toContainReactComponent(SkipLink);
    });

    it('does not render a <SkipLink /> when data is empty', () => {
      const chart = mount(<BarChart {...mockProps} data={[]} />);

      expect(chart).not.toContainReactComponent(SkipLink);
    });
  });
});
