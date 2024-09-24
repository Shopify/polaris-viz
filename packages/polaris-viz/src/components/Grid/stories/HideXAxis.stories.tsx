import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {CELL_GROUPS, Template} from './data';
import {GridProps} from '../Grid';

export const HideXAxis: Story<GridProps> = Template.bind({});

HideXAxis.args = {
  cellGroups: CELL_GROUPS,
  xAxisOptions: {hide: true},
};
