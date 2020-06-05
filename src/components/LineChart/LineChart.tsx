import React, {useEffect, useRef, useState} from 'react';
import {useDebouncedCallback} from 'use-debounce';

import {Chart} from './Chart';
import {Series} from './types';
import {Legend} from './components';

interface Props {
  series: Series[];
  xAxisLabels?: string[];
  chartHeight?: number;
  accessibilityLabel?: string;
  formatYAxisValue?(value: number): string;
}

export function LineChart({
  series,
  xAxisLabels,
  chartHeight = 250,
  formatYAxisValue = (value) => `${value}`,
  accessibilityLabel,
}: Props) {
  const [chartDimensions, setChartDimensions] = useState<DOMRect | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [updateDimensions] = useDebouncedCallback(() => {
    if (containerRef.current != null) {
      setChartDimensions(containerRef.current.getBoundingClientRect());
    }
  }, 100);

  useEffect(() => {
    if (containerRef.current != null) {
      updateDimensions();
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
            series={series}
            xAxisLabels={xAxisLabels}
            formatYAxisValue={formatYAxisValue}
            dimensions={chartDimensions}
          />
        )}
      </div>

      <Legend series={series} />
    </div>
  );
}
