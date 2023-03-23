import {PolarisVizProvider} from '../../PolarisVizProvider';
import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {LineChart, LineChartProps} from '../..';

import {DEFAULT_DATA, DEFAULT_PROPS} from './data';

const HideYAxisTemplate: Story<LineChartProps> = (args: LineChartProps) => {
  const themeOverrides = {
    chartContainer: {
      // padding: '0px',
    },
    grid: {
      // showHorizontalLines: false,
      horizontalMargin: 0, //controls right gap
      horizontalOverflow: false,
    },

  }
  return (
    <PolarisVizProvider
      themes={{
        Default: themeOverrides,
        Light: themeOverrides,
      }}
    >
      <LineChart {...args} />
    </PolarisVizProvider>
  )
};

export const HideYAxis: Story<LineChartProps> = HideYAxisTemplate.bind({});

HideYAxis.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  yAxisOptions: {
    hide: true,
  },
};
