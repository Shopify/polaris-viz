import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {type GridProps} from '../Grid';
import {CELL_GROUPS, Template} from './data';

export const Default: Story<GridProps> = Template.bind({});

Default.args = {
  cellGroups: CELL_GROUPS,
  xAxisOptions: {
    label:  'Recency score'
  },
  yAxisOptions: {
    label: 'Frequency + Monetary value score'
  }
};
