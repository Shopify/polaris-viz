import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {LinePreview} from '../../..';
import {DEFAULT_THEME} from '../../../constants';
import type {LineChartProps} from '../..';

import {DEFAULT_DATA, DEFAULT_PROPS, Template} from './data';

const liStyles = {
  alignItems: 'center',
  color: 'white',
  display: 'flex',
  fontWeight: 'bold',
  gap: 4,
  listStyleType: 'none',
};

export const InteractiveCustomLegend: Story<LineChartProps> = Template.bind({});

InteractiveCustomLegend.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  renderLegendContent: ({getColorVisionStyles, getColorVisionEventAttrs}) => (
    <ul>
      {DEFAULT_DATA.map(({name, isComparison}, index) => (
        <li
          key={name}
          style={{
            ...liStyles,
            ...getColorVisionStyles(index),
          }}
          {...getColorVisionEventAttrs(index)}
        >
          <LinePreview
            lineStyle={isComparison ? 'dotted' : 'solid'}
            color={
              DEFAULT_THEME.seriesColors[isComparison ? 'comparison' : 'single']
            }
          />
          {name}
        </li>
      ))}
    </ul>
  ),
};
