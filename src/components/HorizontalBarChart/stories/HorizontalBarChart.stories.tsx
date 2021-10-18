import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {
  HorizontalBarChart,
  HorizontalBarChartProps,
} from '../HorizontalBarChart';

import type {Series} from '../types';
import {THEME_CONTROL_ARGS} from '../../../storybook';

const LABELS = ['BCFM 2019', 'BCFM 2020', 'BCFM 2021'];

function buildSeries(items: number[] | number[][]): Series[] {
  return [
    'Womens Leggings',
    'Mens Bottoms',
    'Mens Shorts',
    'Socks',
    'Hats',
    'Ties',
  ].map((name, index) => {
    const item = items[index];
    const array = Array.isArray(item) ? item : [item];
    return {
      name,
      data: array.map((number, dataIndex) => {
        return {rawValue: number, label: LABELS[dataIndex]};
      }),
    };
  });
}

const SERIES = buildSeries([
  [3, 4, 7],
  [0, 0, 0],
  [4, 5, 6],
  [8, 15, 12],
  [48, 8, 50],
  [1, 5, 5],
]);

const CONTAINER_HEIGHT = 500;

const SINGLE_SERIES = buildSeries([3, 7, 4, 8, 4, 1, 4, 6]);

export default {
  title: 'Charts/HorizontalBarChart',
  component: HorizontalBarChart,
  parameters: {
    previewHeight: 'auto',
    docs: {
      description: {
        component:
          'Used to show comparison of different types, across categories or time. Bars can be horizontally stacked or placed one on top of the other. It is recommended that you use a legend whenever displaying multi-series data. <br /> <br /> This component inherits its height and width from its container.',
      },
    },
    controls: {
      sort: 'requiredFirst',
      expanded: true,
    },
  },
  argTypes: {
    series: {
      description:
        'A collection of named data sets to be rendered in the chart. An optional color can be provided for each series, to overwrite the theme `seriesColors` defined in `PolarisVizProvider`. Required.',
    },
    isAnimated: {
      description:
        'Whether to animate the bars when the chart is initially rendered and its data is updated. Even if `isAnimated` is set to true, animations will not be displayed for users with reduced motion preferences.',
    },
    isSimple: {
      description: `Determines what options the chart is rendered with. When \`true\` the chart is:
          <br /><br />
            - Rendered with no xAxis lines or labels.<br />
            - The values for each series is rendered to the right of the series.<br />
            - No Tooltips are rendered on mouse/touch-move`,
    },
    isStacked: {
      description:
        'Changes the grouping of the bars. If `true` the bar groups will stack vertically, otherwise they will render individual bars for each data point in each group.',
    },
    theme: THEME_CONTROL_ARGS,
    xAxisOptions: {
      description: 'An object used to configure the xAxis and its labels.',
      defaultValue: {
        labelFormatter: (value: string) => value,
        hide: false,
      },
    },
  },
} as Meta;

const Template: Story<HorizontalBarChartProps> = (
  args: HorizontalBarChartProps,
) => {
  return (
    <div style={{height: CONTAINER_HEIGHT}}>
      <HorizontalBarChart {...args} />
    </div>
  );
};

const SimpleTemplate: Story<HorizontalBarChartProps> = (
  args: HorizontalBarChartProps,
) => {
  return (
    <div style={{height: CONTAINER_HEIGHT}}>
      <HorizontalBarChart isSimple={true} {...args} />
    </div>
  );
};

export const Default: Story<HorizontalBarChartProps> = Template.bind({});

Default.args = {
  series: SERIES,
};

export const AllNegative: Story<HorizontalBarChartProps> = Template.bind({});

AllNegative.args = {
  series: buildSeries([
    [-3, -4, -7],
    [-7, -1, -1],
    [-4, -5, -6],
    [-8, -15, -12],
    [-48, -8, -50],
    [-1, -5, -5],
  ]),
  isAnimated: false,
};

export const ColorOverrides: Story<HorizontalBarChartProps> = Template.bind({});
ColorOverrides.args = {
  series: [
    {
      name: 'Shirt',
      data: [
        {rawValue: 4, color: 'red', label: 'Yesterday'},
        {rawValue: 7, label: 'Today'},
      ],
    },
    {
      name: 'Pants',
      data: [
        {rawValue: 5, label: 'Yesterday'},
        {rawValue: 6, label: 'Today'},
      ],
    },
    {
      name: 'Shoes',
      data: [
        {rawValue: 15, label: 'Yesterday'},
        {rawValue: 12, label: 'Today'},
      ],
    },
  ],
};

export const FormattedLabels: Story<HorizontalBarChartProps> = Template.bind(
  {},
);

FormattedLabels.args = {
  series: SERIES,
  xAxisOptions: {
    labelFormatter: (value) =>
      `${value} pickled peppers and pickles and a few more things`,
  },
};

export const Simple: Story<HorizontalBarChartProps> = SimpleTemplate.bind({});

Simple.args = {
  series: SINGLE_SERIES,
};

Simple.parameters = {
  docs: {
    description: {
      story: `
The Simple component is rendered without xAxis labels, grid lines & Tooltips on mouse/touch-move.

To change the color of the values displayed to the right of each bar, you can override the \`xAxis.labelColor\` value in your current theme. For more information on overriding theme values, you can refer to the <a href="https://polaris-viz.shopify.io/?path=/docs/providers-polarisvizprovider--default">PolarisVizProvider documentation</a>.
      `,
    },
  },
};

export const DefaultStacked: Story<HorizontalBarChartProps> = Template.bind({});

DefaultStacked.args = {
  series: SERIES,
  isStacked: true,
};

export const SimpleStacked: Story<HorizontalBarChartProps> = SimpleTemplate.bind(
  {},
);

SimpleStacked.args = {
  series: SERIES,
  isStacked: true,
};
