import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {DEFAULT_THEME} from '../../../constants';
import {LinePreview} from '../../LinePreview';
import type {StackedAreaChartProps} from '../../StackedAreaChart';

import {DEFAULT_DATA, DEFAULT_PROPS, Template} from './data';

const liStyles = {
  alignItems: 'center',
  color: 'white',
  display: 'flex',
  fontWeight: 'bold',
  gap: 4,
  listStyleType: 'none',
};

export const InteractiveCustomLegend: Story<StackedAreaChartProps> =
  Template.bind({});

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
          <LinePreview
            lineStyle="solid"
            color={DEFAULT_THEME.seriesColors.upToEight[index]}
          />
          {name}
        </li>
      ))}
    </ul>
  ),
};
