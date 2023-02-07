import { useMemo } from 'react';
import type {Story} from '@storybook/react';
import {
  ChartContext,
  DEFAULT_THEME_NAME,
  DEFAULT_THEME,
} from '@shopify/polaris-viz-core';

import {TooltipContent, TooltipContentProps} from '../TooltipContent';
import characterWidths from '../../../data/character-widths.json';
import characterWidthOffsets from '../../../data/character-width-offsets.json';
import type {TooltipData} from '../../../types';

export const Template: Story<TooltipContentProps> = (
  args: TooltipContentProps,
) => {
  const value = useMemo(() => {
    return {
      characterWidths,
      id: 'none',
      characterWidthOffsets,
      shouldAnimate: true,
      theme: DEFAULT_THEME_NAME,
      isPerformanceImpacted: false,
    };
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
        color: DEFAULT_THEME.seriesColors.fromFiveToSeven[0],
      },
      {
        key: 'Sessions from Facebook ads',
        value: '650',
        color: DEFAULT_THEME.seriesColors.fromFiveToSeven[1],
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
        color: DEFAULT_THEME.seriesColors.fromFiveToSeven[2],
      },
      {
        key: 'Online',
        value: '10000',
        color: DEFAULT_THEME.seriesColors.fromFiveToSeven[3],
      },
      {
        key: 'Mobile',
        value: '16500',
        color: DEFAULT_THEME.seriesColors.fromFiveToSeven[4],
      },
    ],
  },
];
