import React from 'react';
import tokens from '@shopify/polaris-tokens';

import {Series} from '../../types';

interface Props {
  path: string;
  series: Series;
}

export function Line({path, series}: Props) {
  const {style = {}} = series;
  const {color = 'colorPurple', lineStyle = 'solid'} = style;

  return (
    <path
      d={path}
      fill="none"
      strokeWidth="2px"
      paintOrder="stroke"
      stroke={tokens[color]}
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeDasharray={lineStyle === 'dashed' ? '2 4' : 'unset'}
    />
  );
}
