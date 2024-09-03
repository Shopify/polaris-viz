import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {CELL_GROUPS, DEFAULT_DATA, Template} from './data';
import {GridProps} from '../Grid';

export const HideXAxis: Story<GridProps> = Template.bind({});

HideXAxis.args = {
  data: DEFAULT_DATA,
  cellGroups: CELL_GROUPS,
  xAxisOptions: {hide: true},
};
