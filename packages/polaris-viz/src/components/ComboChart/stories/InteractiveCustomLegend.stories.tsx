import type {Story} from '@storybook/react';

import {DARK_THEME} from '../../../constants';
import type {ComboChartProps} from '../ComboChart';

import {LinePreview} from '../../LinePreview/LinePreview';
import {SquareColorPreview} from '../../SquareColorPreview/SquareColorPreview';

import {DEFAULT_DATA, Template} from './data';

export {META as default} from './meta';

const LEGEND_ITEMS_DATA = [
  {
    name: 'POS',
    preview: <SquareColorPreview color={DARK_THEME.seriesColors.limited[0]} />,
  },
  {
    name: 'Online',
    preview: <SquareColorPreview color="lime" />,
  },
  {
    name: 'Mobile',
    preview: <SquareColorPreview color={DARK_THEME.seriesColors.limited[1]} />,
  },
  {
    name: 'Sessions from Google ads',
    preview: (
      <LinePreview
        lineStyle="solid"
        color={DARK_THEME.seriesColors.limited[2]}
      />
    ),
  },
  {
    name: 'Sessions from Facebook ads',
    preview: (
      <LinePreview
        lineStyle="dotted"
        color={DARK_THEME.seriesColors.comparison}
      />
    ),
  },
];

const liStyles = {
  alignItems: 'center',
  color: 'black',
  display: 'flex',
  fontWeight: 'bold',
  gap: 4,
  listStyleType: 'none',
};

export const InteractiveCustomLegend: Story<ComboChartProps> = Template.bind(
  {},
);

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
