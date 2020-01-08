import React from 'react';
import {mount} from '@shopify/react-testing';
import {NormalizedStackedBar} from 'components';
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

  describe('Data Bars', () => {
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
      const barChart = await mount(<NormalizedStackedBar {...highEdgeProps} />);

      expect(barChart.findAll(BarSegment).length).toStrictEqual(4);
    });

    it('renders 3 bars when given 3 data points', async () => {
      const lowEdgeProps = {
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
        ],
      };
      const barChart = await mount(<NormalizedStackedBar {...lowEdgeProps} />);

      expect(barChart.findAll(BarSegment).length).toStrictEqual(3);
    });

    it('renders 2 bars when given 2 data points', async () => {
      const lowEdgeProps = {
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
        ],
      };
      const barChart = await mount(<NormalizedStackedBar {...lowEdgeProps} />);

      expect(barChart.findAll(BarSegment).length).toStrictEqual(2);
    });

    it('renders 1 bars when given 1 data point', async () => {
      const lowEdgeProps = {
        data: [
          {
            label: 'DuckDuckGo',
            value: 993.9266809283133,
            formattedValue: '$993.93',
          },
        ],
      };
      const barChart = await mount(<NormalizedStackedBar {...lowEdgeProps} />);

      expect(barChart.findAll(BarSegment).length).toStrictEqual(1);
    });

    it('renders 0 bars when given 0', async () => {
      const lowEdgeProps = {
        data: [],
      };

      const barChart = await mount(<NormalizedStackedBar {...lowEdgeProps} />);

      expect(barChart.findAll(BarSegment).length).toStrictEqual(0);
    });
  });

  describe('Data labels', () => {
    it('renders 4 BarLabels when more than 4 data items are provided', async () => {
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

      const barChart = await mount(<NormalizedStackedBar {...highEdgeProps} />);

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

      const barChart = await mount(<NormalizedStackedBar {...lowEdgeProps} />);

      expect(barChart.findAll(BarLabel).length).toStrictEqual(2);
    });

    it('renders 1 BarLabels given only 1 data item is provided', async () => {
      const lowEdgeProps = {
        data: [
          {
            label: 'DuckDuckGo',
            value: 993.9266809283133,
            formattedValue: '$993.93',
          },
        ],
      };

      const barChart = await mount(<NormalizedStackedBar {...lowEdgeProps} />);

      expect(barChart.findAll(BarLabel).length).toStrictEqual(1);
    });

    it('renders the provided formattedValue', async () => {
      const barChart = mount(<NormalizedStackedBar {...mockProps} />);

      expect(barChart.text()).toContain('$993.93');
    });
  });
});
