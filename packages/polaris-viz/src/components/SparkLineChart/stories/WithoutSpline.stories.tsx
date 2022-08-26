import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {SparkLineChartProps} from '../../../components';

import {DEFAULT_PROPS, Template} from './data';

export const withoutSpline: Story<SparkLineChartProps> = Template.bind({});

withoutSpline.args = {
  ...DEFAULT_PROPS,
  theme: 'NoSpline',
};
