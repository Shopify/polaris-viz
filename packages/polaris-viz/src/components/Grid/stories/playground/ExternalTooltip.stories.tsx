import type {Story} from '@storybook/react';

import {Grid} from '../../Grid';
import type {GridProps} from '../../Grid';
import {CELL_GROUPS} from '../data';
import {META} from '../meta';

export default {
  ...META,
  title: `${META.title}/Playground`,
  decorators: [],
};

function GridCard(args: GridProps) {
  return (
    <div
      style={{
        height: 400,
        width: 800,
        background: 'white',
        borderRadius: '8px',
        padding: 10,
      }}
    >
      <Grid {...args} />
    </div>
  );
}

const Template: Story<GridProps> = (args: GridProps) => {
  return (
    <div style={{display: 'flex', gap: '20px'}}>
      <GridCard {...args} />
      <GridCard {...args} />
    </div>
  );
};

export const MultipleGridsTooltipPosition = Template.bind({});

MultipleGridsTooltipPosition.args = {
  cellGroups: CELL_GROUPS,
  xAxisOptions: {
    label: 'Recency',
  },
  yAxisOptions: {
    label: 'Frequency',
  },
};
