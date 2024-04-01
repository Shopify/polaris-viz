import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {SimpleNormalizedChartProps} from '../../../components';

import {DEFAULT_PROPS, DEFAULT_DATA, Template} from './data';

export const FormattedValues: Story<SimpleNormalizedChartProps> = Template.bind(
  {},
);

FormattedValues.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  labelFormatter: (value) => `$${value}`,
  seriesNameFormatter: (value) => `Name: ${value}`,
};
