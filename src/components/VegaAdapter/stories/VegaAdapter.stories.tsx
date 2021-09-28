import React from 'react';
import {Story, Meta} from '@storybook/react';

import {VegaAdapter, VegaAdapterProps} from '../../../components';

export default {
  title: 'Charts/VegaAdapter',
  component: VegaAdapter,
  parameters: {
    docs: {
      description: {
        component: 'Used with multi-series chart components by default.',
      },
    },
    controls: {
      sort: 'requiredFirst',
      expanded: true,
    },
  },
  argTypes: {},
} as Meta;

const Template: Story<VegaAdapterProps> = (args: VegaAdapterProps) => {
  return <VegaAdapter {...args}></VegaAdapter>;
};

const Default: Story = Template.bind({});

export const Bar: Story = Template.bind({});

Bar.args = {
  data: {
    values: [
      {a: 'A', b: 100},
      {a: 'B', b: 55},
      {a: 'C', b: 43},
      {a: 'D', b: 91},
      {a: 'E', b: 81},
    ],
  },
  mark: 'bar',
  encoding: {
    x: {field: 'a' /*, type: 'nominal' , axis: {labelAngle: 0}*/},
    y: {field: 'b' /*, type: 'quantitative'*/},
  },
};

export const Line: Story = Template.bind({});

Line.args = {
  data: {
    values: [
      {a: 'A', b: 100},
      {a: 'B', b: 55},
      {a: 'C', b: 43},
      {a: 'D', b: 91},
      {a: 'E', b: 81},
    ],
  },
  mark: 'line',
  encoding: {
    x: {field: 'a' /*, type: 'nominal' , axis: {labelAngle: 0}*/},
    y: {field: 'b' /*, type: 'quantitative'*/},
  },
};
