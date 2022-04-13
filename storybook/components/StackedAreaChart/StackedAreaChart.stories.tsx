import React from 'react';
import type {Story, Meta} from '@storybook/react';
import {StackedAreaChart, StackedAreaChartProps} from '@shopify/polaris-viz';

import {generateMultipleSeries} from '../../utilities/generate-data';
import {
  DATA_SERIES_ARGS,
  LEGEND_CONTROL_ARGS,
  SKIP_LINK_TEXT_ARGS,
  THEME_CONTROL_ARGS,
  X_AXIS_OPTIONS_ARGS,
  Y_AXIS_OPTIONS_ARGS,
} from '../../constants';
import type {RenderTooltipContentData} from '../../../packages/polaris-viz/src/components/StackedAreaChart/types';
import {PageWithSizingInfo} from '../Docs/stories/components/PageWithSizingInfo';

import {formatYAxisLabel} from './utilities';
import {DATA, OVERWRITTEN_SERIES_COLORS} from './data';

const TOOLTIP_CONTENT = {
  empty: undefined,
  Custom: ({data}: RenderTooltipContentData) => (
    <div
      style={{
        background: 'black',
        color: 'white',
        padding: '10px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        fontSize: 12,
      }}
    >
      {data.map(({label, value}, index) => (
        <div key={index}>{`${label}: ${value}`}</div>
      ))}
    </div>
  ),
};

export default {
  title: 'polaris-viz/Default Charts/StackedAreaChart',
  component: StackedAreaChart,
  parameters: {
    controls: {sort: 'requiredFirst', expanded: true},
    docs: {
      page: PageWithSizingInfo,
      description: {
        component:
          'Used to compare multiple series of data and display the total value. This chart is not ideal for displaying datasets with negatives. <br /> ',
      },
    },
  },
  argTypes: {
    data: DATA_SERIES_ARGS,
    isAnimated: {
      description:
        'Whether to animate the chart when it is initially rendered and its data is updated. Even if `isAnimated` is set to true, animations will not be displayed for users with reduced motion preferences.',
    },
    yAxisOptions: Y_AXIS_OPTIONS_ARGS,
    xAxisOptions: X_AXIS_OPTIONS_ARGS,
    renderTooltipContent: {
      options: Object.keys(TOOLTIP_CONTENT),
      mapping: TOOLTIP_CONTENT,
      control: {
        type: 'select',
        labels: {
          empty: 'Default',
          Annotation: 'Custom',
        },
      },
      description:
        'This accepts a function that is called to render the tooltip content. By default it calls `formatXAxisLabel` and `formatYAxisLabel` to format the the tooltip values and passes them to the tooltip. [TooltipData type definition.]()',
    },
    skipLinkText: SKIP_LINK_TEXT_ARGS,
    theme: THEME_CONTROL_ARGS,
    showLegend: LEGEND_CONTROL_ARGS,
  },
} as Meta;

const DEFAULT_PROPS: StackedAreaChartProps = {
  data: DATA,
  skipLinkText: 'Skip chart content',
  yAxisOptions: {labelFormatter: formatYAxisLabel},
  isAnimated: true,
};

const Template: Story<StackedAreaChartProps> = (
  args: StackedAreaChartProps,
) => {
  return <StackedAreaChart {...args} />;
};
export const Default: Story<StackedAreaChartProps> = Template.bind({});
Default.args = DEFAULT_PROPS;

export const HideXAxisLabels: Story<StackedAreaChartProps> = Template.bind({});
HideXAxisLabels.args = {
  ...DEFAULT_PROPS,
  xAxisOptions: {hide: true},
};

export const OverwrittenSeriesColors: Story<StackedAreaChartProps> =
  Template.bind({});
OverwrittenSeriesColors.args = {
  ...DEFAULT_PROPS,
  data: OVERWRITTEN_SERIES_COLORS,
};

export const SeriesColorsUpToFour = Template.bind({});

SeriesColorsUpToFour.args = {
  ...DEFAULT_PROPS,
  data: generateMultipleSeries(4),
};

export const SeriesColorsFromFiveToSeven = Template.bind({});

SeriesColorsFromFiveToSeven.args = {
  ...DEFAULT_PROPS,
  data: generateMultipleSeries(7),
};

export const SeriesColorsUpToFourteen = Template.bind({});

SeriesColorsUpToFourteen.args = {
  ...DEFAULT_PROPS,
  data: generateMultipleSeries(14),
};
