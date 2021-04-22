import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';

import {AnnotationLine, AnnotationLineProps} from '../AnnotationLine';

import {colorOptions} from '../../../stories/utils.stories';

const primaryColor = colorOptions[0];

export default {
  title: 'components/Annotation',
  component: AnnotationLine,
  parameters: {},
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: colorOptions,
        defaultValue: primaryColor,
      },
    },
    // Render the prop documentation but without a control.
    xPosition: {
      control: false,
    },
    barWidth: {
      control: false,
    },
    drawableHeight: {
      control: false,
    },
    tooltipContent: {
      control: false,
    },
    ariaLabel: {
      control: false,
    },
    xOffset: {
      control: false,
    },
  },
} as Meta;

const Template: Story<AnnotationLineProps> = (args) => (
  <svg width="100%" height="300px">
    <AnnotationLine {...args} />
  </svg>
);

export const Basic = Template.bind({});
Basic.args = {
  xPosition: 0,
  barWidth: 20,
  drawableHeight: 300,
  width: 5,
  color: 'colorTeal',
  tooltipData: {
    label: 'Median',
    value: '1.5 hours',
  },
  ariaLabel: 'Median: 1.5 hours',
  xOffset: 0.5,
};
