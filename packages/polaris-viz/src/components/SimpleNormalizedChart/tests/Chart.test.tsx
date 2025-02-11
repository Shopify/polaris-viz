import {mount} from '@shopify/react-testing';
import {DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';

import {SimpleNormalizedChart} from '../../../components/SimpleNormalizedChart';
import {mountWithProvider} from '../../../../../polaris-viz-core/src/test-utilities/mountWithProvider';
import {BarSegment, BarLabel} from '../components';
import type {SimpleNormalizedChartProps} from '../SimpleNormalizedChart';

describe('<Chart />', () => {
  const mockProps: SimpleNormalizedChartProps = {
    data: [
      {
        name: 'label0',
        data: [
          {
            key: 'April 2022',
            value: 993.9266809283133,
          },
        ],
      },
      {
        name: 'label1',
        data: [
          {
            key: 'April 2022',
            value: 666.4681407384194,
          },
        ],
      },
      {
        name: 'label2',
        data: [
          {
            key: 'April 2022',
            value: 500,
          },
        ],
      },
      {
        name: 'label3',
        data: [
          {
            key: 'April 2022',
            value: 200,
          },
        ],
      },
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
            name: 'DuckDuckGo',
            data: [
              {
                key: 'April 1',
                value: 993.9266809283133,
              },
            ],
          },
          {
            name: 'Google',
            data: [
              {
                key: 'April 1',
                value: 666.4681407384194,
              },
            ],
          },
          {
            name: 'Yahoo',
            data: [
              {
                key: 'April 1',
                value: 500,
              },
            ],
          },
          {
            name: 'Bing',
            data: [
              {
                key: 'April 1',
                value: 200,
              },
            ],
          },
          {
            name: 'DuckDuck',
            data: [
              {
                key: 'April 1',
                value: 993.9266809283133,
              },
            ],
          },
          {
            name: 'Goog',
            data: [
              {
                key: 'April 1',
                value: 666.4681407384194,
              },
            ],
          },
          {
            name: 'Yah',
            data: [
              {
                key: 'April 1',
                value: 500,
              },
            ],
          },
          {
            name: 'Bin',
            data: [
              {
                key: 'April 1',
                value: 200,
              },
            ],
          },
        ],
      };
      const barChart = mount(<SimpleNormalizedChart {...highEdgeProps} />);

      expect(barChart.findAll(BarSegment)).toHaveLength(4);
    });

    it('renders empty bar when data is empty', () => {
      const lowEdgeProps = {
        data: [],
      };

      const barChart = mountWithProvider(
        <SimpleNormalizedChart {...lowEdgeProps} />,
        {
          themes: {
            [DEFAULT_THEME_NAME]: {
              seriesColors: {
                empty: '#00A',
              },
            },
          },
        },
      );

      const barSegment = barChart.findAll(BarSegment);

      expect(barSegment).toHaveLength(1);
      expect(barSegment[0].props).toStrictEqual(
        expect.objectContaining({scale: 100, color: '#00A'}),
      );
    });

    it('renders empty bar when all data values are 0 or null', () => {
      const lowEdgeProps = {
        data: [
          {name: 'Bin', data: [{key: 'April 1', value: 0}]},
          {name: 'Stuff', data: [{key: 'May 1', value: null}]},
        ],
      };

      const barChart = mountWithProvider(
        <SimpleNormalizedChart {...lowEdgeProps} />,
        {
          themes: {
            [DEFAULT_THEME_NAME]: {
              seriesColors: {
                empty: '#00A',
              },
            },
          },
        },
      );

      const barSegment = barChart.findAll(BarSegment);

      expect(barSegment).toHaveLength(1);
      expect(barSegment[0].props).toStrictEqual(
        expect.objectContaining({scale: 100, color: '#00A'}),
      );
    });

    it('does not render a bar for 0 values', () => {
      const barChart = mount(
        <SimpleNormalizedChart
          data={[
            {name: 'Bin', data: [{key: 'April 1', value: 200}]},
            {name: 'Stuff', data: [{key: 'April 1', value: 0}]},
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
            name: 'DuckDuckGo',
            data: [
              {
                key: 'April 1',
                value: 993.9266809283133,
              },
            ],
          },
          {
            name: 'DuckDuckGo1',
            data: [
              {
                key: 'April 1',
                value: 993.9266809283133,
              },
            ],
          },
          {
            name: 'DuckDuckGo2',
            data: [
              {
                key: 'April 1',
                value: 993.9266809283133,
              },
            ],
          },
          {
            name: 'DuckDuckGo3',
            data: [
              {
                key: 'April 1',
                value: 993.9266809283133,
              },
            ],
          },
          {
            name: 'DuckDuckGo4',
            data: [
              {
                key: 'April 1',
                value: 993.9266809283133,
              },
            ],
          },
          {
            name: 'DuckDuckGo5',
            data: [
              {
                key: 'April 1',
                value: 993.9266809283133,
              },
            ],
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
            name: 'DuckDuckGo',
            data: [
              {
                key: 'April 1',
                value: 993.9266809283133,
              },
            ],
          },
          {
            name: 'DuckDuckGo1',
            data: [{key: 'April 1', value: 993.9266809283133}],
          },
        ],
      };

      const barChart = mount(<SimpleNormalizedChart {...lowEdgeProps} />);

      expect(barChart.findAll(BarLabel)).toHaveLength(2);
    });

    it('renders no labels if showLegend is false', () => {
      const barChart = mount(
        <SimpleNormalizedChart {...mockProps} showLegend={false} />,
      );

      expect(barChart.findAll(BarLabel)).toHaveLength(0);
    });
  });

  describe('renderLegendContent', () => {
    const renderLegendContent = () => (
      <ul>
        <li>Group 1</li>
        <li>Group 2</li>
        <li>Group 3</li>
      </ul>
    );

    it('renders legend content if given', () => {
      const barChart = mount(
        <SimpleNormalizedChart
          {...mockProps}
          renderLegendContent={renderLegendContent}
        />,
      );

      expect(barChart.findAll('li')).toHaveLength(3);
    });

    it('renders no custom legend if showLegend is false', () => {
      const barChart = mount(
        <SimpleNormalizedChart
          {...mockProps}
          showLegend={false}
          renderLegendContent={renderLegendContent}
        />,
      );

      expect(barChart.findAll('li')).toHaveLength(0);
    });

    it('lights to BarLabels if no custom legend is provided', () => {
      const barChart = mount(<SimpleNormalizedChart {...mockProps} />);

      expect(barChart.findAll(BarLabel)).toHaveLength(4);
    });
  });

  describe('Colors', () => {
    it('inherits colors from the theme', () => {
      const barChart = mountWithProvider(
        <SimpleNormalizedChart {...mockProps} />,
        {
          themes: {
            [DEFAULT_THEME_NAME]: {
              seriesColors: {
                all: ['#00A', '#00B', '#00C', '#00D'],
              },
            },
          },
        },
      );

      expect(barChart.find(BarSegment)!.props.color).toStrictEqual('#00A');
    });
  });

  describe('direction', () => {
    it('lights to horizontal direction and passes it to BarSegment', () => {
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
    it('lights to top-left label position and passes it to BarLabel', () => {
      const barChart = mount(<SimpleNormalizedChart {...mockProps} />);

      expect(barChart.find(BarLabel)!.props.legendPosition).toBe('top-left');
    });

    it('accepts bottom-right label position and passes it to BarLabel', () => {
      const barChart = mount(
        <SimpleNormalizedChart {...mockProps} legendPosition="bottom-right" />,
      );

      expect(barChart.find(BarLabel)!.props.legendPosition).toBe(
        'bottom-right',
      );
    });
  });
});
