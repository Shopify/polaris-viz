import type {Story} from '@storybook/react';
import {META} from '../meta';

export default {
  ...META,
  title: 'polaris-viz/Chromatic/Charts/LineChartRelational',
  parameters: {
    ...META.parameters,
    chromatic: {disableSnapshot: false},
  },
};

import {DEFAULT_PROPS, Template} from '../data';
import type {LineChartProps} from 'components/LineChart/LineChart';
import {MISSING_END_DATA} from './data/missing-end-data';

import {MISSING_START_DATA} from './data/missing-start-data';
import {MISSING_MIDDLE_DATA} from './data/missing-middle-data';
import {MISSING_RANDOM_DATA} from './data/missing-random-data';

const PROPS = {
  ...DEFAULT_PROPS,
  isAnimated: false,
};

export const MissingEndData: Story<LineChartProps> = Template.bind({});

MissingEndData.args = {
  ...PROPS,
  data: MISSING_END_DATA,
};

export const MissingStartData: Story<LineChartProps> = Template.bind({});

MissingStartData.args = {
  ...PROPS,
  data: MISSING_START_DATA,
};

export const MissingMiddleData: Story<LineChartProps> = Template.bind({});

MissingMiddleData.args = {
  ...PROPS,
  data: MISSING_MIDDLE_DATA,
};

export const MissingRandomData: Story<LineChartProps> = Template.bind({});

MissingRandomData.args = {
  ...PROPS,
  data: MISSING_RANDOM_DATA,
};
