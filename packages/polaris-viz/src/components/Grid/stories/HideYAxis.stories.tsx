import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {CELL_GROUPS, DEFAULT_DATA, Template} from './data';
import {GridProps} from '../Grid';

export const HideYAxis: Story<GridProps> = Template.bind({});

HideYAxis.args = {
  data: DEFAULT_DATA,
  cellGroups: CELL_GROUPS,
  yAxisOptions: {hide: true},
};
