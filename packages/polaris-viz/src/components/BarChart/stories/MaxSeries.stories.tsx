import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {generateMultipleSeries} from '../../Docs/utilities';
import type {BarChartProps} from '../BarChart';

import {Template} from './data';

export const MaxSeries: Story<BarChartProps> = Template.bind({});

MaxSeries.args = {
  data: generateMultipleSeries(8),
  maxSeries: 4,
  renderBucketLegendLabel: () => 'Other Group',
};
