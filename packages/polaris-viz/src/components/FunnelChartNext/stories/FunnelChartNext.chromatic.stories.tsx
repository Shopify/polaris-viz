import type {Story} from '@storybook/react';

export default {
  ...META,
  title: 'polaris-viz/Chromatic/Charts/FunnelChartNext',
  parameters: {
    ...META.parameters,
    chromatic: {disableSnapshot: false},
  },
};

import {DEFAULT_DATA, Template} from './data';
import {META} from './meta';
import type {FunnelChartNextProps} from '../FunnelChartNext';

export const Default: Story<FunnelChartNextProps> = Template.bind({});

const yAxisOptions = {
  labelFormatter: (value) => {
    return new Intl.NumberFormat('en', {
      style: 'decimal',
      maximumFractionDigits: 2,
    }).format(Number(value));
  },
};

const tooltipLabels = {
  reached: 'Reached this step',
  dropped: 'Dropped off',
};

Default.args = {
  data: DEFAULT_DATA,
  yAxisOptions: yAxisOptions,
  tooltipLabels: tooltipLabels,
};

export const HideSummary: Story<FunnelChartNextProps> = Template.bind({});

HideSummary.args = {
  data: DEFAULT_DATA,
  yAxisOptions: yAxisOptions,
  tooltipLabels: tooltipLabels,
  showSummary: false,
};

export const HideXAxisLabels: Story<FunnelChartNextProps> = Template.bind({});

HideXAxisLabels.args = {
  data: DEFAULT_DATA,
  xAxisOptions: {
    hide: true,
  },
  yAxisOptions: yAxisOptions,
  tooltipLabels: tooltipLabels,
  showSummary: false,
};
