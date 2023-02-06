import type {Story} from '@storybook/react';

import type {TrendIndicatorProps} from '../TrendIndicator';
import {TrendIndicator} from '../TrendIndicator';

export const Template: Story<TrendIndicatorProps> = (
  args: TrendIndicatorProps,
) => {
  return <TrendIndicator {...args} />;
};
