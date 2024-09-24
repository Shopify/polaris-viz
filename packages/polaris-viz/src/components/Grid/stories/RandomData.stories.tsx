import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {RANDOM_CELL_GROUPS, Template} from './data';
import {GridProps} from '../Grid';

export const RandomData: Story<GridProps> = Template.bind({});

RandomData.args = {
  cellGroups: RANDOM_CELL_GROUPS,
  xAxisOptions: {label: 'Sales volume'},
  yAxisOptions: {label: 'Profit margin'},
};
