import type {Story} from '@storybook/react';

import type {LegendProps} from '../Legend';
import {Legend} from '../Legend';

export const Template: Story<LegendProps> = (args: LegendProps) => {
  return (
    <div style={{display: 'flex', gap: 10, alignItems: 'start'}}>
      <Legend {...args} />
    </div>
  );
};
