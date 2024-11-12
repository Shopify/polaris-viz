export {META as default} from './meta';

import {Grid, GridProps} from '../Grid';
import type {Story} from '@storybook/react';
import {CELL_GROUPS, Template} from './data';

export const ResizeableChart: Story<GridProps> = (args: GridProps) => {
  return (
    <div
      style={{
        resize: 'both',
        overflow: 'hidden',
        maxHeight: '100%',
        maxWidth: '100%',
        height: '394px',
      }}
    >
      <Grid {...args} />
    </div>
  );
};

ResizeableChart.args = {
  ...Template.args,
  cellGroups: CELL_GROUPS,
  xAxisOptions: {
    label: 'Recency score',
  },
  yAxisOptions: {
    label: 'Frequency + Monetary score',
  },
};
