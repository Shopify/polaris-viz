import type {Story} from '@storybook/react';

import type {LineChartProps} from '../../../../components';

import {DEFAULT_DATA, DEFAULT_PROPS, Template} from '../data';
import {META} from '../meta';

export default {
  ...META,
  title: 'polaris-viz/Chromatic/Charts/LineChart',
  parameters: {
    ...META.parameters,
    chromatic: {disableSnapshot: false},
  },
};

export const DefaultYScaleWidth: Story<LineChartProps> = Template.bind({});

DefaultYScaleWidth.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
};

export const FixedYScaleWidth: Story<LineChartProps> = Template.bind({});

FixedYScaleWidth.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  yAxisOptions: {
    fixedWidth: 100,
  },
};
