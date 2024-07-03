import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {generateMultipleSeries} from '../../Docs/utilities';
import type {LineChartProps} from '../LineChart';

import {Template} from './data';

export const SeriesColorslimited: Story<LineChartProps> = Template.bind({});

SeriesColorslimited.args = {
  data: generateMultipleSeries(8, 'dates'),
};

export const SeriesColorsUpToSixteen: Story<LineChartProps> = Template.bind({});

SeriesColorsUpToSixteen.args = {
  data: generateMultipleSeries(16, 'dates'),
};
