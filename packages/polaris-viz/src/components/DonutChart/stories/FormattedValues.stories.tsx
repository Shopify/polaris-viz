import type {StoryFn} from '@storybook/react';

import type {DonutChartProps} from '../DonutChart';

import {DEFAULT_DATA, DEFAULT_PROPS, Template} from './data';

import {META} from './meta';

export const FormattedValues: StoryFn<DonutChartProps> = Template.bind({});

FormattedValues.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  labelFormatter: (value) => `$${value}`,
  seriesNameFormatter: (value) => `Name: ${value}`,
};

export default {...META, title: 'polaris-viz/Charts/DonutChart/FormattedValues'} as any;