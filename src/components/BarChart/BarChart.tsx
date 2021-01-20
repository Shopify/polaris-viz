import React, {useState, useLayoutEffect, useRef} from 'react';
import {useDebouncedCallback} from 'use-debounce';
import {Color, Data} from 'types';

import {StringLabelFormatter, NumberLabelFormatter} from '../../types';
import {getDefaultColor} from '../../utilities';

import {TooltipContent} from './components';
import {Chart} from './Chart';
import {BarMargin, RenderTooltipContentData} from './types';

export interface BarChartProps {
  data: Data[];
  barMargin?: keyof typeof BarMargin;
  accessibilityLabel?: string;
  color?: Color;
  highlightColor?: Color;
  formatXAxisLabel?: StringLabelFormatter;
  formatYAxisLabel?: NumberLabelFormatter;
  timeSeries?: boolean;
  renderTooltipContent?: (data: RenderTooltipContentData) => React.ReactNode;
}

export function BarChart({
  data,
  accessibilityLabel,
  color = getDefaultColor(),
  highlightColor = getDefaultColor(),
  barMargin = 'Medium',
  timeSeries = false,
  formatXAxisLabel = (value) => value.toString(),
  formatYAxisLabel = (value) => value.toString(),
  renderTooltipContent,
}: BarChartProps) {
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

  function renderDefaultTooltipContent({
    label,
    value,
  }: RenderTooltipContentData) {
    const formattedLabel = formatXAxisLabel(label);
    const formattedValue = formatYAxisLabel(value);

    return <TooltipContent label={formattedLabel} value={formattedValue} />;
  }

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
          renderTooltipContent={
            renderTooltipContent != null
              ? renderTooltipContent
              : renderDefaultTooltipContent
          }
        />
      )}
    </div>
  );
}
