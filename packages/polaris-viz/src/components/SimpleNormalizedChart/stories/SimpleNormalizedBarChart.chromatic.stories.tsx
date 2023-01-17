import {storiesOf} from '@storybook/react';

import {DEFAULT_DATA} from './data';

import {
  addWithPropsCombinations,
  renderCombinationSections,
} from '../../../chromatic';
import {SimpleNormalizedChart} from '../';
import type {SimpleNormalizedChartProps} from '../SimpleNormalizedChart';

const stories = storiesOf('Chromatic/Components', module).addParameters({
  docs: {page: null},
  chromatic: {disableSnapshot: false},
});

const combinations = renderCombinationSections([
  [
    'Labels',
    addWithPropsCombinations<SimpleNormalizedChartProps>(
      SimpleNormalizedChart,
      {
        data: [
          DEFAULT_DATA,
          [
            {
              name: 'Facebook',
              data: [
                {
                  key: 'April 2022',
                  value: 10000000000000000000,
                },
              ],
            },
            {
              name: 'This is an extremely long label which does not get truncated here',
              data: [
                {
                  key: 'April 2022',
                  value: 100,
                },
              ],
            },
            {
              name: 'Google',
              data: [
                {
                  key: 'April 2022',
                  value: 20,
                },
              ],
            },
          ],
        ],
      },
    ),
  ],
]);

stories.add('SimpleNormalizedChart', combinations);
