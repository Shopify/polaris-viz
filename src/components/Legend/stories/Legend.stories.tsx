import React from 'react';
import {Story, Meta} from '@storybook/react';

import {Legend, LegendProps} from '../../../components';

export default {
  title: 'Subcomponents/Legend',
  component: Legend,
  parameters: {
    docs: {
      description: {
        component: 'Should be used with multi-series chart components.',
      },
    },
    controls: {
      sort: 'requiredFirst',
      expanded: true,
    },
  },
  argTypes: {
    series: {
      theme: 'The theme optionally controls the color of the text',
      description: 'The series of data to display in the legend.',
    },
  },
} as Meta;

const Template: Story<LegendProps> = (args: LegendProps) => {
  return (
    <div style={{display: 'flex'}}>
      <Legend {...args} />
    </div>
  );
};

export const SquareLegend = Template.bind({});
SquareLegend.args = {
  theme: 'Default',
  series: [
    {name: 'Sales', color: 'red'},
    {name: 'Visits', color: 'purple'},
  ],
};

export const GradientSquareLegend = Template.bind({});
GradientSquareLegend.args = {
  theme: 'Default',
  series: [
    {
      name: 'Sales',
      color: [
        {offset: 0, color: 'red'},
        {offset: 80, color: 'purple'},
      ],
    },
    {
      name: 'Visits',
      color: [
        {offset: 0, color: 'green'},
        {offset: 80, color: 'yellow'},
      ],
    },
  ],
};

export const GradientLineLegend = Template.bind({});
GradientLineLegend.args = {
  theme: 'Default',
  series: [
    {
      name: 'Sales',
      lineStyle: 'normal',
      color: [
        {offset: 0, color: 'red'},
        {offset: 80, color: 'purple'},
      ],
    },
    {
      name: 'Visits',
      lineStyle: 'normal',
      color: [
        {offset: 0, color: 'green'},
        {offset: 80, color: 'yellow'},
      ],
    },
  ],
};

export const DottedLineLegend = Template.bind({});
DottedLineLegend.args = {
  theme: 'Default',
  series: [
    {lineStyle: 'dotted', name: 'Sales', color: 'red'},
    {lineStyle: 'dotted', name: 'Visits', color: 'purple'},
  ],
};

export const DashedLineLegend = Template.bind({});
DashedLineLegend.args = {
  theme: 'Default',
  series: [
    {lineStyle: 'dashed', name: 'Sales', color: 'red'},
    {lineStyle: 'dashed', name: 'Visits', color: 'purple'},
  ],
};

export const LineLegend = Template.bind({});
LineLegend.args = {
  theme: 'Default',
  series: [
    {lineStyle: 'solid', name: 'Sales', color: 'red'},
    {lineStyle: 'solid', name: 'Visits', color: 'purple'},
  ],
};
