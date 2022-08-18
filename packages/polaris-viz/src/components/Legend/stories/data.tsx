import React from 'react';
import type {Story} from '@storybook/react';

import {Legend, LegendProps} from '../Legend';

export const Template: Story<LegendProps> = (args: LegendProps) => {
  return (
    <div style={{display: 'flex', gap: 10, alignItems: 'start'}}>
      <Legend {...args} />
    </div>
  );
};
