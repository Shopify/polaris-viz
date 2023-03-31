import type {Story} from '@storybook/react';

import type {TrendIndicatorProps} from '../TrendIndicator';
import {TrendIndicator} from '../TrendIndicator';

export const Template: Story<TrendIndicatorProps> = (
  args: TrendIndicatorProps,
) => {
  return (
    <div
      style={{
        display: 'flex',
        height: 400,
        width: 400,
        background: 'white',
        borderRadius: 20,
        padding: 10,
        boxShadow:
          '0rem 0.125rem 0.25rem rgba(31, 33, 36, 0.1), 0rem 0.0625rem 0.375rem rgba(31, 33, 36, 0.05)',
      }}
    >
      <div style={{marginLeft: 'auto'}}>
        <TrendIndicator {...args} />
      </div>
    </div>
  );
};
