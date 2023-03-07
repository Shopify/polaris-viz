import {storiesOf} from '@storybook/react';

import {
  addWithPropsCombinations,
  renderCombinationSections,
} from '../../../chromatic';
import {TrendIndicator} from '../';
import type {TrendIndicatorProps} from '../';

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
    }),
  ],
  [
    'Size & Theme',
    addWithPropsCombinations(TrendIndicator, {
      value: ['82%'],
      size: ['default', 'small'],
      trend: ['positive', 'negative', 'neutral'],
      theme: ['Default', 'Light'],
    }),
  ],
  [
    'Null data',
    addWithPropsCombinations(TrendIndicator, {
      value: [null, undefined],
      size: ['default', 'small'],
      trend: ['positive'],
      theme: ['Default', 'Light'],
    }),
  ],
]);

stories.add('TrendIndicator', combinations);
