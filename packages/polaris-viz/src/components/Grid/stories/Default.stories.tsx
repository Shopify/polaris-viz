import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {Grid, type GridProps} from '../Grid';
import {CELL_GROUPS, DEFAULT_DATA, Template} from './data';

export const Default: Story<GridProps> = Template.bind({});

Default.args = {
  data: DEFAULT_DATA,
  cellGroups: CELL_GROUPS,
};
