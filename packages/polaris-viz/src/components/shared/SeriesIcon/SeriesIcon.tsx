import type {Shape, Color, LineStyle} from '@shopify/polaris-viz-core';

import {LinePreview} from '../../LinePreview';
import {DefaultPreview} from '../../DefaultPreview';

interface Props {
  color: Color;
  shape?: Shape;
  lineStyle?: LineStyle;
}

export function SeriesIcon({color, lineStyle, shape = 'Bar'}: Props) {
  switch (shape) {
    case 'Line': {
      const style = lineStyle ?? 'solid';

      return <LinePreview color={color} lineStyle={style} />;
    }
    default:
      return <DefaultPreview color={color} />;
  }
}
