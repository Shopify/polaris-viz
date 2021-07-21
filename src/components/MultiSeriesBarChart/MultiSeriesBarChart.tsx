import React, {useState, useLayoutEffect, useRef, useCallback} from 'react';
import {useDebouncedCallback} from 'use-debounce';

import type {Dimensions} from '../../types';
import {SkipLink} from '../SkipLink';
import {TooltipContent} from '../TooltipContent';
import {uniqueId, getSeriesColorsByLength} from '../../utilities';
import {useResizeObserver, useTheme} from '../../hooks';

import styles from './MultiSeriesBarChart.scss';
import {Chart} from './Chart';
import {
  Series,
  RenderTooltipContentData,
  BarOptions,
  XAxisOptions,
  YAxisOptions,
  BarMargin,
} from './types';

export interface MultiSeriesBarChartProps {
  series: Series[];
  renderTooltipContent?(data: RenderTooltipContentData): React.ReactNode;
  skipLinkText?: string;
  barOptions?: Partial<BarOptions>;
  xAxisOptions: Partial<XAxisOptions> & Pick<XAxisOptions, 'labels'>;
  yAxisOptions?: Partial<YAxisOptions>;
  isAnimated?: boolean;
  emptyStateText?: string;
  theme?: string;
}

export function MultiSeriesBarChart({
  series,
  renderTooltipContent,
  skipLinkText,
  isAnimated = true,
  barOptions,
  xAxisOptions,
  yAxisOptions,
  emptyStateText,
  theme = 'Default',
}: MultiSeriesBarChartProps) {
  const selectedTheme = useTheme(theme);

  const seriesColors = getSeriesColorsByLength(
    series.length,
    selectedTheme.seriesColors,
  );
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

  const barOptionsWithDefaults = {
    isStacked: false,
    ...barOptions,
    ...selectedTheme.bar,
    innerMargin: BarMargin[selectedTheme.bar.innerMargin],
    outerMargin: BarMargin[selectedTheme.bar.outerMargin],
  };

  const xAxisOptionsWithDefaults = {
    labelFormatter: (value: string) => value,
    ...xAxisOptions,
    ...selectedTheme.xAxis,
  };

  const yAxisOptionsWithDefaults = {
    labelFormatter: (value: number) => value.toString(),
    integersOnly: false,
    ...yAxisOptions,
    ...selectedTheme.yAxis,
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
    <div
      className={styles.ChartContainer}
      style={{
        background: selectedTheme.chartContainer.backgroundColor,
        padding: selectedTheme.chartContainer.padding,
        borderRadius: selectedTheme.chartContainer.borderRadius,
      }}
      ref={setRef}
    >
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
            gridOptions={selectedTheme.grid}
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
