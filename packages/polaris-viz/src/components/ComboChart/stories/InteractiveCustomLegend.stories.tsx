import type {Story} from '@storybook/react';

import {DEFAULT_THEME} from '../../../constants';
import type {ComboChartProps} from '../../ComboChart';
import {LinePreview, SquareColorPreview} from '../..';

import {DEFAULT_DATA, Template} from './data';

export {META as default} from './meta';

const LEGEND_ITEMS_DATA = [
  {
    name: 'POS',
    preview: (
      <SquareColorPreview color={DEFAULT_THEME.seriesColors.upToFour[0]} />
    ),
  },
  {
    name: 'Online',
    preview: <SquareColorPreview color="lime" />,
  },
  {
    name: 'Mobile',
    preview: (
      <SquareColorPreview color={DEFAULT_THEME.seriesColors.upToFour[1]} />
    ),
  },
  {
    name: 'Sessions from Google ads',
    preview: (
      <LinePreview
        lineStyle="solid"
        color={DEFAULT_THEME.seriesColors.upToFour[2]}
      />
    ),
  },
  {
    name: 'Sessions from Facebook ads',
    preview: (
      <LinePreview
        lineStyle="dotted"
        color={DEFAULT_THEME.seriesColors.comparison}
      />
    ),
  },
];

const liStyles = {
  alignItems: 'center',
  color: 'white',
  display: 'flex',
  fontWeight: 'bold',
  gap: 4,
  listStyleType: 'none',
};

export const InteractiveCustomLegend: Story<ComboChartProps> = Template.bind({});

InteractiveCustomLegend.args = {
  data: DEFAULT_DATA,
  xAxisOptions: {
    labelFormatter: (value: string) => {
      return new Date(value).toLocaleDateString('en-CA', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    },
  },
  renderLegendContent: ({getColorVisionStyles, getColorVisionEventAttrs}) => (
    <ul>
      {LEGEND_ITEMS_DATA.map(({name, preview}, index) => (
        <li
          key={name}
          style={{
            ...liStyles,
            ...getColorVisionStyles(index),
          }}
          {...getColorVisionEventAttrs(index)}
        >
          {preview}
          {name}
        </li>
      ))}
    </ul>
  ),
};
