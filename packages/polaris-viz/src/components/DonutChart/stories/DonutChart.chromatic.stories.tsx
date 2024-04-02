import {storiesOf} from '@storybook/react';
import type {PropCombinations} from '../../../chromatic/types';

import {
  addWithPropsCombinations,
  renderCombinationSections,
} from '../../../chromatic';
import {DonutChart} from '../';
import type {DonutChartProps} from '../DonutChart';
import {DEFAULT_DATA} from './data';

const stories = storiesOf('Chromatic/Components', module).addParameters({
  docs: {page: null},
  chromatic: {disableSnapshot: false},
});

const DEFAULT_PROPS: PropCombinations<DonutChartProps> = {
  data: [DEFAULT_DATA],
  comparisonMetric: [
    {
      metric: '6%',
      trend: 'positive',
      accessibilityLabel: 'trending up 6%',
    },
  ],
  legendPosition: ['left'],
  isAnimated: [false],
};

const CHART_SIZE = {style: {width: 500, height: 300}};

const combinations = renderCombinationSections([
  [
    'Data',
    addWithPropsCombinations<DonutChartProps>(
      DonutChart,
      {
        ...DEFAULT_PROPS,
      },
      CHART_SIZE,
    ),
  ],
  [
    'Legend Position',
    addWithPropsCombinations(
      DonutChart,
      {
        ...DEFAULT_PROPS,
        legendPosition: [
          'top-left',
          'top-right',
          'bottom-left',
          'bottom-right',
          'top',
          'right',
          'bottom',
          'left',
        ],
      },
      CHART_SIZE,
    ),
  ],
  [
    'Truncated Legends',
    addWithPropsCombinations(
      DonutChart,
      {
        ...DEFAULT_PROPS,
        data: [
          [
            {
              name: 'This is a long name that will get truncated',
              data: [{key: 'april - march', value: 50000}],
              metadata: {
                trend: {
                  value: '5%',
                },
              },
            },
            {
              name: 'This is another long name that will get truncated',
              data: [{key: 'april - march', value: 250000}],
              metadata: {
                trend: {
                  value: '50%',
                  direction: 'downward',
                  trend: 'negative',
                },
              },
            },
            {
              name: 'This is the last long name that will get truncated',
              data: [{key: 'april - march', value: 10000}],
              metadata: {
                trend: {
                  value: '100%',
                  direction: 'upward',
                  trend: 'positive',
                },
              },
            },
          ],
        ],
        legendPosition: ['left', 'right'],
        showLegendValues: [true, false],
      },
      CHART_SIZE,
    ),
  ],
]);

stories.add('DonutChart', combinations);
