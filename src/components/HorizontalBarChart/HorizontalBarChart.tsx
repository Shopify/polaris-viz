import React, {useCallback, useLayoutEffect, useState} from 'react';
import {useDebouncedCallback} from 'use-debounce/lib';

import {getPrintFriendlyTheme} from '../../utilities';
import {ChartContainer} from '../../components/ChartContainer';
import {
  useResizeObserver,
  usePrefersReducedMotion,
  usePrintResizing,
} from '../../hooks';
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
  const {ref, setRef, entry} = useResizeObserver();

  const {isPrinting} = usePrintResizing({ref, setChartDimensions});
  const printFriendlyTheme = getPrintFriendlyTheme({isPrinting, theme});

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

  const [debouncedUpdateDimensions] = useDebouncedCallback(() => {
    updateDimensions();
  }, 100);

  useLayoutEffect(() => {
    updateDimensions();

    const isServer = typeof window === 'undefined';

    if (!isServer) {
      window.addEventListener('resize', debouncedUpdateDimensions);
    }

    return () => {
      if (!isServer) {
        window.removeEventListener('resize', debouncedUpdateDimensions);
      }
    };
  }, [entry, debouncedUpdateDimensions, updateDimensions]);

  const {prefersReducedMotion} = usePrefersReducedMotion();

  return (
    <ChartContainer theme={printFriendlyTheme} ref={setRef}>
      {chartDimensions !== null && (
        <Chart
          chartDimensions={chartDimensions}
          isAnimated={isAnimated && !prefersReducedMotion}
          isSimple={isSimple}
          isStacked={isStacked}
          series={series}
          theme={printFriendlyTheme}
          xAxisOptions={xAxisOptionsForChart}
        />
      )}
    </ChartContainer>
  );
}
