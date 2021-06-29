import React from 'react';
import {Story, Meta} from '@storybook/react';

import {
  TooltipContent as LineChartTooltipContent,
  TooltipContentProps,
} from '../../../components';

export default {
  title: 'Subcomponents/LineChartTooltipContent',
  component: LineChartTooltipContent,
  parameters: {
    controls: {
      sort: 'requiredFirst',
      expanded: true,
    },
    docs: {
      description: {
        component:
          'Used by default with the LineChart component. Exported for extra control over formatting.',
      },
    },
  },
  argTypes: {
    data: {
      description:
        'The data to display in the tooltip. [TooltipData type definition.](https://github.com/Shopify/polaris-viz/blob/master/src/components/LineChart/types.ts#L20)',
    },
  },
} as Meta;

const Template: Story<TooltipContentProps> = (args: TooltipContentProps) => {
  return (
    <div style={{width: 180}}>
      <LineChartTooltipContent {...args} />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  data: [
    {
      name: 'Primary',
      point: {label: 'Sept. 10, 1989', value: 28},
      color: 'red',
      lineStyle: 'solid',
    },
  ],
};

export const DashedLine = Template.bind({});

DashedLine.args = {
  data: [
    {
      name: 'Primary',
      point: {label: 'Sept. 10, 1989', value: 28},
      color: 'red',
      lineStyle: 'dashed',
    },
  ],
};

export const DottedLine = Template.bind({});

DottedLine.args = {
  data: [
    {
      name: 'Primary',
      point: {label: 'Sept. 10, 1989', value: 28},
      color: 'red',
      lineStyle: 'dotted',
    },
  ],
};
