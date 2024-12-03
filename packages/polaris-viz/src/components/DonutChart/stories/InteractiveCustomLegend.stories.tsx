import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {DARK_THEME} from '../../../constants';
import type {DonutChartProps} from '../../DonutChart';
import {SquareColorPreview} from '../../SquareColorPreview';

import {DEFAULT_DATA, DEFAULT_PROPS, Template} from './data';

const liStyles = {
  alignItems: 'center',
  color: 'black',
  display: 'flex',
  fontWeight: 'bold',
  gap: 4,
  listStyleType: 'none',
};

export const InteractiveCustomLegend: Story<DonutChartProps> = Template.bind(
  {},
);

InteractiveCustomLegend.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  renderLegendContent: ({getColorVisionStyles, getColorVisionEventAttrs}) => (
    <ul>
      {DEFAULT_DATA.map(({name}, index) => (
        <li
          key={name}
          style={{
            ...liStyles,
            ...getColorVisionStyles(index),
          }}
          {...getColorVisionEventAttrs(index)}
        >
          <SquareColorPreview color={DARK_THEME.seriesColors.limited[index]} />
          {name}
        </li>
      ))}
    </ul>
  ),
};
