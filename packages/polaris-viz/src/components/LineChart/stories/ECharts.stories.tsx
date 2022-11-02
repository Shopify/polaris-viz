import React from 'react';

import type {Story} from '@storybook/react';
import type {Meta} from '@storybook/react';

import type {LineChartProps} from '../../../components';

import {EChartsLineChart} from '../EChartsLineChart';
import {LineChart} from '../LineChart';

import {DEFAULT_DATA, DEFAULT_PROPS} from './data';

const Template: Story<LineChartProps> = (args: LineChartProps) => {
  return (
    <>
      <div style={{height: 400, width: '100%'}}>
        <EChartsLineChart {...args} />
      </div>
      <div style={{height: 400, width: '100%'}}>
        <LineChart {...args} />
      </div>
    </>
  );
};

export const Default: Story<LineChartProps> = Template.bind({});

const meta: Meta = {
  title: 'polaris-viz/Charts/EChartsLineChart',
  component: EChartsLineChart,
  decorators: [
    (Story: any) => <div style={{height: 800, width: '100%'}}>{Story()}</div>,
  ],
  parameters: {},
};

Default.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
};

export default meta;
