import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {DARK_THEME} from '../../../constants';
import type {SimpleBarChartProps} from '..';
import {SquareColorPreview} from '../../SquareColorPreview';

import {SERIES, Template} from './data';

const liStyles = {
  alignItems: 'center',
  color: 'black',
  display: 'flex',
  fontWeight: 'bold',
  gap: 4,
  listStyleType: 'none',
};

export const InteractiveCustomLegend: Story<SimpleBarChartProps> =
  Template.bind({});

InteractiveCustomLegend.args = {
  data: SERIES,
  renderLegendContent: ({getColorVisionStyles, getColorVisionEventAttrs}) => (
    <ul>
      {SERIES.map(({name}, index) => (
        <li
          key={name}
          style={{
            ...liStyles,
            ...getColorVisionStyles(index),
          }}
          {...getColorVisionEventAttrs(index)}
        >
          <SquareColorPreview color={DARK_THEME.seriesColors.all[index]} />
          {name}
        </li>
      ))}
    </ul>
  ),
};
