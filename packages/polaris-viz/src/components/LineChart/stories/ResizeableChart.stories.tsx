export {META as default} from './meta';

import {LineChart, LineChartProps} from '../../../components';
import type {Story} from '@storybook/react';
import {DEFAULT_DATA, DEFAULT_PROPS} from './data';

export const ResizeableChart: Story<LineChartProps> = (
  args: LineChartProps,
) => {
  return (
    <div
      style={{
        overflow: 'hidden',
        height: '100px',
        maxWidth: '200px',
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
