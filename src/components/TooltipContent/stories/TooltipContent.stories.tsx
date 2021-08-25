import React from 'react';
import {Story, Meta} from '@storybook/react';

import {
  TooltipContent as GeneralTooltip,
  TooltipContentProps,
} from '../../../components';

export default {
  title: 'Subcomponents/TooltipContent',
  component: GeneralTooltip,
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
  argTypes: {
    data: {
      description:
        'The data and corresponding color displayed in the tooltip. [TooltipData type definition.](https://github.com/Shopify/polaris-viz/blob/master/src/components/TooltipContent/TooltipContent.tsx#L8)',
    },
    title: {description: 'An optional title to display on the tooltip.'},
    total: {description: 'An optional total to display on the tooltip.'},
  },
} as Meta;

const Template: Story<TooltipContentProps> = (args: TooltipContentProps) => {
  return (
    <div style={{width: 150}}>
      <GeneralTooltip {...args} />
    </div>
  );
};

const defaultProps = {
  title: 'Monday',
  total: {label: 'Total', value: '$10'},
  data: [
    {color: 'red', label: 'Product 1', value: '$0'},
    {color: 'purple', label: 'Product 2', value: '$10'},
  ],
};

export const Default = Template.bind({});

Default.args = {
  ...defaultProps,
  total: undefined,
  title: undefined,
};

export const WithTitle = Template.bind({});

WithTitle.args = {
  ...defaultProps,
  total: undefined,
};

export const WithTotal = Template.bind({});
WithTotal.args = defaultProps;
