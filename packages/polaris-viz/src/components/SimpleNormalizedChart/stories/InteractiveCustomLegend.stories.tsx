import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {DARK_THEME} from '../../../constants';
import type {SimpleNormalizedChartProps} from '../../SimpleNormalizedChart';
import {SquareColorPreview} from '../../SquareColorPreview';

import {DEFAULT_PROPS, DEFAULT_DATA, Template} from './data';

const LABELS = ['Apple', 'Facebook', 'Netflix', 'Google'];

const liStyles = {
  alignItems: 'center',
  color: 'black',
  display: 'flex',
  fontWeight: 'bold',
  gap: 4,
  listStyleType: 'none',
};

export const InteractiveCustomLegend: Story<SimpleNormalizedChartProps> =
  Template.bind({});

InteractiveCustomLegend.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  legendPosition: 'bottom-right',
  renderLegendContent: ({getColorVisionStyles, getColorVisionEventAttrs}) => (
    <ul>
      {LABELS.map((name, index) => (
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
