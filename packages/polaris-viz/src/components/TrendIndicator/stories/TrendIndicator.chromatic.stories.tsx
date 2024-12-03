import {storiesOf} from '@storybook/react';

import {addWithPropsCombinations} from '../../../chromatic/components/AddWithPropsCombinations';
import {renderCombinationSections} from '../../../chromatic/utilities/renderCombinationSections';

import {TrendIndicator} from '../TrendIndicator';
import type {TrendIndicatorProps} from '../TrendIndicator';

const stories = storiesOf('Chromatic/Components', module).addParameters({
  docs: {page: null},
  chromatic: {disableSnapshot: false},
});

const combinations = renderCombinationSections([
  [
    'Data',
    addWithPropsCombinations<TrendIndicatorProps>(TrendIndicator, {
      value: ['82%', '123%', '-12%', '0.0%', '10000000%'],
    }),
  ],
  [
    'Trend',
    addWithPropsCombinations<TrendIndicatorProps>(TrendIndicator, {
      value: ['82%'],
      direction: ['upward', 'downward'],
      trend: ['positive', 'negative', 'neutral'],
    }),
  ],
  [
    'Null data',
    addWithPropsCombinations(TrendIndicator, {
      value: [null, undefined],
      trend: ['positive'],
      theme: ['Dark', 'Light'],
    }),
  ],
]);

stories.add('TrendIndicator', combinations);
