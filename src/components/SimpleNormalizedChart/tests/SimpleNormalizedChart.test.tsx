import React from 'react';
import {mount} from '@shopify/react-testing';

import {SimpleNormalizedChart} from '../../../components/SimpleNormalizedChart';
import {mountWithProvider} from '../../../test-utilities';
import {BarSegment, BarLabel} from '../components';
import type {SimpleNormalizedChartProps} from '../SimpleNormalizedChart';

describe('<SimpleNormalizedChart />', () => {
  const mockProps: SimpleNormalizedChartProps = {
    data: [
      {key: 'label0', value: 993.9266809283133},
      {key: 'label1', value: 666.4681407384194},
      {key: 'label2', value: 500},
      {key: 'label3', value: 200},
    ],
    labelFormatter: (value) => `$${Number(value).toFixed(2)}`,
  };

  describe('Bars', () => {
    it('renders 4 bars when given 4 data items', () => {
      const barChart = mount(<SimpleNormalizedChart {...mockProps} />);

      expect(barChart.findAll(BarSegment)).toHaveLength(4);
    });

    it('renders 4 bars when given more than 4 data items', () => {
      const highEdgeProps = {
        data: [
          {
            key: 'DuckDuckGo',
            value: 993.9266809283133,
          },
          {
            key: 'Google',
            value: 666.4681407384194,
          },
          {key: 'Yahoo', value: 500},
          {key: 'Bing', value: 200},
          {
            key: 'DuckDuck',
            value: 993.9266809283133,
          },
          {key: 'Goog', value: 666.4681407384194},
          {key: 'Yah', value: 500},
          {key: 'Bin', value: 200},
        ],
      };
      const barChart = mount(<SimpleNormalizedChart {...highEdgeProps} />);

      expect(barChart.findAll(BarSegment)).toHaveLength(4);
    });

    it('renders 0 bars when given 0', () => {
      const lowEdgeProps = {
        data: [],
      };

      const barChart = mount(<SimpleNormalizedChart {...lowEdgeProps} />);

      expect(barChart.findAll(BarSegment)).toHaveLength(0);
    });

    it('does not render a bar for 0 values', () => {
      const barChart = mount(
        <SimpleNormalizedChart
          data={[
            {key: 'Bin', value: 200},
            {key: 'Stuff', value: 0},
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
            key: 'DuckDuckGo',
            value: 993.9266809283133,
          },
          {
            key: 'DuckDuckGo1',
            value: 993.9266809283133,
          },
          {
            key: 'DuckDuckGo2',
            value: 993.9266809283133,
          },
          {
            key: 'DuckDuckGo3',
            value: 993.9266809283133,
          },
          {
            key: 'DuckDuckGo4',
            value: 993.9266809283133,
          },
          {
            key: 'DuckDuckGo5',
            value: 993.9266809283133,
          },
        ],
      };

      const barChart = mount(<SimpleNormalizedChart {...highEdgeProps} />);

      expect(barChart.findAll(BarLabel)).toHaveLength(4);
    });

    it('renders 2 BarLabels given 2 data items are provided', () => {
      const lowEdgeProps = {
        data: [
          {
            key: 'DuckDuckGo',
            value: 993.9266809283133,
          },
          {
            key: 'DuckDuckGo1',
            value: 993.9266809283133,
          },
        ],
      };

      const barChart = mount(<SimpleNormalizedChart {...lowEdgeProps} />);

      expect(barChart.findAll(BarLabel)).toHaveLength(2);
    });
  });

  describe('Colors', () => {
    it('inherits colors from the theme', () => {
      const barChart = mountWithProvider(
        <SimpleNormalizedChart {...mockProps} />,
        {
          themes: {
            Default: {
              seriesColors: {
                upToFour: ['#00A', '#00B', '#00C', '#00D'],
              },
            },
          },
        },
      );

      expect(barChart.find(BarSegment)!.props.color).toStrictEqual('#00A');
    });
  });

  describe('direction', () => {
    it('defaults to horizontal direction and passes it to BarSegment', () => {
      const barChart = mount(<SimpleNormalizedChart {...mockProps} />);

      expect(barChart.find(BarSegment)!.props.direction).toBe('horizontal');
    });

    it('accepts vertical direction and passes it to BarSegment', () => {
      const barChart = mount(
        <SimpleNormalizedChart {...mockProps} direction="vertical" />,
      );

      expect(barChart.find(BarSegment)!.props.direction).toBe('vertical');
    });
  });

  describe('Label Position', () => {
    it('defaults to top-left label position and passes it to BarLabel', () => {
      const barChart = mount(<SimpleNormalizedChart {...mockProps} />);

      expect(barChart.find(BarLabel)!.props.labelPosition).toBe('top-left');
    });

    it('accepts bottom-right label position and passes it to BarLabel', () => {
      const barChart = mount(
        <SimpleNormalizedChart {...mockProps} labelPosition="bottom-right" />,
      );

      expect(barChart.find(BarLabel)!.props.labelPosition).toBe('bottom-right');
    });
  });
});
