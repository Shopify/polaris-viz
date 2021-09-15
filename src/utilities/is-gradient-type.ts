import type {GradientStop, Color} from 'types';

function isGradientStopType(item: any): item is GradientStop {
  return (
    item.offset != null &&
    typeof item.offset === 'number' &&
    item.color != null &&
    typeof item.color === 'string'
  );
}

export function isGradientType(color: Color): color is GradientStop[] {
  return (
    Array.isArray(color) && color.every((item) => isGradientStopType(item))
  );
}
