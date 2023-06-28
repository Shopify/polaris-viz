import {DEFAULT_THEME} from '@shopify/polaris-viz-core';
import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {TooltipContentProps} from '../../../components';

import {Template} from './data';

export const NoSeriesNoTitle: Story<TooltipContentProps> = Template.bind({});

NoSeriesNoTitle.args = {
  data: [
    {
      shape: 'Line',
      data: [
        {
          key: 'Sessions from Google ads',
          value: '5250',
          color: DEFAULT_THEME.seriesColors.upToEight[0],
        },
        {
          key: 'Sessions from Facebook ads',
          value: '650',
          color: DEFAULT_THEME.seriesColors.upToEight[1],
        },
      ],
    },
  ],
};
