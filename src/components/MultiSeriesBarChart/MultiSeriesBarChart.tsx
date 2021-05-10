import React, {useState, useLayoutEffect, useRef} from 'react';
import {useDebouncedCallback} from 'use-debounce';
import {colorSky} from '@shopify/polaris-tokens';

import {DEFAULT_GREY_LABEL} from '../../constants';
import {SkipLink} from '../SkipLink';
import {TooltipContent} from '../TooltipContent';
import {getDefaultColor, uniqueId} from '../../utilities';

import {Chart} from './Chart';
import {
  Series,
  RenderTooltipContentData,
  BarOptions,
  GridOptions,
  XAxisOptions,
  YAxisOptions,
  BarMargin,
} from './types';

export interface MultiSeriesBarChartProps {
  series: Series[];
  renderTooltipContent?(data: RenderTooltipContentData): React.ReactNode;
  skipLinkText?: string;
  barOptions?: Partial<BarOptions>;
  gridOptions?: Partial<GridOptions>;
  xAxisOptions: Partial<XAxisOptions> & Pick<XAxisOptions, 'labels'>;
  yAxisOptions?: Partial<YAxisOptions>;
  isAnimated?: boolean;
  emptyStateText?: string;
}

export function MultiSeriesBarChart({
  series,
  renderTooltipContent,
  skipLinkText,
  isAnimated = false,
  barOptions,
  gridOptions,
  xAxisOptions,
  yAxisOptions,
  emptyStateText,
}: MultiSeriesBarChartProps) {
  const [chartDimensions, setChartDimensions] = useState<DOMRect | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const skipLinkAnchorId = useRef(uniqueId('multiSeriesBarChart'));
  const emptyState = series.length === 0;

  const [updateDimensions] = useDebouncedCallback(() => {
    if (containerRef.current != null) {
      setChartDimensions(containerRef.current.getBoundingClientRect());
    }
  }, 100);

  useLayoutEffect(() => {
    if (containerRef.current != null) {
      setChartDimensions(containerRef.current.getBoundingClientRect());
    }

    const isServer = typeof window === 'undefined';

    if (!isServer) {
      window.addEventListener('resize', updateDimensions);
    }

    return () => {
      if (!isServer) {
        window.removeEventListener('resize', updateDimensions);
      }
    };
  }, [containerRef, updateDimensions]);

  const innerMargin =
    barOptions != null && barOptions.innerMargin != null
      ? BarMargin[barOptions.innerMargin]
      : BarMargin.Medium;

  const outerMargin =
    barOptions != null && barOptions.outerMargin != null
      ? BarMargin[barOptions.outerMargin]
      : BarMargin.None;

  const barOptionsWithDefaults = {
    hasRoundedCorners: false,
    isStacked: false,
    ...barOptions,
    innerMargin,
    outerMargin,
  };

  const gridOptionsWithDefaults = {
    showHorizontalLines: true,
    color: colorSky,
    horizontalOverflow: false,
    horizontalMargin: 0,
    ...gridOptions,
  };

  const xAxisOptionsWithDefaults = {
    labelFormatter: (value: string) => value,
    showTicks: true,
    labelColor: DEFAULT_GREY_LABEL,
    ...xAxisOptions,
  };

  const yAxisOptionsWithDefaults = {
    labelFormatter: (value: number) => value.toString(),
    labelColor: DEFAULT_GREY_LABEL,
    backgroundColor: 'transparent',
    ...yAxisOptions,
  };

  function renderDefaultTooltipContent({data}: RenderTooltipContentData) {
    const formattedData = data.map(({label, value, color}) => ({
      color,
      label,
      value: yAxisOptionsWithDefaults.labelFormatter(value),
    }));

    return <TooltipContent data={formattedData} />;
  }

  const seriesWithDefaults = series.map((series, index) => ({
    color: getDefaultColor(index),
    ...series,
  }));

  return (
    <div style={{height: '100%', width: '100%'}} ref={containerRef}>
      {chartDimensions == null ? null : (
        <React.Fragment>
          {skipLinkText == null ||
          skipLinkText.length === 0 ||
          emptyState ? null : (
            <SkipLink anchorId={skipLinkAnchorId.current}>
              {skipLinkText}
            </SkipLink>
          )}
          <Chart
            series={seriesWithDefaults}
            chartDimensions={chartDimensions}
            barOptions={barOptionsWithDefaults}
            gridOptions={gridOptionsWithDefaults}
            xAxisOptions={xAxisOptionsWithDefaults}
            yAxisOptions={yAxisOptionsWithDefaults}
            isAnimated={isAnimated}
            renderTooltipContent={
              renderTooltipContent != null
                ? renderTooltipContent
                : renderDefaultTooltipContent
            }
            emptyStateText={emptyStateText}
          />
          {skipLinkText == null ||
          skipLinkText.length === 0 ||
          emptyState ? null : (
            <SkipLink.Anchor id={skipLinkAnchorId.current} />
          )}
        </React.Fragment>
      )}
    </div>
  );
}
