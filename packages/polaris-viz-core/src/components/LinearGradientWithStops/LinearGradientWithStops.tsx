import type {GradientStop} from '../../types';
import {usePolarisVizContext} from '../../hooks';

export interface LinearGradientWithStopsProps {
  gradient: GradientStop[];
  id: string;
  x1?: string;
  x2?: string;
  y1?: string;
  y2?: string;
  gradientUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
}

export function LinearGradientWithStops({
  gradient,
  id,
  x1 = '0%',
  x2 = '0%',
  y1 = '100%',
  y2 = '0%',
  gradientUnits = 'objectBoundingBox',
}: LinearGradientWithStopsProps) {
  const {
    components: {LinearGradient, Stop},
  } = usePolarisVizContext();

  return (
    <LinearGradient
      id={id}
      x1={x1}
      x2={x2}
      y1={y1}
      y2={y2}
      gradientUnits={gradientUnits}
    >
      {gradient.map(({color, offset, stopOpacity = 1}) => (
        <Stop
          key={`${id}-${color}-${offset}`}
          offset={`${offset}%`}
          stopColor={color}
          stopOpacity={stopOpacity}
        />
      ))}
    </LinearGradient>
  );
}
