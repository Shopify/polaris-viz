import type {Dimensions} from '@shopify/polaris-viz-core';
import {
  useTheme,
  ChartState,
  DEFAULT_BORDER_RADIUS,
} from '@shopify/polaris-viz-core';

import {ErrorText} from '../ErrorText';

interface Props {
  containerDimensions: Dimensions;
  state: ChartState;
  errorText: string;
}

export function SparkSkeleton({containerDimensions, state, errorText}: Props) {
  const {width, height} = containerDimensions;

  const {
    grid: {color: gridColor},
  } = useTheme();

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      {state === ChartState.Loading && (
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={gridColor}
          rx={DEFAULT_BORDER_RADIUS}
        />
      )}
      {state === ChartState.Error && (
        <ErrorText errorText={errorText} width={width} height={height} />
      )}
    </svg>
  );
}
