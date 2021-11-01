import React, {useCallback, useLayoutEffect, useState} from 'react';

import {ChartContainer} from '../../components/ChartContainer';
import {useResizeObserver, usePrefersReducedMotion} from '../../hooks';
import type {Dimensions} from '../../types';

import {Chart} from './Chart';
import type {Series, XAxisOptions} from './types';

export interface HorizontalBarChartProps {
  series: Series[];
  isAnimated?: boolean;
  isSimple?: boolean;
  isStacked?: boolean;
  theme?: string;
  xAxisOptions?: XAxisOptions;
}

export function HorizontalBarChart({
  isAnimated = true,
  isSimple = false,
  isStacked = false,
  series,
  theme,
  xAxisOptions,
}: HorizontalBarChartProps) {
  const xAxisOptionsForChart: Required<XAxisOptions> = {
    labelFormatter: (value: string) => value,
    hide: false,
    ...xAxisOptions,
  };

  const [chartDimensions, setChartDimensions] = useState<Dimensions | null>(
    null,
  );
  const {setRef, entry} = useResizeObserver();

  const updateDimensions = useCallback(() => {
    if (entry != null) {
      const {width, height} = entry.contentRect;
      setChartDimensions((prevDimensions) => {
        if (
          prevDimensions != null &&
          width === prevDimensions.width &&
          height === prevDimensions.height
        ) {
          return prevDimensions;
        } else {
          return {width, height};
        }
      });
    }
  }, [entry]);

  useLayoutEffect(() => {
    updateDimensions();
  }, [entry, updateDimensions]);

  const {prefersReducedMotion} = usePrefersReducedMotion();

  return (
    <ChartContainer theme={theme} ref={setRef}>
      {chartDimensions !== null && (
        <Chart
          chartDimensions={chartDimensions}
          isAnimated={isAnimated && !prefersReducedMotion}
          isSimple={isSimple}
          isStacked={isStacked}
          series={series}
          theme={theme}
          xAxisOptions={xAxisOptionsForChart}
        />
      )}
    </ChartContainer>
  );
}
