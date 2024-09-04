import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {type GridProps} from '../Grid';
import {CELL_GROUPS, DEFAULT_DATA, Template} from './data';

export const Default: Story<GridProps> = Template.bind({});

Default.args = {
  data: DEFAULT_DATA,
  cellGroups: CELL_GROUPS,
  xAxisOptions: {
    label:  'Recency score'
  },
  yAxisOptions: {
    label: 'Frequency + Monetary value score'
  }
};
