import type {Story} from '@storybook/react';

import type {StackedAreaChartProps} from '../../StackedAreaChart';
import {StackedAreaChart} from '../../StackedAreaChart';
import {META} from '../meta';
import {DEFAULT_DATA, DEFAULT_PROPS} from '../data';
import {useState} from 'react';

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

const TemplateWithFrame: Story<StackedAreaChartProps> = (
  args: StackedAreaChartProps,
) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const props = {...args, scrollContainer: ref};

  return (
    <div style={{overflow: 'hidden', position: 'fixed', inset: 0}}>
      <div style={{height: 100, background: 'black', width: '100%'}}></div>
      <div style={{overflow: 'auto', height: '100vh'}} ref={setRef}>
        <Card {...props} />
        <div style={{height: 700, width: 10}} />
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Card {...props} />
          <Card {...props} />
          <Card {...props} />
        </div>
      </div>
    </div>
  );
};

export const ExternalTooltipPortal: Story<StackedAreaChartProps> =
  Template.bind({});
export const ExternalTooltipWithFrame: Story<StackedAreaChartProps> =
  TemplateWithFrame.bind({});

ExternalTooltipPortal.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
};

ExternalTooltipWithFrame.args = ExternalTooltipPortal.args;
