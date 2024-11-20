import {useMemo} from 'react';
import type {Story} from '@storybook/react';
import {ChartContext, DARK_THEME} from '@shopify/polaris-viz-core';

import {DEFAULT_CHART_CONTEXT} from '../../../storybook/constants';
import type {TooltipContentProps} from '../TooltipContent';
import {TooltipContent} from '../TooltipContent';
import type {TooltipData} from '../../../types';

export const Template: Story<TooltipContentProps> = (
  args: TooltipContentProps,
) => {
  const value = useMemo(() => {
    return DEFAULT_CHART_CONTEXT;
  }, []);

  return (
    <ChartContext.Provider value={value}>
      <TooltipContent {...args} />
    </ChartContext.Provider>
  );
};

export const DEFAULT_DATA: TooltipData[] = [
  {
    name: 'Sessions',
    shape: 'Line',
    data: [
      {
        key: 'Sessions from Google ads',
        value: '5250',
        color: DARK_THEME.seriesColors.limited[0],
      },
      {
        key: 'Sessions from Facebook ads',
        value: '650',
        color: DARK_THEME.seriesColors.limited[1],
        isComparison: true,
      },
    ],
  },
  {
    name: 'Sales',
    shape: 'Bar',
    data: [
      {
        key: 'POS',
        value: '4999',
        color: DARK_THEME.seriesColors.limited[2],
      },
      {
        key: 'Online',
        value: '10000',
        color: DARK_THEME.seriesColors.limited[3],
      },
      {
        key: 'Average',
        value: '16500',
        color: DARK_THEME.seriesColors.limited[4],
      },
    ],
  },
];
