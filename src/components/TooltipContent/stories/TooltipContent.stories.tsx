import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {
  TooltipContent as GeneralTooltip,
  TooltipContentProps,
} from '../../../components';
import {TooltipRowType} from '../TooltipContent';
import {DEFAULT_THEME} from '../../../constants';

export default {
  title: 'Subcomponents/Tooltips/TooltipContent',
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

const defaultProps = {
  title: 'Monday',
  total: {label: 'Total', value: '$10'},
  data: [
    {color: 'red', label: 'Product 1', value: '$0'},
    {color: 'purple', label: 'Product 2', value: '$10'},
  ],
};

export const Default: Story<TooltipContentProps> = Template.bind({});

Default.args = {
  ...defaultProps,
  total: undefined,
  title: undefined,
};

export const WithAnnotations: Story<TooltipContentProps> = Template.bind({});

WithAnnotations.args = {
  data: [
    {
      color: DEFAULT_THEME.seriesColors.upToFour[0],
      label: 'Breakfast',
      value: '-7',
    },
    {color: DEFAULT_THEME.seriesColors.upToFour[1], label: 'Lunch', value: '0'},
    {
      color: 'purple',
      label: 'Median',
      value: '1.5 hours',
      type: TooltipRowType.Annotation,
    },
    {
      color: DEFAULT_THEME.seriesColors.upToFour[2],
      label: 'Dinner',
      value: '0',
    },
  ],
};

export const WithTitle: Story<TooltipContentProps> = Template.bind({});

WithTitle.args = {
  ...defaultProps,
  total: undefined,
};

export const WithTotal: Story<TooltipContentProps> = Template.bind({});
WithTotal.args = defaultProps;
