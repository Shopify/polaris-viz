import React from 'react';
import {
  colorPurpleDark,
  colorBlueDark,
  colorTeal,
} from '@shopify/polaris-tokens';

import {Series} from '../../types';

interface Props {
  path: string;
  series: Series;
}

export function Line({path, series}: Props) {
  const {name, style = {}} = series;
  const {color = 'purple', lineStyle = 'solid'} = style;

  let strokeColor;
  switch (color) {
    case 'purple':
      strokeColor = colorPurpleDark;
      break;
    case 'teal':
      strokeColor = colorTeal;
      break;
    case 'blue':
      strokeColor = colorBlueDark;
      break;
    default:
      throw new Error(`Invalid line color ${color} for series named ${name}`);
  }

  return (
    <path
      d={path}
      fill="none"
      strokeWidth="2px"
      paintOrder="stroke"
      stroke={strokeColor}
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeDasharray={lineStyle === 'dashed' ? '2 4' : 'unset'}
    />
  );
}
