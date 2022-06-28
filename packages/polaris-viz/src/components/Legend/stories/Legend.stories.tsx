import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {Legend, LegendProps} from '../..';

import {THEME_CONTROL_ARGS} from '../../../storybook';
import type {LegendData} from '../../../types';

const DATA: LegendData[] = [
  {
    name: 'Direct',
    color: 'green',
    value: '$200',
  },
  {
    name: 'Facebook',
    color: 'blue',
    shape: 'Line',
  },
  {
    name: 'Twitter',
    color: 'red',
    shape: 'Line',
    isComparison: true,
    value: '$100',
  },
];

export default {
  title: 'polaris-viz/Subcomponents/Legend',
  component: Legend,
  parameters: {
    docs: {
      description: {
        component:
          'Used to indicate which color is associated with which series. The color preview will appear as a square unless a `shape` is passed to `LegendData`. <br /> <br /> All charts except spark charts and `SimpleNormalizedChart` include a `Legend` by default.',
      },
    },
    controls: {
      sort: 'requiredFirst',
      expanded: true,
    },
  },
  argTypes: {
    data: {
      description:
        '`name` and `color` props should be passed to each legend to display a title and a color icon. `isComparison`, `shape` and `value` props are optional.'
    },
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
    <div style={{display: 'flex', gap: 10, alignItems: 'start'}}>
      <Legend {...args} />
    </div>
  );
};

export const Default: Story<LegendProps> = Template.bind({});

Default.args = {
  data: DATA,
};
