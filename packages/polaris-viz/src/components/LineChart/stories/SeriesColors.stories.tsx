import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {generateMultipleSeries} from '../../Docs/utilities';
import type {LineChartProps} from '../LineChart';

import {Template} from './data';

export const SeriesColorsUpToFour: Story<LineChartProps> = Template.bind({});

SeriesColorsUpToFour.args = {
  data: generateMultipleSeries(4, 'dates'),
};

export const SeriesColorsFromFiveToSeven: Story<LineChartProps> = Template.bind(
  {},
);

SeriesColorsFromFiveToSeven.args = {
  data: generateMultipleSeries(7, 'dates'),
};

export const SeriesColorsUpToFourteen: Story<LineChartProps> = Template.bind(
  {},
);

SeriesColorsUpToFourteen.args = {
  data: generateMultipleSeries(14, 'dates'),
};
