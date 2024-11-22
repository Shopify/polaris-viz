import type {StoryFn} from '@storybook/react';

import {META} from './meta';

import {generateMultipleSeries} from '../../Docs/utilities';
import type {BarChartProps} from '../BarChart';

import {Template} from './data';

export const SeriesColorslimited: StoryFn<BarChartProps> = Template.bind({});

SeriesColorslimited.args = {
  data: generateMultipleSeries(8),
};

export const SeriesColorsUpToSixteen = Template.bind({});

SeriesColorsUpToSixteen.args = {
  data: generateMultipleSeries(16),
};

export default {...META, title: 'polaris-viz/Charts/BarChart/SeriesColors'} as any;