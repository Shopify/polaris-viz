import React from 'react';
import {mount} from '@shopify/react-testing';
import {NormalizedStackedBar} from 'components';
import {BarSegment, BarLabel} from '../components';
import {ColorScheme, Orientation} from '../types';

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
    it('renders 4 bars when given 4 data items', async () => {
      const barChart = mount(<NormalizedStackedBar {...mockProps} />);

      expect(barChart.findAll(BarSegment).length).toStrictEqual(4);
    });

    it('renders 4 bars when given more than 4 data items', async () => {
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
      const barChart = mount(<NormalizedStackedBar {...highEdgeProps} />);

      expect(barChart.findAll(BarSegment).length).toStrictEqual(4);
    });

    it('renders 0 bars when given 0', async () => {
      const lowEdgeProps = {
        data: [],
      };

      const barChart = mount(<NormalizedStackedBar {...lowEdgeProps} />);

      expect(barChart.findAll(BarSegment).length).toStrictEqual(0);
    });
  });

  describe('Labels', () => {
    it('renders 4 Labels when more than 4 data items are provided', async () => {
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

      const barChart = mount(<NormalizedStackedBar {...highEdgeProps} />);

      expect(barChart.findAll(BarLabel).length).toStrictEqual(4);
    });

    it('renders 2 BarLabels given 2 data items are provided', async () => {
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

      const barChart = mount(<NormalizedStackedBar {...lowEdgeProps} />);

      expect(barChart.findAll(BarLabel).length).toStrictEqual(2);
    });
  });

  describe('Colors', () => {
    it('handles arrays of color tokens', () => {
      const barChart = mount(
        <NormalizedStackedBar {...mockProps} colors={['colorPurple']} />,
      );

      expect(barChart.find(BarSegment)!.props.color).toBe('rgb(156, 106, 222)');
    });

    it('handles color palettes', () => {
      const barChart = mount(
        <NormalizedStackedBar {...mockProps} colors={ColorScheme.Classic} />,
      );

      expect(barChart.find(BarSegment)!.props.color).toBe('rgb(80, 36, 143)');
    });
  });

  describe('Orientation', () => {
    it('defaults to horizontal orientation and passes it to BarSegment', () => {
      const barChart = mount(<NormalizedStackedBar {...mockProps} />);

      expect(barChart.find(BarSegment)!.props.orientation).toBe(
        Orientation.Horizontal,
      );
    });

    it('accepts vertical orientation and passes it to BarSegment', () => {
      const barChart = mount(
        <NormalizedStackedBar
          {...mockProps}
          orientation={Orientation.Vertical}
        />,
      );

      expect(barChart.find(BarSegment)!.props.orientation).toBe(
        Orientation.Vertical,
      );
    });
  });

  describe('Accessibility', () => {
    it('sets an img role on the parent div', () => {
      const barChart = mount(<NormalizedStackedBar {...mockProps} />);

      expect(barChart.find('div')!.props.role).toBe('img');
    });

    it('adds an aria label when one is passed in', () => {
      const label = 'A stacked bar chart showing sales by channel.';
      const barChart = mount(
        <NormalizedStackedBar {...mockProps} accessibilityLabel={label} />,
      );

      expect(barChart.find('div')!.props['aria-label']).toBe(label);
    });
  });
});
