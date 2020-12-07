import React, {useState, useLayoutEffect, useRef} from 'react';
import {useDebouncedCallback} from 'use-debounce';
import {Color} from 'types';

import {StringLabelFormatter, NumberLabelFormatter} from '../types';

import {Chart} from './Chart';
import {BarData, BarMargin} from './types';

interface Props {
  data: BarData[];
  barMargin?: keyof typeof BarMargin;
  accessibilityLabel?: string;
  color?: Color;
  highlightColor?: Color;
  formatXAxisLabel?: StringLabelFormatter;
  formatYAxisLabel?: NumberLabelFormatter;
  timeSeries?: boolean;
}

export function BarChart({
  data,
  highlightColor,
  accessibilityLabel,
  barMargin = 'Medium',
  color = 'colorPurple',
  timeSeries = false,
  formatXAxisLabel = (value) => value.toString(),
  formatYAxisLabel = (value) => value.toString(),
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
    <div
      aria-label={accessibilityLabel}
      role="img"
      style={{width: '100%', height: '100%'}}
      ref={containerRef}
    >
      {chartDimensions == null ? null : (
        <Chart
          data={data}
          chartDimensions={chartDimensions}
          barMargin={BarMargin[barMargin]}
          color={color}
          highlightColor={highlightColor}
          formatXAxisLabel={formatXAxisLabel}
          formatYAxisLabel={formatYAxisLabel}
          timeSeries={timeSeries}
        />
      )}
    </div>
  );
}
