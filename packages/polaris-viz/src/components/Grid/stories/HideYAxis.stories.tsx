import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {CELL_GROUPS, Template} from './data';
import type {GridProps} from '../Grid';

export const HideYAxis: Story<GridProps> = Template.bind({});

HideYAxis.args = {
  cellGroups: CELL_GROUPS,
  yAxisOptions: {hide: true},
};
