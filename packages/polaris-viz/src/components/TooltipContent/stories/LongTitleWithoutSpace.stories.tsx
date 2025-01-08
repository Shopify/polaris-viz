import {DARK_THEME} from '@shopify/polaris-viz-core';
import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {TooltipContentProps} from '../../../components';

import {Template} from './data';

export const LongTitleWithoutSpace: Story<TooltipContentProps> = Template.bind(
  {},
);

LongTitleWithoutSpace.args = {
  data: [
    {
      shape: 'Line',
      data: [
        {
          key: 'Google ads',
          value: '5250',
          color: DARK_THEME.seriesColors.limited[0],
        },
        {
          key: 'Facebook ads',
          value: '650',
          color: DARK_THEME.seriesColors.limited[1],
        },
      ],
    },
  ],
  title: 'thisisaverylongstringwithoutspace',
};
