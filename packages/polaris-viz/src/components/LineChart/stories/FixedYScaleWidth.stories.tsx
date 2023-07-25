import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {LineChartProps} from '../../../components';

import {DEFAULT_DATA, DEFAULT_PROPS, Template} from './data';

export const FixedYScaleWidth: Story<LineChartProps> = Template.bind({});

FixedYScaleWidth.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  yAxisOptions: {
    fixedWidth: 200,
  },
};
