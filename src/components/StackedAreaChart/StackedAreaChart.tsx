import React, {useLayoutEffect, useRef, useState} from 'react';
import {useDebouncedCallback} from 'use-debounce';

import {Chart} from './Chart';
import {Legend} from './components';
import {Series} from './types';

interface Props {
  chartHeight?: number;
  accessibilityLabel?: string;
  formatYAxisValue?(value: number): string;
  xAxisLabels: string[];
  series: Series[];
  tooltipSumDescriptor?: string;
  opacity?: number;
  isAnimated?: boolean;
}

export function StackedAreaChart({
  xAxisLabels,
  series,
  tooltipSumDescriptor,
  chartHeight = 250,
  formatYAxisValue = (value) => `${value}`,
  accessibilityLabel,
  opacity = 1,
  isAnimated = false,
}: Props) {
  const [chartDimensions, setChartDimensions] = useState<DOMRect | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [updateDimensions] = useDebouncedCallback(() => {
    if (containerRef.current != null) {
      setChartDimensions(containerRef.current.getBoundingClientRect());
    }
  }, 100);

  useLayoutEffect(() => {
    if (containerRef.current != null) {
      setChartDimensions(containerRef.current.getBoundingClientRect());
    }

    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [containerRef, updateDimensions]);

  return (
    <div aria-label={accessibilityLabel} role="img">
      <div style={{height: chartHeight}} ref={containerRef}>
        {chartDimensions == null ? null : (
          <Chart
            xAxisLabels={xAxisLabels}
            series={series}
            formatYAxisValue={formatYAxisValue}
            dimensions={chartDimensions}
            tooltipSumDescriptor={tooltipSumDescriptor}
            opacity={opacity}
            isAnimated={isAnimated}
          />
        )}
      </div>

      <Legend series={series} />
    </div>
  );
}
