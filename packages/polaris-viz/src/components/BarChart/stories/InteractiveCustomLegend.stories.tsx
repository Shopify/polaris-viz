import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {DEFAULT_THEME} from '../../../constants';
import type {BarChartProps} from '../../BarChart';
import {SquareColorPreview} from '../../SquareColorPreview';

import {DEFAULT_DATA, Template} from './data';

const liStyles = {
  alignItems: 'center',
  color: 'white',
  display: 'flex',
  fontWeight: 'bold',
  gap: 4,
  listStyleType: 'none',
};

export const InteractiveCustomLegend: Story<BarChartProps> = Template.bind({});

InteractiveCustomLegend.args = {
  data: DEFAULT_DATA,
  direction: 'vertical',
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
          <SquareColorPreview
            color={DEFAULT_THEME.seriesColors.upToFour[index]}
          />
          {name}
        </li>
      ))}
    </ul>
  ),
};
