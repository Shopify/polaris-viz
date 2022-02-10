import React from 'react';
import type {Meta, Story} from '@storybook/react/types-6-0';

import {
  LinearGradientWithStops,
  LinearGradientWithStopsProps,
} from '../LinearGradientWithStops';
import {XMLNS} from '../../../constants';

export default {
  title: 'Core/LinearGradient',
  component: LinearGradientWithStops,
  parameters: {
    controls: {sort: 'requiredFirst', expanded: true},
    docs: {
      description: {
        component:
          'Used to create gradients on charts and their subcomponents. SVG elements reference the `<LinearGradientWithStops />` by ID.',
      },
    },
  },
  argTypes: {
    id: {
      control: false,
      description:
        'A unique ID to be used by the SVG element referencing the gradient.',
    },
    gradient: {
      description:
        'An array of stops that describe the gradient. [GradientStop type definition.]()',
    },
    gradientUnits: {
      description:
        'The [coordinate system](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/gradientUnits) used for the gradient. Can be a length or percent.',
    },
    x1: {
      description:
        'The [x starting point](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/x1) used for the gradient. Can be a length or percent.',
    },
    x2: {
      description:
        'The [x ending point](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/x2) used for the gradient. Can be a length or percent.',
    },
    y1: {
      description:
        'The [y starting point](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/y1) used for the gradient. Can be a length or percent.',
    },
    y2: {
      description:
        'The [y ending point](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/y2) used for the gradient. Can be a length or percent.',
    },
  },
} as Meta;

const Template: Story<LinearGradientWithStopsProps> = (args) => (
  <svg viewBox="0 0 500 500" xmlns={XMLNS} height={500} width={500}>
    <LinearGradientWithStops {...args} />
    <rect x="0" y="0" width="500" height="500" fill="url(#sampleGradient)" />
  </svg>
);

export const Default: Story<LinearGradientWithStopsProps> = Template.bind({});

const purple = '#5052b3';
const negativePurple = '#39337f';
const green = '#1bbe9e';

Default.args = {
  id: 'sampleGradient',
  gradient: [
    {
      color: negativePurple,
      offset: 0,
    },
    {
      color: purple,
      offset: 50,
    },
    {
      color: green,
      offset: 100,
    },
  ],
};
