import {storiesOf} from '@storybook/react';
import type {PropCombinations} from '../../../chromatic/types';

import {addWithPropsCombinations} from '../../../chromatic/components/AddWithPropsCombinations';
import {renderCombinationSections} from '../../../chromatic/utilities/renderCombinationSections';

import {SparkLineChart} from '../SparkLineChart';
import type {SparkLineChartProps} from '../SparkLineChart';

const stories = storiesOf('Chromatic/Components', module).addParameters({
  docs: {page: null},
  chromatic: {disableSnapshot: false},
});

const LINE = {
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

const LINE_NULLS = {
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

const DEFAULT_PROPS: PropCombinations<SparkLineChartProps> = {
  data: [[LINE]],
  isAnimated: [false],
};

const OPTIONS = {style: {width: 200, height: 100}};

const combinations = renderCombinationSections([
  [
    'Data',
    addWithPropsCombinations<SparkLineChartProps>(
      SparkLineChart,
      {
        ...DEFAULT_PROPS,
        data: [[LINE], [COMPARISON], [LINE_NULLS], [LINE, COMPARISON]],
      },
      OPTIONS,
    ),
  ],
  [
    'Offsets',
    addWithPropsCombinations(
      SparkLineChart,
      {
        ...DEFAULT_PROPS,
        offsetLeft: [undefined, 30],
        offsetRight: [undefined, 30],
      },
      OPTIONS,
    ),
  ],
]);

stories.add('SparkLineChart', combinations);
