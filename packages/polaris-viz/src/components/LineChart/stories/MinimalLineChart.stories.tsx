import {PolarisVizProvider} from '../../PolarisVizProvider';
import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {LineChart, LineChartProps} from '../..';
import {formatLinearXAxisLabel} from '../../../storybook/utilities';

import {DEFAULT_DATA, DEFAULT_PROPS} from './data';

const MinimalLineChartTemplate: Story<LineChartProps> = (args: LineChartProps) => {
  return (
    <PolarisVizProvider
      themes={{
        Light: {
          chartContainer: {
            padding: '0px',
          },
          grid: {
            showHorizontalLines: false,
            horizontalMargin: 0,
          },
        },
      }}
    >
      <LineChart {...args} />
    </PolarisVizProvider>
  )
};

export const MinimalLineChart: Story<LineChartProps> = MinimalLineChartTemplate.bind({});

MinimalLineChart.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  xAxisOptions: {
    labelFormatter: formatLinearXAxisLabel,
    hide: true,
  },
  yAxisOptions: {
    hide: true,
  },
  showLegend: false,
};
