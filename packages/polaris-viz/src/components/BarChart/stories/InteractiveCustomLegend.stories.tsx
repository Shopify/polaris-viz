import type {StoryFn} from '@storybook/react';

import {META} from './meta';

import {DARK_THEME} from '../../../constants';
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

export const InteractiveCustomLegend: StoryFn<BarChartProps> = Template.bind({});

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
          <SquareColorPreview color={DARK_THEME.seriesColors.limited[index]} />
          {name}
        </li>
      ))}
    </ul>
  ),
};

export default {META, title: 'polaris-viz/Charts/BarChart/InteractiveCustomLegend'} as any;