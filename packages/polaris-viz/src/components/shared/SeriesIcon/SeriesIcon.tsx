import type {Shape, Color, LineStyle} from '@shopify/polaris-viz-core';
import {useTheme} from '@shopify/polaris-viz-core';

import {LinePreview} from '../../LinePreview';
import {SquareColorPreview} from '../../SquareColorPreview';

interface Props {
  color: Color;
  isComparison?: boolean;
  shape?: Shape;
  lineStyle?: LineStyle;
}

export function SeriesIcon({
  color,
  isComparison = false,
  lineStyle,
  shape = 'Bar',
}: Props) {
  const selectedTheme = useTheme();

  switch (shape) {
    case 'Line': {
      const style = isComparison ? 'dotted' : lineStyle ?? 'solid';
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
