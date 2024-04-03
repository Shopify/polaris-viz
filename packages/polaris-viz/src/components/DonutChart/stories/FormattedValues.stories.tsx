import type {Story} from '@storybook/react';

import type {DonutChartProps} from '../DonutChart';

import {DEFAULT_DATA, DEFAULT_PROPS, Template} from './data';

export {META as default} from './meta';

export const FormattedValues: Story<DonutChartProps> = Template.bind({});

FormattedValues.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  labelFormatter: (value) => `$${value}`,
  seriesNameFormatter: (value) => `Name: ${value}`,
};
