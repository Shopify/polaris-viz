import React from 'react';
import {Story, Meta} from '@storybook/react';

import {
  NormalizedStackedBarChart,
  NormalizedStackedBarChartProps,
} from 'components/NormalizedStackedBarChart/NormalizedStackedBarChart';
import {THEME_CONTROL_ARGS} from 'storybook';

export default {
  title: 'Charts/NormalizedStackedBarChart',
  component: NormalizedStackedBarChart,
  parameters: {
    controls: {sort: 'requiredFirst', expanded: true},
    docs: {
      description: {
        component:
          'Used for positive datasets with two to four items. If your dataset has more than four items, consider grouping the fourth item and the remainder into an “other” category before passing data to the component. <br /> This component inherits its height and width from its container.',
      },
    },
  },
  argTypes: {
    data: {
      description:
        'Gives the user the ability to define how the bars should look like. [Data type definition.](https://github.com/Shopify/polaris-viz/blob/master/src/components/NormalizedStackedBarChart/types.ts#L7)',
    },
    orientation: {description: 'Determines the orientation of the chart.'},
    size: {description: 'Determines the width of the chart.'},
    theme: THEME_CONTROL_ARGS,
  },
} as Meta;

const Template: Story<NormalizedStackedBarChartProps> = (
  args: NormalizedStackedBarChartProps,
) => {
  return <NormalizedStackedBarChart {...args} />;
};

const defaultProps = {
  data: [
    {
      label: 'Direct',
      value: 200,
      formattedValue: '$200',
      comparisonMetric: {
        metric: '5',
        trend: 'positive',
        accessibilityLabel: 'Increase of',
      },
    },
    {
      label: 'Facebook',
      value: 100,
      formattedValue: '$100',
      comparisonMetric: {
        metric: '5',
        trend: 'negative',
        accessibilityLabel: 'Decrease of',
      },
    },
    {
      label: 'Twitter',
      value: 100,
      formattedValue: '$100',
      comparisonMetric: {
        metric: '5',
        trend: 'neutral',
        accessibilityLabel: 'Decrease of',
      },
    },
    {
      label: 'Google',
      value: 20,
      formattedValue: '$20',
    },
  ],
  orientation: 'horizontal',
  size: 'small',
};

export const Default = Template.bind({});
Default.args = defaultProps;

export const VerticalSmall = Template.bind({});
VerticalSmall.args = {...defaultProps, orientation: 'vertical', size: 'small'};
