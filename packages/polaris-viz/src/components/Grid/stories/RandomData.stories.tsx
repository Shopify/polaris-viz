import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {RANDOM_CELL_GROUPS, RANDOM_DATA, Template} from './data';
import {GridProps} from '../Grid';

export const RandomData: Story<GridProps> = Template.bind({});

RandomData.args = {
  data: RANDOM_DATA,
  cellGroups: RANDOM_CELL_GROUPS,
  xAxisOptions: {label: 'Sales volume'},
  yAxisOptions: {label: 'Profit margin'},
};
