import React, {useLayoutEffect, useRef, useState} from 'react';
import {useDebouncedCallback} from 'use-debounce';

import {StringLabelFormatter, NumberLabelFormatter} from '../../types';

import {Chart} from './Chart';
import {Series, RenderTooltipContentData} from './types';
import {Legend, TooltipContent} from './components';

export interface LineChartProps {
  series: Series[];
  xAxisLabels?: string[];
  chartHeight?: number;
  accessibilityLabel?: string;
  formatXAxisLabel?: StringLabelFormatter;
  formatYAxisLabel?: NumberLabelFormatter;
  hasLegend?: boolean;
  renderTooltipContent?: (data: RenderTooltipContentData) => React.ReactNode;
}

export function LineChart({
  series,
  xAxisLabels,
  chartHeight = 250,
  formatXAxisLabel = (value) => value.toString(),
  formatYAxisLabel = (value) => value.toString(),
  hasLegend = true,
  accessibilityLabel,
  renderTooltipContent,
}: LineChartProps) {
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

  if (series.length === 0) {
    return null;
  }

  function renderDefaultTooltipContent({data}: RenderTooltipContentData) {
    const formattedData = data.map(({name, point: {label, value}, style}) => ({
      name,
      style,
      point: {
        value: formatYAxisLabel(value),
        label,
      },
    }));
    return <TooltipContent data={formattedData} />;
  }

  return (
    <div aria-label={accessibilityLabel} role="img">
      <div style={{height: chartHeight}} ref={containerRef}>
        {chartDimensions == null ? null : (
          <Chart
            series={series}
            xAxisLabels={xAxisLabels}
            formatXAxisLabel={formatXAxisLabel}
            formatYAxisLabel={formatYAxisLabel}
            dimensions={chartDimensions}
            renderTooltipContent={
              renderTooltipContent != null
                ? renderTooltipContent
                : renderDefaultTooltipContent
            }
          />
        )}
      </div>

      {hasLegend ? <Legend series={series} /> : null}
    </div>
  );
}
