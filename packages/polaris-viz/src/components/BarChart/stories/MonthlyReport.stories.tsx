import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {BarChartProps} from '../../../components';

import {MONTHLY_REPORT_DATA, Template} from './data';

export const MonthlyReport: Story<BarChartProps> = Template.bind({});

MonthlyReport.args = {
  data: MONTHLY_REPORT_DATA,
  onError: (a, b) => {
    console.log({a, b});
  },
};
