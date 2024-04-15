import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {StackedAreaChart, type StackedAreaChartProps} from '../../../components';

import {DEFAULT_DATA, DEFAULT_PROPS} from './data';

function Card(args: StackedAreaChartProps) {
  return (
    <div
      style={{
        height: 500,
        background: 'white',
        borderRadius: '8px',
        padding: 10,
      }}
    >
      <StackedAreaChart {...args} />
    </div>
  );
}

const Template: Story<StackedAreaChartProps> = (args: StackedAreaChartProps) => {
  return (
    <div style={{overflowY: 'scroll', height:500}}>
      <Card {...args} />
      <div style={{height: 1500, width: 10}} />
    </div>
  );
}



export const ExternalTooltip: Story<StackedAreaChartProps> = Template.bind({});

ExternalTooltip.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
};
