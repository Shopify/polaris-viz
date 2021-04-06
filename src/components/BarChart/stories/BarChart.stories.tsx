import React from 'react';
import {Story, Meta} from '@storybook/react';

import {BarChart, BarChartProps} from '../../../components';
import {Color} from '../../../types';

import {
  colorOptions,
  getDataPoint,
  formatXAxisLabel,
  formatYAxisLabel,
  renderTooltipContent,
} from './utils.stories';
import styles from './BarChart.stories.scss';

const primaryColor = colorOptions[0] as Color;
const secondaryColor = colorOptions[1] as Color;

export default {
  title: 'BarChart',
  component: BarChart,
  decorators: [
    (Story: any) => <div className={styles.Container}>{Story()}</div>,
  ],
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: colorOptions,
        defaultValue: primaryColor,
      },
    },
    highlightColor: {
      control: {
        type: 'select',
        options: colorOptions,
        defaultValue: secondaryColor,
      },
    },
    // Render the prop documentation but without a control.
    formatXAxisLabel: {
      control: false,
    },
    formatYAxisLabel: {
      control: false,
    },
    renderTooltipContent: {
      control: false,
    },
  },
} as Meta;

const Template: Story<BarChartProps> = (args: BarChartProps) => {
  return <BarChart {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  data: [
    {rawValue: getDataPoint(), label: '2020-01-01T12:00:00Z'},
    {rawValue: getDataPoint(), label: '2020-01-02T12:00:00Z'},
    {rawValue: getDataPoint(), label: '2020-01-03T12:00:00Z'},
    {rawValue: getDataPoint(), label: '2020-01-04T12:00:00Z'},
    {rawValue: getDataPoint(), label: '2020-01-05T12:00:00Z'},
    {rawValue: getDataPoint(), label: '2020-01-06T12:00:00Z'},
  ],
  color: primaryColor,
  highlightColor: secondaryColor,
  formatXAxisLabel,
  formatYAxisLabel,
  renderTooltipContent,
  isAnimated: true,
};
