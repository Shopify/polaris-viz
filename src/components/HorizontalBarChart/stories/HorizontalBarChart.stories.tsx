import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {
  HorizontalBarChart,
  HorizontalBarChartProps,
} from '../HorizontalBarChart';

import type {RenderTooltipContentData} from '../types';
import {getSingleColor, THEME_CONTROL_ARGS} from '../../../storybook';
import {
  buildSeries,
  COLOR_OVERRIDE_SERIES,
  COMPARISON_SERIES,
  SERIES,
} from '../../../storybook/horizontal-charts';

const CONTAINER_HEIGHT = 500;

const TOOLTIP_CONTENT = {
  empty: undefined,
  Custom: ({data}: RenderTooltipContentData) => {
    return data.map(({value, label, color}) => {
      return (
        <div
          style={{
            color: getSingleColor(color),
            padding: '10px',
          }}
          key={label}
        >
          {`${label}: ${value} pickles`}
        </div>
      );
    });
  },
};

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
    data: {
      description:
        'A collection of named data sets to be rendered in the chart. An optional color can be provided for each series, to overwrite the theme `seriesColors` defined in `PolarisVizProvider`. Required.',
    },
    isAnimated: {
      description:
        'Whether to animate the bars when the chart is initially rendered and its data is updated. Even if `isAnimated` is set to true, animations will not be displayed for users with reduced motion preferences.',
    },
    renderTooltipContent: {
      description:
        'Accepts a function that renders the tooltip content. By default it calls `xAxisOptions.labelFormatter` to format the the tooltip values and passes them to `<TooltipContent />`.',
      options: Object.keys(TOOLTIP_CONTENT),
      mapping: TOOLTIP_CONTENT,
      control: {
        type: 'select',
        labels: {
          empty: 'Default',
          Annotation: 'Custom',
        },
      },
    },
    theme: THEME_CONTROL_ARGS,
    type: {
      description:
        'Changes the grouping of the bars. If `stacked` the bar groups will stack vertically, otherwise they will render individual bars for each data point in each group.',
    },
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

export const Default: Story<HorizontalBarChartProps> = Template.bind({});

Default.args = {
  data: SERIES,
};

export const AllNegative: Story<HorizontalBarChartProps> = Template.bind({});

AllNegative.args = {
  data: buildSeries([
    [-3, -4, -7],
    [-7, -1, -1],
    [-4, -5, -6],
    [-8, -15, -12],
    [-48, -8, -50],
    [-1, -5, -5],
  ]),
  isAnimated: false,
};

export const Comparison: Story<HorizontalBarChartProps> = Template.bind({});

Comparison.args = {
  data: COMPARISON_SERIES,
};

export const ColorOverrides: Story<HorizontalBarChartProps> = Template.bind({});
ColorOverrides.args = {
  data: COLOR_OVERRIDE_SERIES,
};

export const FormattedLabels: Story<HorizontalBarChartProps> = Template.bind(
  {},
);

FormattedLabels.args = {
  data: SERIES,
  xAxisOptions: {
    labelFormatter: (value) =>
      `${value} pickled peppers and pickles and a few more things`,
  },
};

export const Stacked: Story<HorizontalBarChartProps> = Template.bind({});

Stacked.args = {
  data: SERIES,
  type: 'stacked',
};
