import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {LineChart, LineChartProps} from '../LineChart';
import styles from './LineChart.stories.scss';
import {formatHourlyLabel, HOURLY_DATA} from './utils.stories';

export default {
  title: 'polaris-viz/Default Charts/LineChart/Playground',
  component: LineChart,
  decorators: [
    (Story: any) => <div className={styles.Container}>{Story()}</div>,
  ],
  parameters: {
    controls: {sort: 'requiredFirst', expanded: true},
  },
} as Meta;

const Template: Story<LineChartProps> = (args: LineChartProps) => {
  return <LineChart {...args} />;
};

export const LargeDataSet: Story<LineChartProps> = Template.bind({});
LargeDataSet.args = {
  data: HOURLY_DATA,
  xAxisOptions: {
    xAxisLabels: HOURLY_DATA[0].data.map(({key}) => key),
    labelFormatter: formatHourlyLabel,
  },
};
