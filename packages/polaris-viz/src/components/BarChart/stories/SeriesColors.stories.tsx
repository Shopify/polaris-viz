import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {generateMultipleSeries} from '../../Docs/utilities';
import type {BarChartProps} from '../BarChart';

import {Template} from './data';

export const SeriesColorsUpToEight: Story<BarChartProps> = Template.bind({});

SeriesColorsUpToEight.args = {
  data: generateMultipleSeries(8),
};

export const SeriesColorsUpToSixteen = Template.bind({});

SeriesColorsUpToSixteen.args = {
  data: generateMultipleSeries(16),
};
