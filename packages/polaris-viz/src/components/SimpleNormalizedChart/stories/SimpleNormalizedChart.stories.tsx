import React, {useState} from 'react';
import type {Story, Meta} from '@storybook/react';

import {
  SimpleNormalizedChart,
  SimpleNormalizedChartProps,
} from '../SimpleNormalizedChart';
import {THEME_CONTROL_ARGS, DATA_ARGS} from '../../../storybook';
import {PageWithSizingInfo} from '../../Docs/stories/components/PageWithSizingInfo';

export default {
  title: 'polaris-viz/Charts/SimpleNormalizedChart',
  component: SimpleNormalizedChart,
  parameters: {
    controls: {sort: 'requiredFirst', expanded: true},
    docs: {
      page: PageWithSizingInfo,
      description: {
        component:
          'Used for positive datasets with two to four items. If your dataset has more than four items, consider grouping the fourth item and the remainder into an “other” category before passing data to the component.  ',
      },
    },
  },
  argTypes: {
    data: DATA_ARGS,
    direction: {description: 'Determines the direction of the chart.'},
    size: {
      description:
        'Determines the width or height of the bar segments depending on `direction`.',
    },
    legendPosition: {
      description: 'Determines the position of the legend.',
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
      name: 'Direct',
      data: [
        {
          key: 'April 2022',
          value: 200,
        },
      ],
    },
    {
      name: 'Facebook',
      data: [
        {
          key: 'April 2022',
          value: 100,
        },
      ],
    },
    {
      name: 'Twitter',
      data: [
        {
          key: 'April 2022',
          value: 100,
        },
      ],
    },
    {
      name: 'Google',
      data: [
        {
          key: 'April 2022',
          value: 20,
        },
      ],
    },
  ],

  direction: 'horizontal',
  size: 'small',
  legendPosition: 'top-left',
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

export const OverwrittenSeriesColors = Template.bind({});
OverwrittenSeriesColors.args = {
  ...defaultProps,
  data: defaultProps.data.map((item, index) => {
    if (index === 0) {
      return {...item, color: 'lime'};
    }
    return item;
  }),
};

export const VerticalSmall = Template.bind({});
VerticalSmall.args = {
  ...defaultProps,
  direction: 'vertical',
  size: 'small',
};

export const HorizontalBottomRightLabel = Template.bind({});
HorizontalBottomRightLabel.args = {
  ...defaultProps,
  legendPosition: 'bottom-right',
};

export const DynamicData = () => {
  const [data, setData] = useState(defaultProps.data);

  const onClick = () => {
    const newData = data.map((item) => {
      const newValue = Math.floor(Math.random() * 200);
      return {
        ...item,
        data: [
          {
            ...item.data[0],
            value: newValue,
          },
        ],
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
