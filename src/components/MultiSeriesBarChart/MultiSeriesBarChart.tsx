import React, {useState, useLayoutEffect, useRef} from 'react';
import {useDebouncedCallback} from 'use-debounce';

import {StringLabelFormatter, NumberLabelFormatter} from '../../types';
import {TooltipContent} from '../TooltipContent';
import {getDefaultColor} from '../../utilities';

import {Chart} from './Chart';
import {Series, RenderTooltipContentData} from './types';

export interface MultiSeriesBarChartProps {
  series: Series[];
  labels: string[];
  timeSeries?: boolean;
  accessibilityLabel?: string;
  formatXAxisLabel?: StringLabelFormatter;
  formatYAxisLabel?: NumberLabelFormatter;
  renderTooltipContent?(data: RenderTooltipContentData): React.ReactNode;
  isStacked?: boolean;
}

export function MultiSeriesBarChart({
  labels,
  series,
  isStacked = false,
  timeSeries = false,
  accessibilityLabel,
  formatXAxisLabel = (value) => value.toString(),
  formatYAxisLabel = (value) => Math.round(value).toString(),
  renderTooltipContent,
}: MultiSeriesBarChartProps) {
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

  function renderDefaultTooltipContent({data}: RenderTooltipContentData) {
    const formattedData = data.map(({label, value, color}) => ({
      color,
      label,
      value: formatYAxisLabel(value),
    }));

    return <TooltipContent data={formattedData} />;
  }

  const seriesWithDefaults = series.map((series, index) => ({
    color: getDefaultColor(index),
    highlightColor: getDefaultColor(index),
    ...series,
  }));

  return (
    <div
      aria-label={accessibilityLabel}
      role="img"
      style={{height: '100%', width: '100%'}}
      ref={containerRef}
    >
      {chartDimensions == null ? null : (
        <Chart
          series={seriesWithDefaults}
          labels={labels}
          chartDimensions={chartDimensions}
          formatXAxisLabel={formatXAxisLabel}
          formatYAxisLabel={formatYAxisLabel}
          renderTooltipContent={
            renderTooltipContent != null
              ? renderTooltipContent
              : renderDefaultTooltipContent
          }
          timeSeries={timeSeries}
          isStacked={isStacked}
        />
      )}
    </div>
  );
}
