import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {TooltipContentProps} from '../../../components';

import {Template} from './data';
import {LIGHT_THEME} from '../../../constants';

export const WithTrendIndicator: Story<TooltipContentProps> = Template.bind({});

WithTrendIndicator.args = {
  data: [
    {
      name: 'Sessions',
      shape: 'Line',
      data: [
        {
          key: 'Sessions from Google ads',
          value: '5250',
          color: LIGHT_THEME.seriesColors.all[0],
          trend: {
            direction: 'upward',
            trend: 'positive',
            value: '10%',
          },
        },
        {
          key: 'Sessions from Facebook ads',
          value: '650',
          color: LIGHT_THEME.seriesColors.all[1],
          isComparison: true,
          trend: {
            direction: 'downward',
            trend: 'negative',
            value: '20%',
          },
        },
      ],
    },
  ],
  title: 'Tuesday',
};
