import React from 'react';
import {mount} from '@shopify/react-testing';
import {NormalizedStackedBarChart} from 'components';

import {colorPurpleDark} from '../../../constants';
import {BarSegment, BarLabel} from '../components';

describe('<NormalizedBarChart />', () => {
  const mockProps = {
    data: [
      {label: 'label0', value: 993.9266809283133, formattedValue: '$993.93'},
      {label: 'label1', value: 666.4681407384194, formattedValue: '$666.47'},
      {label: 'label2', value: 500, formattedValue: '$500.00'},
      {label: 'label3', value: 200, formattedValue: '$200.00'},
    ],
  };

  describe('Bars', () => {
    it('renders 4 bars when given 4 data items', () => {
      const barChart = mount(<NormalizedStackedBarChart {...mockProps} />);

      expect(barChart.findAll(BarSegment)).toHaveLength(4);
    });

    it('renders 4 bars when given more than 4 data items', () => {
      const highEdgeProps = {
        data: [
          {
            label: 'DuckDuckGo',
            value: 993.9266809283133,
            formattedValue: '$993.93',
          },
          {
            label: 'Google',
            value: 666.4681407384194,
            formattedValue: '$666.47',
          },
          {label: 'Yahoo', value: 500, formattedValue: '$500.00'},
          {label: 'Bing', value: 200, formattedValue: '$200.00'},
          {
            label: 'DuckDuck',
            value: 993.9266809283133,
            formattedValue: '$993.93',
          },
          {label: 'Goog', value: 666.4681407384194, formattedValue: '$666.47'},
          {label: 'Yah', value: 500, formattedValue: '$500.00'},
          {label: 'Bin', value: 200, formattedValue: '$200.00'},
        ],
      };
      const barChart = mount(<NormalizedStackedBarChart {...highEdgeProps} />);

      expect(barChart.findAll(BarSegment)).toHaveLength(4);
    });

    it('renders 0 bars when given 0', () => {
      const lowEdgeProps = {
        data: [],
      };

      const barChart = mount(<NormalizedStackedBarChart {...lowEdgeProps} />);

      expect(barChart.findAll(BarSegment)).toHaveLength(0);
    });

    it('does not render a bar for 0 values', () => {
      const barChart = mount(
        <NormalizedStackedBarChart
          data={[
            {label: 'Bin', value: 200, formattedValue: '$200.00'},
            {label: 'Stuff', value: 0, formattedValue: '$0.00'},
          ]}
        />,
      );

      expect(barChart.findAll(BarSegment)).toHaveLength(1);
    });
  });

  describe('Labels', () => {
    it('renders 4 Labels when more than 4 data items are provided', () => {
      const highEdgeProps = {
        data: [
          {
            label: 'DuckDuckGo',
            value: 993.9266809283133,
            formattedValue: '$993.93',
          },
          {
            label: 'DuckDuckGo1',
            value: 993.9266809283133,
            formattedValue: '$993.93',
          },
          {
            label: 'DuckDuckGo2',
            value: 993.9266809283133,
            formattedValue: '$993.93',
          },
          {
            label: 'DuckDuckGo3',
            value: 993.9266809283133,
            formattedValue: '$993.93',
          },
          {
            label: 'DuckDuckGo4',
            value: 993.9266809283133,
            formattedValue: '$993.93',
          },
          {
            label: 'DuckDuckGo5',
            value: 993.9266809283133,
            formattedValue: '$993.93',
          },
        ],
      };

      const barChart = mount(<NormalizedStackedBarChart {...highEdgeProps} />);

      expect(barChart.findAll(BarLabel)).toHaveLength(4);
    });

    it('renders 2 BarLabels given 2 data items are provided', () => {
      const lowEdgeProps = {
        data: [
          {
            label: 'DuckDuckGo',
            value: 993.9266809283133,
            formattedValue: '$993.93',
          },
          {
            label: 'DuckDuckGo1',
            value: 993.9266809283133,
            formattedValue: '$993.93',
          },
        ],
      };

      const barChart = mount(<NormalizedStackedBarChart {...lowEdgeProps} />);

      expect(barChart.findAll(BarLabel)).toHaveLength(2);
    });
  });

  describe('Colors', () => {
    it('passes down colors', () => {
      const barChart = mount(
        <NormalizedStackedBarChart {...mockProps} colors={[colorPurpleDark]} />,
      );

      expect(barChart.find(BarSegment)!.props.color).toBe('rgb(80, 36, 143)');
    });
  });

  describe('Orientation', () => {
    it('defaults to horizontal orientation and passes it to BarSegment', () => {
      const barChart = mount(<NormalizedStackedBarChart {...mockProps} />);

      expect(barChart.find(BarSegment)!.props.orientation).toBe('horizontal');
    });

    it('accepts vertical orientation and passes it to BarSegment', () => {
      const barChart = mount(
        <NormalizedStackedBarChart {...mockProps} orientation="vertical" />,
      );

      expect(barChart.find(BarSegment)!.props.orientation).toBe('vertical');
    });
  });
});
