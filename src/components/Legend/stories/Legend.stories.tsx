import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {Legend} from '../../../components';
import type {LegendProps} from '..';

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

export const SquareLegend: Story<LegendProps> = Template.bind({});
SquareLegend.args = {
  series: [{name: 'Sales'}, {name: 'Visits'}],
};

export const DottedLineLegend: Story<LegendProps> = Template.bind({});
DottedLineLegend.args = {
  series: [
    {lineStyle: 'dotted', name: 'Sales'},
    {lineStyle: 'dotted', name: 'Visits'},
  ],
};

export const DashedLineLegend: Story<LegendProps> = Template.bind({});
DashedLineLegend.args = {
  series: [
    {lineStyle: 'dashed', name: 'Sales'},
    {lineStyle: 'dashed', name: 'Visits'},
  ],
};

export const LineLegend: Story<LegendProps> = Template.bind({});
LineLegend.args = {
  series: [
    {lineStyle: 'solid', name: 'Sales'},
    {lineStyle: 'dashed', name: 'Visits'},
  ],
};

export const ColorOverrides: Story<LegendProps> = Template.bind({});
ColorOverrides.args = {
  series: [
    {name: 'Sales', color: 'red'},
    {name: 'Visits', color: 'purple'},
    {name: 'Comparison', color: 'yellow', lineStyle: 'dashed'},
  ],
};
