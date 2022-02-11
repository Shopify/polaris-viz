import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {Legend} from '../../../components';
import type {LegendProps} from '..';

export default {
  title: 'Essentials/Subcomponents/Legend',
  component: Legend,
  parameters: {
    docs: {
      description: {
        component:
          'Used on multiseries charts to indicate which color is associated with which series. The color preview will appear as a square unless a `lineStyle` is passed. <br /> <br /> With the exception of the `SimpleNormalizedChart`, Polaris Viz components do not include a legend by default. This is to keep the component layout and style flexible. Add a `<Legend />` to the `<MultiSeriesBarChart />`, `<LineChart />`, or `<StackedAreaChart />` when they display multiple series.',
      },
    },
    controls: {
      sort: 'requiredFirst',
      expanded: true,
    },
  },
  argTypes: {
    series: {
      description: 'The series of data to display in the legend.',
    },
    theme: {
      description:
        'The theme optionally controls the color of the series and text.',
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
