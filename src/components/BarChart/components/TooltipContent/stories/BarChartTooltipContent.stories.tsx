import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {
  TooltipContent as BarChartTooltipContent,
  TooltipContentProps,
} from '../../../components';

export default {
  title: 'Subcomponents/Tooltips/BarChartTooltipContent',
  component: BarChartTooltipContent,
  parameters: {
    controls: {
      sort: 'requiredFirst',
      expanded: true,
    },
    docs: {
      description: {
        component:
          'Used by default with the BarChart component. Exported for extra control over formatting.',
      },
    },
  },
  argTypes: {
    label: {description: 'The label to display in the tooltip.'},
    value: {description: 'The value to display in the tooltip.'},
    annotation: {
      description:
        'An optional annotation that can be shown in the tooltip. [Annotation type definition.](https://github.com/Shopify/polaris-viz/blob/master/src/components/BarChart/types.ts#L61)',
    },
  },
} as Meta;

const Template: Story<TooltipContentProps> = (args: TooltipContentProps) => {
  return (
    <div style={{width: 165}}>
      <BarChartTooltipContent {...args} />
    </div>
  );
};

const defaultProps = {
  label: 'Monday',
  value: '$10',
  annotation: {
    dataIndex: 1,
    width: 100,
    color: 'red',
    tooltipData: {label: 'Median', value: '$10.50'},
  },
};

export const Default = Template.bind({});
Default.args = {...defaultProps, annotation: undefined};

export const WithAnnotation = Template.bind({});
WithAnnotation.args = defaultProps;
