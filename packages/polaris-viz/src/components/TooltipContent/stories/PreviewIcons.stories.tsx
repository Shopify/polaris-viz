import {DARK_THEME} from '@shopify/polaris-viz-core';
import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {TooltipContentProps} from '../../../components';

import {Template} from './data';

export const PreviewIcons: Story<TooltipContentProps> = Template.bind({});

PreviewIcons.args = {
  data: [
    {
      shape: 'Bar',
      data: [
        {
          key: 'This row has a preview icon',
          value: '650',
          color: DARK_THEME.seriesColors.all[0],
        },
        {
          key: 'This row has a transparent icon',
          value: '650',
          color: 'transparent',
        },
        {
          key: 'This row has no preview icon',
          value: '5250',
        },
      ],
    },
  ],
};
