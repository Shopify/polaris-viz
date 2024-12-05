export {META as default} from './meta';

import {LineChart} from '../LineChart';
import type {LineChartProps} from '../LineChart';

import type {Story} from '@storybook/react';
import {DEFAULT_DATA, DEFAULT_PROPS} from './data';

export const ResizeableChart: Story<LineChartProps> = (
  args: LineChartProps,
) => {
  return (
    <div
      style={{
        resize: 'both',
        overflow: 'hidden',
        maxHeight: '100%',
        maxWidth: '100%',
      }}
    >
      <LineChart {...args} />
    </div>
  );
};

ResizeableChart.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
};
