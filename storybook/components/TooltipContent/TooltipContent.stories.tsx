import React from 'react';
import type {Story, Meta} from '@storybook/react';
import {
  TooltipContent as GeneralTooltip,
  TooltipContentProps,
} from '@shopify/polaris-viz';

import {DATA, WITH_ANNOTATIONS} from './data';

export default {
  title: 'polaris-viz/Subcomponents/Tooltips/TooltipContent',
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
        'The data and corresponding color displayed in the tooltip. [TooltipData type definition.](https://github.com/Shopify/polaris-viz/blob/main/src/components/TooltipContent/TooltipContent.tsx#L8)',
    },
    title: {description: 'An optional title to display on the tooltip.'},
    total: {description: 'An optional total to display on the tooltip.'},
  },
} as Meta;

const Template: Story<TooltipContentProps> = (args: TooltipContentProps) => {
  return (
    <div style={{width: 170}}>
      <GeneralTooltip {...args} />
    </div>
  );
};

const DEFAULT_PROPS: TooltipContentProps = {
  title: 'Monday',
  total: {label: 'Total', value: '$10'},
  data: DATA,
};

export const Default: Story<TooltipContentProps> = Template.bind({});

Default.args = {
  ...DEFAULT_PROPS,
  total: undefined,
  title: undefined,
};

export const WithAnnotations: Story<TooltipContentProps> = Template.bind({});

WithAnnotations.args = {
  data: WITH_ANNOTATIONS,
};

export const WithTitle: Story<TooltipContentProps> = Template.bind({});

WithTitle.args = {
  ...DEFAULT_PROPS,
  total: undefined,
};

export const WithTotal: Story<TooltipContentProps> = Template.bind({});
WithTotal.args = DEFAULT_PROPS;
