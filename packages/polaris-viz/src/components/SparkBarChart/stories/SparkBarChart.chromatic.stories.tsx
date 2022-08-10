import {storiesOf} from '@storybook/react';
import type {PropCombinations} from '../../../chromatic/types';

import {
  addWithPropsCombinations,
  renderCombinationSections,
} from '../../../chromatic';
import {SparkBarChart} from '../';
import type {SparkBarChartProps} from '../SparkBarChart';

const stories = storiesOf('Chromatic/Components', module).addParameters({
  docs: {page: null},
  chromatic: {disableSnapshot: false},
});

const BAR = {
  data: [
    {key: 0, value: 100},
    {key: 1, value: 50},
    {key: 2, value: 622},
    {key: 3, value: 200},
    {key: 4, value: 400},
    {key: 5, value: 1000},
    {key: 6, value: 200},
    {key: 7, value: 800},
    {key: 8, value: 900},
    {key: 9, value: 200},
    {key: 10, value: 100},
  ],
};

const BAR_NULLS = {
  data: [
    {key: 0, value: 100},
    {key: 1, value: 50},
    {key: 2, value: null},
    {key: 3, value: 200},
    {key: 4, value: 400},
    {key: 5, value: 1000},
    {key: 6, value: null},
    {key: 7, value: 800},
    {key: 8, value: 900},
    {key: 9, value: 200},
    {key: 10, value: 100},
  ],
};

const DEFAULT_PROPS: PropCombinations<SparkBarChartProps> = {
  data: [[BAR]],
  isAnimated: [false],
};

const OPTIONS = {style: {width: 200, height: 100}};

const combinations = renderCombinationSections([
  [
    'Data',
    addWithPropsCombinations<SparkBarChartProps>(
      SparkBarChart,
      {
        ...DEFAULT_PROPS,
        data: [[BAR], [BAR_NULLS]],
      },
      OPTIONS,
    ),
  ],
  [
    'Target Line',
    addWithPropsCombinations(
      SparkBarChart,
      {
        ...DEFAULT_PROPS,
        targetLine: [
          undefined,
          {
            offsetLeft: 10,
            offsetRight: 20,
            value: 0,
          },
          {
            offsetLeft: 0,
            offsetRight: 0,
            value: 700,
          },
          {
            offsetLeft: 50,
            offsetRight: 50,
            value: 500,
          },
        ],
      },
      OPTIONS,
    ),
  ],
]);

stories.add('SparkBarChart', combinations);
