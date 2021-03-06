import React, {useLayoutEffect, useRef, useState} from 'react';
import {useDebouncedCallback} from 'use-debounce';

import {getDefaultColor, uniqueId} from '../../utilities';
import {StringLabelFormatter, NumberLabelFormatter} from '../../types';
import {SkipLink} from '../SkipLink';

import {Chart} from './Chart';
import {Series, RenderTooltipContentData} from './types';
import {TooltipContent} from './components';

export interface LineChartProps {
  series: Series[];
  xAxisLabels: string[];
  hideXAxisLabels?: boolean;
  accessibilityLabel?: string;
  formatXAxisLabel?: StringLabelFormatter;
  formatYAxisLabel?: NumberLabelFormatter;
  renderTooltipContent?: (data: RenderTooltipContentData) => React.ReactNode;
  skipLinkText?: string;
}

export function LineChart({
  series,
  xAxisLabels,
  formatXAxisLabel = (value) => value.toString(),
  formatYAxisLabel = (value) => Math.round(value).toString(),
  hideXAxisLabels = false,
  renderTooltipContent,
  skipLinkText,
}: LineChartProps) {
  const [chartDimensions, setChartDimensions] = useState<DOMRect | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const skipLinkAnchorId = useRef(uniqueId('lineChart'));

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
    const formattedData = data.map(
      ({name, point: {label, value}, color, lineStyle}) => ({
        name,
        color,
        lineStyle,
        point: {
          value: formatYAxisLabel(value),
          label,
        },
      }),
    );
    return <TooltipContent data={formattedData} />;
  }

  const seriesWithDefaults = series.map<Required<Series>>((series, index) => ({
    color: getDefaultColor(index),
    lineStyle: 'solid',
    showArea: false,
    ...series,
  }));

  return (
    <React.Fragment>
      {skipLinkText == null || skipLinkText.length === 0 ? null : (
        <SkipLink anchorId={skipLinkAnchorId.current}>{skipLinkText}</SkipLink>
      )}
      <div style={{width: '100%', height: '100%'}} ref={containerRef}>
        {chartDimensions == null ? null : (
          <Chart
            series={seriesWithDefaults}
            xAxisLabels={xAxisLabels}
            formatXAxisLabel={formatXAxisLabel}
            formatYAxisLabel={formatYAxisLabel}
            dimensions={chartDimensions}
            hideXAxisLabels={hideXAxisLabels}
            renderTooltipContent={
              renderTooltipContent != null
                ? renderTooltipContent
                : renderDefaultTooltipContent
            }
          />
        )}
      </div>

      {skipLinkText == null || skipLinkText.length === 0 ? null : (
        <SkipLink.Anchor id={skipLinkAnchorId.current} />
      )}
    </React.Fragment>
  );
}
