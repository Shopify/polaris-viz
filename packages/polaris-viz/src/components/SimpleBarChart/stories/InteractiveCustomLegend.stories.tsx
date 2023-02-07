import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {DEFAULT_THEME} from '../../../constants';
import type {SimpleBarChartProps} from '..';
import {SquareColorPreview} from '../../SquareColorPreview';

import {SERIES, Template} from './data';

const liStyles = {
  alignItems: 'center',
  color: 'white',
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
          <SquareColorPreview
            color={DEFAULT_THEME.seriesColors.upToFour[index]}
          />
          {name}
        </li>
      ))}
    </ul>
  ),
};
