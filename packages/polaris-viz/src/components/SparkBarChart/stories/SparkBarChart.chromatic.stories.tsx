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

const COMPARISON = {
  isComparison: true,
  data: [
    {key: 0, value: 200},
    {key: 1, value: 200},
    {key: 2, value: 200},
    {key: 3, value: 200},
    {key: 4, value: 200},
    {key: 5, value: 200},
    {key: 6, value: 200},
    {key: 7, value: 200},
    {key: 8, value: 200},
    {key: 9, value: 200},
    {key: 10, value: 200},
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
        data: [[BAR], [COMPARISON], [BAR_NULLS], [BAR, COMPARISON]],
      },
      OPTIONS,
    ),
  ],
  [
    'Offsets',
    addWithPropsCombinations(
      SparkBarChart,
      {
        ...DEFAULT_PROPS,
        dataOffsetLeft: [undefined, 30],
        dataOffsetRight: [undefined, 30],
      },
      OPTIONS,
    ),
  ],
]);

stories.add('SparkBarChart', combinations);
