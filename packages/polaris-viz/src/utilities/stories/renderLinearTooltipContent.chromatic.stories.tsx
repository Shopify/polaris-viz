import {storiesOf} from '@storybook/react';

import {
  addWithPropsCombinations,
  renderCombinationSections,
} from '../../chromatic';

import {
  renderLinearTooltipContent,
  Options,
} from '../../utilities/renderLinearTooltipContent';
import type {RenderTooltipContentData} from 'types';

const stories = storiesOf('Chromatic/Utilities', module).addParameters({
  docs: {page: null},
  chromatic: {disableSnapshot: false},
});

const DEFAULT_TOOLTIP_DATA: RenderTooltipContentData = {
  data: [
    {
      shape: 'Line',
      data: [
        {
          key: 'Average',
          value: 534,
          color: [
            {
              offset: 0,
              color: 'rgba(149, 101, 255, 1)',
            },
            {
              offset: 100,
              color: 'rgba(75, 146, 229, 1)',
            },
          ],
          isHidden: false,
        },
        {
          key: '75th Percentile',
          value: 240,
          color: 'rgba(103, 197, 228, 1)',
          isHidden: false,
        },
        {
          key: 'Median',
          value: 90,
          color: 'rgba(40, 106, 123, 1)',
          isHidden: false,
        },
        {
          key: '25th percentile',
          value: 0,
          color: 'rgba(103, 197, 228, 1)',
          isHidden: false,
        },
      ],
    },
  ],
  activeIndex: 0,
  title: '2020-04-04T12:00:00',
  dataSeries: [
    {
      name: 'Average',
      data: [
        {
          value: 333,
          key: '2020-04-01T12:00:00',
        },
      ],
    },
    {
      name: '75th Percentile',
      data: [
        {
          value: 859,
          key: '2020-03-02T12:00:00',
        },
      ],
    },
    {
      name: 'Median',
      data: [
        {
          value: 759,
          key: '2020-03-02T12:00:00',
        },
      ],
    },
    {
      name: '25th percentile',
      data: [
        {
          value: 559,
          key: '2020-03-02T12:00:00',
        },
      ],
    },
  ],
  theme: 'Default',
  formatters: {},
};

const DEFAULT_OPTIONS: Options = {
  title: '2020-04-04T12:00:00',
  groups: [
    {
      title: 'Your store',
      indexes: [0],
    },
    {
      title: 'Similar stores',
      indexes: [1, 2, 3],
    },
  ],
};

const combinations = renderCombinationSections([
  [
    'Data',
    addWithPropsCombinations(Component, {
      tooltipData: [
        DEFAULT_TOOLTIP_DATA,
        {
          ...DEFAULT_TOOLTIP_DATA,
          data: [
            {
              ...DEFAULT_TOOLTIP_DATA.data[0],
              data: [
                {...DEFAULT_TOOLTIP_DATA.data[0].data[0], isHidden: true},
                DEFAULT_TOOLTIP_DATA.data[0].data[1],
                DEFAULT_TOOLTIP_DATA.data[0].data[2],
                DEFAULT_TOOLTIP_DATA.data[0].data[3],
              ],
            },
          ],
        },
      ],
      options: [DEFAULT_OPTIONS],
    }),
  ],
  [
    'Options',
    addWithPropsCombinations(Component, {
      tooltipData: [DEFAULT_TOOLTIP_DATA],
      options: [
        DEFAULT_OPTIONS,
        {groups: DEFAULT_OPTIONS.groups},
        {
          groups: [
            {
              title: 'Your store',
              indexes: [0, 2],
            },
            {
              title: 'Similar stores',
              indexes: [1, 3],
            },
          ],
        },
        {
          groups: [
            {
              title: 'Your store',
              indexes: [],
            },
            {
              title: 'Similar stores',
              indexes: [1, 3],
            },
          ],
        },
      ],
    }),
  ],
]);

stories.add('renderLinearTooltipContent', combinations);

interface Props {
  tooltipData: RenderTooltipContentData;
  options: Options;
}

function Component({tooltipData, options}: Props) {
  console.log({tooltipData});
  return <>{renderLinearTooltipContent(tooltipData, options)}</>;
}
