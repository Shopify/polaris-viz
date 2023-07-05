import {DEFAULT_THEME} from '@shopify/polaris-viz-core';
import {storiesOf} from '@storybook/react';

import type {TooltipData} from '../../../types';
import {TooltipContent} from '../../TooltipContent';
import {
  addWithPropsCombinations,
  renderCombinationSections,
} from '../../../chromatic';

const stories = storiesOf('Chromatic/Components', module).addParameters({
  docs: {page: null},
  chromatic: {disableSnapshot: false},
});

const DATA: TooltipData[] = [
  {
    name: 'Sessions',
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
        color: DEFAULT_THEME.seriesColors.upToEight[2],
      },
      {
        key: 'Online',
        value: '10000',
        color: DEFAULT_THEME.seriesColors.upToEight[3],
      },
      {
        key: 'Mobile',
        value: '16500',
        color: DEFAULT_THEME.seriesColors.upToEight[4],
      },
    ],
  },
];

const NO_SERIES_NAME_DATA: TooltipData[] = [
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
];

const NO_SERIES_NO_TITLE_DATA: TooltipData[] = [
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
];

const EMPTY_SERIES: TooltipData[] = [
  {
    shape: 'Line',
    data: [],
  },
];

const SERIES_ICON_DATA: TooltipData[] = [
  {
    shape: 'Bar',
    data: [
      {
        key: 'This row has a preview icon',
        value: '650',
        color: DEFAULT_THEME.seriesColors.upToEight[0],
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
];

const combinations = renderCombinationSections([
  [
    'Data',
    addWithPropsCombinations(
      TooltipContent,
      {
        data: [
          [],
          DATA,
          NO_SERIES_NAME_DATA,
          NO_SERIES_NO_TITLE_DATA,
          SERIES_ICON_DATA,
          EMPTY_SERIES,
        ],
        title: ['Testing'],
      },
      {style: {width: 300}},
    ),
  ],
  [
    'Titles',
    addWithPropsCombinations(TooltipContent, {
      data: [NO_SERIES_NAME_DATA],
      title: ['Testing', ''],
    }),
  ],
  [
    'Themes',
    addWithPropsCombinations(TooltipContent, {
      data: [DATA],
      theme: ['Default', 'Light'],
    }),
  ],
]);

stories.add('TooltipContent', combinations);
