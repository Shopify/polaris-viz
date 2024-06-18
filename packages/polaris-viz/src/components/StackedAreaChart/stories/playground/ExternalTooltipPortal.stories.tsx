import type {Story} from '@storybook/react';

import type {StackedAreaChartProps} from '../../StackedAreaChart';
import {StackedAreaChart} from '../../StackedAreaChart';
import {META} from '../meta';
import {DEFAULT_DATA, DEFAULT_PROPS} from '../data';

export default {
  ...META,
  title: `${META.title}/Playground`,
  decorators: [],
};

function Card(args: StackedAreaChartProps) {
  return (
    <div
      style={{
        height: 400,
        width: 400,
        background: 'white',
        borderRadius: '8px',
        padding: 10,
      }}
    >
      <StackedAreaChart {...args} theme="Uplift" />
    </div>
  );
}

const Template: Story<StackedAreaChartProps> = (
  args: StackedAreaChartProps,
) => {
  return (
    <div style={{overflow: 'auto'}}>
      <Card {...args} />
      <div style={{height: 700, width: 10}} />
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Card {...args} />
        <Card {...args} />
        <Card {...args} />
      </div>
    </div>
  );
};

export const ExternalTooltipPortal: Story<StackedAreaChartProps> =
  Template.bind({});

ExternalTooltipPortal.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
};
