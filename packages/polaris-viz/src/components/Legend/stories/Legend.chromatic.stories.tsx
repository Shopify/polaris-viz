import {storiesOf} from '@storybook/react';
import type {PropCombinations} from '../../../chromatic/types';

import {addWithPropsCombinations} from '../../../chromatic/components/AddWithPropsCombinations';
import {renderCombinationSections} from '../../../chromatic/utilities/renderCombinationSections';

import {LegendItem} from '../components/LegendItem/LegendItem';
import type {LegendItemProps} from '../components/LegendItem/LegendItem';

const stories = storiesOf('Chromatic/Components', module).addParameters({
  docs: {page: null},
  chromatic: {disableSnapshot: false},
});

const DEFAULT_PROPS: PropCombinations<LegendItemProps> = {
  color: ['green'],
  index: [0],
  name: ['Legend Item'],
  value: ['100'],
};

const combinations = renderCombinationSections([
  [
    'Data',
    addWithPropsCombinations<LegendItemProps>(LegendItem, {
      ...DEFAULT_PROPS,
      name: ['Legend', 'Legend with data'],
      shape: ['Bar'],
      value: [undefined, '$200'],
    }),
  ],
  [
    'Shapes',
    addWithPropsCombinations(LegendItem, {
      ...DEFAULT_PROPS,
      shape: [undefined, 'Line', 'Bar'],
    }),
  ],
  [
    'Colors',
    addWithPropsCombinations(LegendItem, {
      ...DEFAULT_PROPS,
      color: ['green', 'blue', 'red'],
      shape: ['Line', 'Bar'],
    }),
  ],
  [
    'isComparison',
    addWithPropsCombinations(LegendItem, {
      ...DEFAULT_PROPS,
      shape: ['Line'],
      isComparison: [false, true],
    }),
  ],
  [
    'Theme',
    addWithPropsCombinations(LegendItem, {
      ...DEFAULT_PROPS,
      theme: [undefined, 'Light'],
    }),
  ],
]);

stories.add('LegendItem', combinations);
