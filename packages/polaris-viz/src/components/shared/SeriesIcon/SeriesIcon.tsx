import React from 'react';
import type {Shape, Color} from '@shopify/polaris-viz-core';
import {useTheme} from '@shopify/polaris-viz-core';

import {LinePreview} from '../../LinePreview';
import {SquareColorPreview} from '../../SquareColorPreview';

interface Props {
  color: Color;
  isComparison?: boolean;
  shape?: Shape;
  theme?: string;
}

export function SeriesIcon({
  color,
  isComparison = false,
  shape = 'Bar',
  theme,
}: Props) {
  const selectedTheme = useTheme(theme);

  switch (shape) {
    case 'Line': {
      const style = isComparison ? 'dotted' : 'solid';
      const lineColor = isComparison
        ? selectedTheme.seriesColors.comparison
        : color;

      return <LinePreview color={lineColor} lineStyle={style} />;
    }
    case 'Bar':
    default:
      return <SquareColorPreview color={color} />;
  }
}
