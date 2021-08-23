import React, {useState, useLayoutEffect, useRef, useCallback} from 'react';
import {useDebouncedCallback} from 'use-debounce';

import type {Dimensions} from '../../types';
import {DEFAULT_GREY_LABEL, colorSky} from '../../constants';
import {SkipLink} from '../SkipLink';
import {TooltipContent} from '../TooltipContent';
import {uniqueId} from '../../utilities';
import {useResizeObserver, useTheme, useThemeSeriesColors} from '../../hooks';

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
  theme,
}: MultiSeriesBarChartProps) {
  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(series, selectedTheme);
  const [chartDimensions, setChartDimensions] = useState<Dimensions | null>(
    null,
  );
  const skipLinkAnchorId = useRef(uniqueId('multiSeriesBarChart'));
  const {ref, setRef, entry} = useResizeObserver();

  const emptyState = series.length === 0;

  const updateDimensions = useCallback(() => {
    if (entry != null) {
      const {width, height} = entry.contentRect;
      setChartDimensions((prevDimensions) => {
        if (
          prevDimensions != null &&
          width === prevDimensions.width &&
          height === prevDimensions.height
        ) {
          return prevDimensions;
        } else {
          return {width, height};
        }
      });
    }
  }, [entry]);

  const [debouncedUpdateDimensions] = useDebouncedCallback(() => {
    updateDimensions();
  }, 100);

  const handlePrintMediaQueryChange = useCallback(
    (event: MediaQueryListEvent) => {
      if (event.matches && ref != null) {
        setChartDimensions(ref.getBoundingClientRect());
      }
    },
    [ref],
  );

  useLayoutEffect(() => {
    updateDimensions();

    const isServer = typeof window === 'undefined';

    if (!isServer) {
      window.addEventListener('resize', debouncedUpdateDimensions);

      if (typeof window.matchMedia('print').addEventListener === 'function') {
        window
          .matchMedia('print')
          .addEventListener('change', handlePrintMediaQueryChange);
      } else if (typeof window.matchMedia('print').addListener === 'function') {
        window.matchMedia('print').addListener(handlePrintMediaQueryChange);
      }
    }

    return () => {
      if (!isServer) {
        window.removeEventListener('resize', debouncedUpdateDimensions);

        if (typeof window.matchMedia('print').addEventListener === 'function') {
          window
            .matchMedia('print')
            .removeEventListener('change', handlePrintMediaQueryChange);
        } else if (
          typeof window.matchMedia('print').addListener === 'function'
        ) {
          window
            .matchMedia('print')
            .removeListener(handlePrintMediaQueryChange);
        }
      }
    };
  }, [
    entry,
    debouncedUpdateDimensions,
    updateDimensions,
    handlePrintMediaQueryChange,
  ]);

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
    zeroAsMinHeight: false,
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
    integersOnly: false,
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
    color: seriesColors[index],
    ...series,
  }));

  return (
    <div style={{height: '100%', width: '100%'}} ref={setRef}>
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
