import React, {useState, useEffect, useRef} from 'react';
import {useDebouncedCallback} from 'use-debounce';

import {Chart} from './Chart';
import {Data} from './types';
import {Legend} from './components';

interface Props {
  series: Data[];
  labels: string[];
  timeSeries?: boolean;
  accessibilityLabel?: string;
  formatYValue?(value: number): string;
  chartHeight?: number;
}

export function GroupedBarChart({
  labels,
  series,
  accessibilityLabel,
  timeSeries = false,
  chartHeight = 250,
  formatYValue = (value) => value.toString(),
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
            labels={labels}
            chartDimensions={chartDimensions}
            formatYValue={formatYValue}
            timeSeries={timeSeries}
          />
        )}
      </div>

      <Legend series={series} />
    </div>
  );
}
