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
      value: [undefined, '10%', '1000000%'],
      trend: ['positive', 'negative', 'neutral'],
      direction: ['upward', 'downward'],
    }),
  ],
  [
    'Size & Theme',
    addWithPropsCombinations(TrendIndicator, {
      value: [undefined, '10'],
      size: ['default', 'small'],
    }),
  ],
  [
    'Theme',
    addWithPropsCombinations(TrendIndicator, {
      value: ['10'],
      trend: ['positive', 'negative', 'neutral'],
      theme: ['Default', 'Light'],
    }),
  ],
]);

stories.add('TrendIndicator', combinations);
