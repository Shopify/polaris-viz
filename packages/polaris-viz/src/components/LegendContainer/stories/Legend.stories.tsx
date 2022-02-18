import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {Legend, LegendProps} from '../../../components';

import {THEME_CONTROL_ARGS} from '../../../storybook';
import type {LegendData} from '../types';

const DATA: LegendData[] = [
  {
    name: 'Solid Icon',
    color: 'green',
  },
  {
    name: 'Line Icon',
    color: 'blue',
    iconType: 'line',
  },
  {
    name: 'Comparison Line',
    color: 'red',
    iconType: 'line',
    isComparison: true,
  },
];

export default {
  title: 'polaris-viz/Subcomponents/Legend',
  component: Legend,
  parameters: {
    docs: {
      description: {
        component:
          'Used to indicate which color is associated with which series. The color preview will appear as a square unless a `iconType` is passed to `LegendData`. <br /> <br /> All charts except spark charts and `SimpleNormalizedChart` include a `Legend` by default.',
      },
    },
    controls: {
      sort: 'requiredFirst',
      expanded: true,
    },
  },
  argTypes: {
    colorVisionType: {
      table: {
        disable: true,
      },
    },
    theme: THEME_CONTROL_ARGS,
  },
} as Meta;

const Template: Story<LegendProps> = (args: LegendProps) => {
  return (
    <div style={{display: 'flex', gap: 10}}>
      <Legend {...args} />
    </div>
  );
};

export const Default: Story<LegendProps> = Template.bind({});

Default.args = {
  data: DATA,
};
