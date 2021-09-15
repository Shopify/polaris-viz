import React from 'react';
import {Story, Meta} from '@storybook/react';

import {Sparkbar, SparkbarProps} from 'components/Sparkbar/Sparkbar';
import {DEFAULT_THEME} from 'consts';
import {THEME_CONTROL_ARGS} from 'storybook';

export default {
  title: 'Charts/Sparkbar',
  parameters: {
    controls: {sort: 'requiredFirst', expanded: true},
    docs: {
      description: {
        component:
          'Used in small sizes to give an overview of how a metric has performed over time. <br /> This component inherits its height and width from its container.',
      },
    },
  },
  component: Sparkbar,
  decorators: [
    (Story: any) => (
      <div style={{width: '200px', height: '100px'}}>{Story()}</div>
    ),
  ],
  argTypes: {
    data: {
      description:
        "The prop to determine the chart's bars. Null bars will not be plotted. Bars with the value of `0` will render a very small bar to indicate the presence of the value. [SparkChartData type definition.]()",
    },
    accessibilityLabel: {
      description:
        'Visually hidden text for screen readers.  Make sure to write [informative alt text.](https://medium.com/nightingale/writing-alt-text-for-data-visualization-2a218ef43f81)',
    },
    comparison: {
      description:
        'The prop to determine the comparison line for the chart. [Coordinates type definition.](https://github.com/Shopify/polaris-viz/blob/master/src/components/Sparkbar/Sparkbar.tsx#L27)',
    },
    dataOffsetLeft: {
      description:
        'The amount of pixels to add as a left margin to the bar data.',
    },
    dataOffsetRight: {
      description:
        'The amount of pixels to add as a right margin to the bar data.',
    },
    isAnimated: {
      description: 'Determines whether to animate the chart on state changes.',
    },
    barColor: {
      description: 'If provided, overwrites the theme bar color.',
    },
    theme: THEME_CONTROL_ARGS,
  },
} as Meta;

const Template: Story<SparkbarProps> = (args: SparkbarProps) => {
  return <Sparkbar {...args} />;
};

const comparisonValue = 2000;
const defaultProps = {
  isAnimated: true,
  data: [
    {value: 100},
    {value: 200},
    {value: 300},
    {value: 400},
    {value: 400},
    {value: 100},
    {value: 2000},
    {value: 800},
    {value: 900},
    {value: 200},
    {value: 400},
  ],
  comparison: [
    {x: 0, y: comparisonValue},
    {x: 1, y: comparisonValue},
    {x: 2, y: comparisonValue},
    {x: 3, y: comparisonValue},
    {x: 4, y: comparisonValue},
    {x: 5, y: comparisonValue},
    {x: 6, y: comparisonValue},
    {x: 7, y: comparisonValue},
    {x: 8, y: comparisonValue},
    {x: 9, y: comparisonValue},
    {x: 10, y: comparisonValue},
  ],
  accessibilityLabel:
    'A bar chart showing orders over time for the past 11 weeks. The minimum is 100 orders and the maximum is 1,000 orders, compared to an average of 500 orders during previous 11-week period.',
};

export const Default: Story<SparkbarProps> = Template.bind({});
Default.args = defaultProps;

export const OffsetAndNulls: Story<SparkbarProps> = Template.bind({});
OffsetAndNulls.args = {
  ...defaultProps,
  dataOffsetLeft: 10,
  dataOffsetRight: 20,
  data: [
    {value: 100},
    {value: 200},
    {value: -300},
    {value: null},
    {value: 400},
    {value: 0},
    {value: 0},
    {value: 400},
    {value: 700},
    {value: 900},
    {value: 500},
  ],
};

export const OverwrittenBarColor: Story<SparkbarProps> = Template.bind({});
OverwrittenBarColor.args = {...defaultProps, barColor: 'green'};
