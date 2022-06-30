import React from 'react';
import type {Story, Meta} from '@storybook/react';
import {DEFAULT_THEME, ChartContext} from '@shopify/polaris-viz-core';

import {TooltipContent, TooltipContentProps} from '../TooltipContent';
import type {TooltipData} from '../../../types';
import characterWidths from '../../../data/character-widths.json';
import characterWidthOffsets from '../../../data/character-width-offsets.json';

export default {
  title: 'polaris-viz/Subcomponents/TooltipContent',
  component: TooltipContent,
  parameters: {
    controls: {sort: 'requiredFirst', expanded: true},
    docs: {
      description: {
        component: '',
      },
      yScale: {
        controls: null,
      },
      xScale: {
        controls: null,
      },
    },
  },
  argTypes: {},
} as Meta;

const Template: Story<TooltipContentProps> = (args: TooltipContentProps) => {
  return (
    <ChartContext.Provider
      value={{characterWidths, id: 'none', characterWidthOffsets}}
    >
      <TooltipContent {...args} />
    </ChartContext.Provider>
  );
};

const DATA: TooltipData[] = [
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

export const Default: Story<TooltipContentProps> = Template.bind({});
Default.args = {
  data: DATA,
  title: 'Tuesday',
};

export const NoTitle: Story<TooltipContentProps> = Template.bind({});
NoTitle.args = {
  data: DATA,
};

export const NoSeriesName: Story<TooltipContentProps> = Template.bind({});
NoSeriesName.args = {
  title: 'Tuesday',
  data: [
    {
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
        },
      ],
    },
  ],
};

export const NoSeriesNoTitle: Story<TooltipContentProps> = Template.bind({});
NoSeriesNoTitle.args = {
  data: [
    {
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
        },
      ],
    },
  ],
};

export const Annotations: Story<TooltipContentProps> = Template.bind({});
Annotations.args = {
  title: 'Jul 7',
  data: DATA,
};

export const PreviewIcons: Story<TooltipContentProps> = Template.bind({});
PreviewIcons.args = {
  data: [
    {
      shape: 'Bar',
      data: [
        {
          key: 'This row has a preview icon',
          value: '650',
          color: DEFAULT_THEME.seriesColors.fromFiveToSeven[0],
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
