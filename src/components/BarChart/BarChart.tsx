import React, {useState, useEffect, useRef} from 'react';
import {useDebouncedCallback} from 'use-debounce';
import {Chart} from './components';
import {BarData} from './types';
import {Color} from 'types';

interface Props {
  data: BarData[];
  chartHeight?: number;
  histogram?: boolean;
  accessibilityLabel?: string;
  color?: Color;
  highlightColor?: Color;
  formatValue?(value: number): string;
}

export function BarChart({
  data,
  chartHeight = 300,
  histogram,
  color = 'colorPurple',
  highlightColor,
  formatValue = (value) => value.toString(),
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
    <div style={{height: chartHeight}} ref={containerRef}>
      {chartDimensions == null ? null : (
        <Chart
          data={data}
          chartDimensions={chartDimensions}
          histogram={histogram}
          color={color}
          highlightColor={highlightColor}
          formatValue={formatValue}
        />
      )}
    </div>
  );
}
