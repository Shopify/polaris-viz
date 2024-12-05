import {
  useTheme,
  ChartState,
  DEFAULT_BORDER_RADIUS,
  useChartContext,
} from '@shopify/polaris-viz-core';

import {ErrorText} from '../ErrorText/ErrorText';

interface Props {
  state: ChartState;
  errorText: string;
}

export function SparkSkeleton({state, errorText}: Props) {
  const {
    containerBounds: {height, width},
  } = useChartContext();

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
