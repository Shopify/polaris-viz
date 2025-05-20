export {META as default} from './meta';

import {
  LineChartCumulative,
  LineChartCumulativeProps,
} from '../../../components';
import type {Story} from '@storybook/react';
import {DEFAULT_DATA, DEFAULT_PROPS} from './data';

export const ResizeableChart: Story<LineChartCumulativeProps> = (
  args: LineChartCumulativeProps,
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
      <LineChartCumulative {...args} />
    </div>
  );
};

ResizeableChart.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
};
