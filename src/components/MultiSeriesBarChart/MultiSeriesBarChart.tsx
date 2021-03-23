import React, {useState, useLayoutEffect, useRef} from 'react';
import {useDebouncedCallback} from 'use-debounce';

import {SkipLink} from '../SkipLink';
import {StringLabelFormatter, NumberLabelFormatter} from '../../types';
import {TooltipContent} from '../TooltipContent';
import {getDefaultColor, uniqueId} from '../../utilities';

import {Chart} from './Chart';
import {Series, RenderTooltipContentData} from './types';

export interface MultiSeriesBarChartProps {
  series: Series[];
  labels: string[];
  timeSeries?: boolean;
  formatXAxisLabel?: StringLabelFormatter;
  formatYAxisLabel?: NumberLabelFormatter;
  renderTooltipContent?(data: RenderTooltipContentData): React.ReactNode;
  isStacked?: boolean;
  skipLinkText?: string;
  hasRoundedCorners?: boolean;
}

export function MultiSeriesBarChart({
  labels,
  series,
  isStacked = false,
  timeSeries = false,
  hasRoundedCorners = false,
  formatXAxisLabel = (value) => value.toString(),
  formatYAxisLabel = (value) => value.toString(),
  renderTooltipContent,
  skipLinkText,
}: MultiSeriesBarChartProps) {
  const [chartDimensions, setChartDimensions] = useState<DOMRect | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const skipLinkAnchorId = useRef(uniqueId('multiSeriesBarChart'));

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
    <div style={{height: '100%', width: '100%'}} ref={containerRef}>
      {chartDimensions == null ? null : (
        <React.Fragment>
          {skipLinkText == null || skipLinkText.length === 0 ? null : (
            <SkipLink anchorId={skipLinkAnchorId.current}>
              {skipLinkText}
            </SkipLink>
          )}
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
            hasRoundedCorners={hasRoundedCorners}
          />
          {skipLinkText == null || skipLinkText.length === 0 ? null : (
            <SkipLink.Anchor id={skipLinkAnchorId.current} />
          )}
        </React.Fragment>
      )}
    </div>
  );
}
