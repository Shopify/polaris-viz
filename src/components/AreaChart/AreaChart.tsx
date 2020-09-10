import React, {useEffect, useRef, useState} from 'react';
import {useDebouncedCallback} from 'use-debounce';
import {Color} from 'types';

import {Chart} from './Chart';
import {Legend} from './components';

interface Props {
  chartHeight?: number;
  accessibilityLabel?: string;
  formatYAxisValue?(value: number): string;
  dataCategories: string[];
  colors?: Color[];
  data: {label: string; values: number[]}[];
}

export function AreaChart({
  data,
  dataCategories,
  chartHeight = 250,
  formatYAxisValue = (value) => `${value}`,
  accessibilityLabel,
  colors = ['colorPurpleDark', 'colorBlue', 'colorTeal'],
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
            data={data}
            dataCategories={dataCategories}
            formatYAxisValue={formatYAxisValue}
            dimensions={chartDimensions}
            colors={colors}
          />
        )}
      </div>

      <Legend colors={colors} dataCategories={dataCategories} />
    </div>
  );
}
