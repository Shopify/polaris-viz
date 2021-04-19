import React from 'react';
import {Story, Meta} from '@storybook/react';

import {BarChart, BarChartProps} from '../../../components';
import {Color} from '../../../types';

import {
  colorOptions,
  formatXAxisLabel,
  formatYAxisLabel,
  formatNoOperation,
  renderTooltipContent,
  chartData,
  histogramChartData,
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
  data: chartData,
  color: primaryColor,
  highlightColor: secondaryColor,
  formatXAxisLabel,
  formatYAxisLabel,
  renderTooltipContent,
};

export const Annotations = Template.bind({});
Annotations.args = {
  data: histogramChartData,
  color: primaryColor,
  highlightColor: secondaryColor,
  formatXAxisLabel: formatNoOperation,
  formatYAxisLabel: formatNoOperation,
  renderTooltipContent,
  annotations: [
    {
      type: 'line',
      color: 'colorTealText',
      width: 2,
      dataIndex: 1,
      xOffset: 0.5,
      ariaLabel: '...',
    },
  ],
};
