import React, {useState, useLayoutEffect, useRef} from 'react';
import {useDebouncedCallback} from 'use-debounce';
import {Color} from 'types';

import {StringLabelFormatter, NumberLabelFormatter} from '../../types';

import {Tooltip} from './components';
import {Chart} from './Chart';
import {BarData, BarMargin, RenderTooltipProps} from './types';

interface Props {
  data: BarData[];
  barMargin?: keyof typeof BarMargin;
  accessibilityLabel?: string;
  color?: Color;
  highlightColor?: Color;
  formatXAxisLabel?: StringLabelFormatter;
  formatYAxisLabel?: NumberLabelFormatter;
  timeSeries?: boolean;
  renderTooltip?: (props: RenderTooltipProps) => React.ReactNode;
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
  renderTooltip,
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

  function renderDefaultTooltip({label, value}: RenderTooltipProps) {
    const formattedLabel = formatXAxisLabel(label);
    const formattedValue = formatYAxisLabel(value);

    return <Tooltip label={formattedLabel} value={formattedValue} />;
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
          renderTooltip={renderTooltip || renderDefaultTooltip}
        />
      )}
    </div>
  );
}
