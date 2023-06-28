import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {generateMultipleSeries} from '../../Docs/utilities';
import type {LineChartProps} from '../LineChart';

import {Template} from './data';

export const SeriesColorsUpToEight: Story<LineChartProps> = Template.bind({});

SeriesColorsUpToEight.args = {
  data: generateMultipleSeries(4, 'dates'),
};

export const SeriesColorsUpToSixteen: Story<LineChartProps> = Template.bind({});

SeriesColorsUpToSixteen.args = {
  data: generateMultipleSeries(14, 'dates'),
};
