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
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: 10,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Grid {...args} />
    </div>
  );
}

const Template: Story<GridProps> = (args: GridProps) => {
  return (
    <div style={{padding: '50px'}}>
      <div style={{display: 'flex', gap: '20px'}}>
        <GridCard {...args} />
      </div>
    </div>
  );
};

export const TooltipOverflow = Template.bind({});

TooltipOverflow.args = {
  cellGroups: CELL_GROUPS,
  xAxisOptions: {
    label: 'Recency',
  },
  yAxisOptions: {
    label: 'Frequency',
  },
};

TooltipOverflow.parameters = {
  docs: {
    description: {
      story:
        'This story tests that tooltips render correctly when the Grid is inside a container with overflow: hidden.',
    },
  },
};
