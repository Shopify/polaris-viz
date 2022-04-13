import React from 'react';
import type {Story, Meta} from '@storybook/react';
import {
  LineChartTooltipContent,
  LineChartTooltipContentProps,
} from '@shopify/polaris-viz';

export default {
  title: 'polaris-viz/Subcomponents/Tooltips/LineChartTooltipContent',
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
        'The data to display in the tooltip. [TooltipData type definition.](https://github.com/Shopify/polaris-viz/blob/main/src/components/LineChart/types.ts#L20)',
    },
  },
} as Meta;

const Template: Story<LineChartTooltipContentProps> = (
  args: LineChartTooltipContentProps,
) => {
  return (
    <div style={{width: 190}}>
      <LineChartTooltipContent {...args} />
    </div>
  );
};

export const Default: Story<LineChartTooltipContentProps> = Template.bind({});

Default.args = {
  data: [
    {
      name: 'Primary',
      point: {label: 'Sept. 10, 1989', value: 28},
      lineStyle: 'solid',
    },
  ],
};

export const DashedLine: Story<LineChartTooltipContentProps> = Template.bind(
  {},
);

DashedLine.args = {
  data: [
    {
      name: 'Primary',
      point: {label: 'Sept. 10, 1989', value: 28},
      lineStyle: 'dashed',
    },
  ],
};

export const DottedLine: Story<LineChartTooltipContentProps> = Template.bind(
  {},
);

DottedLine.args = {
  data: [
    {
      name: 'Primary',
      point: {label: 'Sept. 10, 1989', value: 28},
      lineStyle: 'dotted',
    },
  ],
};

export const ColorOverride: Story<LineChartTooltipContentProps> = Template.bind(
  {},
);

ColorOverride.args = {
  data: [
    {
      name: 'Primary',
      point: {label: 'Sept. 10, 1989', value: 28},
      color: 'red',
      lineStyle: 'dotted',
    },
  ],
};
