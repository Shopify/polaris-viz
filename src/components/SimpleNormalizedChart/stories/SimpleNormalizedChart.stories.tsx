import React, {useState} from 'react';
import type {Story, Meta} from '@storybook/react';

import {
  SimpleNormalizedChart,
  SimpleNormalizedChartProps,
} from '../SimpleNormalizedChart';
import {THEME_CONTROL_ARGS} from '../../../storybook';

export default {
  title: 'Simple Charts/SimpleNormalizedChart',
  component: SimpleNormalizedChart,
  parameters: {
    controls: {sort: 'requiredFirst', expanded: true},
    docs: {
      description: {
        component:
          "Used for positive datasets with two to four items. If your dataset has more than four items, consider grouping the fourth item and the remainder into an “other” category before passing data to the component. <br /><br />  This component inherits its height and width from its container. When the Normalized stacked bar chart is oriented horizontally, it is constrained by the parent's width; in vertical direction, it's constrained by the parent's height.",
      },
    },
  },
  argTypes: {
    data: {
      description:
        'Gives the user the ability to define how the bars should look like. The data object also gives the ability to add comparison metric indicators.',
    },
    direction: {description: 'Determines the direction of the chart.'},
    size: {description: 'Determines the width of the chart.'},
    labelPosition: {
      description: 'Determines the position of the labels.',
    },
    theme: THEME_CONTROL_ARGS,
  },
} as Meta;

const Template: Story<SimpleNormalizedChartProps> = (
  args: SimpleNormalizedChartProps,
) => {
  return <SimpleNormalizedChart {...args} />;
};

const defaultProps: SimpleNormalizedChartProps = {
  data: [
    {
      key: 'Direct',
      value: 200,
    },
    {
      key: 'Facebook',
      value: 100,
    },
    {
      key: 'Twitter',
      value: 100,
    },
    {
      key: 'Google',
      value: 20,
    },
  ],
  direction: 'horizontal',
  size: 'small',
  labelPosition: 'top-left',
  labelFormatter: (value) => `$${value}`,
  comparisonMetrics: [
    {
      dataIndex: 2,
      metric: 'Going Up',
      trend: 'positive',
      accessibilityLabel: 'Going Up',
    },
  ],
};

export const Default = Template.bind({});
Default.args = defaultProps;

export const VerticalSmall = Template.bind({});
VerticalSmall.args = {
  ...defaultProps,
  direction: 'vertical',
  size: 'small',
};

export const HorizontalBottomRightLabel = Template.bind({});
HorizontalBottomRightLabel.args = {
  ...defaultProps,
  labelPosition: 'bottom-right',
};

export const DynamicData = () => {
  const [data, setData] = useState(defaultProps.data);

  const onClick = () => {
    const newData = data.map((item) => {
      const newValue = Math.floor(Math.random() * 200);
      return {
        ...item,
        value: newValue,
        formattedValue: `$${newValue}`,
      };
    });
    setData(newData);
  };

  return (
    <>
      <SimpleNormalizedChart data={data} direction="horizontal" size="small" />
      <button onClick={onClick}>Change Data</button>
    </>
  );
};
