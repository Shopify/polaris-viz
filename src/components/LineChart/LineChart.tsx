import React, {useLayoutEffect, useRef, useState, useCallback} from 'react';
import {useDebouncedCallback} from 'use-debounce';

import {useThemeSeriesColors} from '../../hooks/use-theme-series-colors';
import type {Dimensions, GradientStop} from '../../types';
import {isGradientType, changeColorOpacity, uniqueId} from '../../utilities';
import {SkipLink} from '../SkipLink';
import {
  usePrefersReducedMotion,
  useResizeObserver,
  useTheme,
} from '../../hooks';

import {Chart} from './Chart';
import type {
  Series,
  RenderTooltipContentData,
  XAxisOptions,
  YAxisOptions,
  SeriesWithDefaults,
} from './types';
import {TooltipContent} from './components';
import styles from './LineChart.scss';

export interface LineChartProps {
  series: Series[];
  xAxisOptions: Partial<XAxisOptions> & Pick<XAxisOptions, 'xAxisLabels'>;
  yAxisOptions?: Partial<YAxisOptions>;
  skipLinkText?: string;
  emptyStateText?: string;
  isAnimated?: boolean;
  renderTooltipContent?: (data: RenderTooltipContentData) => React.ReactNode;
  theme?: string;
}

export function LineChart({
  series,
  renderTooltipContent,
  skipLinkText,
  emptyStateText,
  isAnimated = false,
  xAxisOptions,
  yAxisOptions,
  theme,
}: LineChartProps) {
  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(series, selectedTheme);

  const [chartDimensions, setChartDimensions] = useState<Dimensions | null>(
    null,
  );
  const {ref, setRef, entry} = useResizeObserver();
  const {prefersReducedMotion} = usePrefersReducedMotion();

  const skipLinkAnchorId = useRef(uniqueId('lineChart'));

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
    updateDimensions,
    debouncedUpdateDimensions,
    handlePrintMediaQueryChange,
  ]);

  const xAxisOptionsWithDefaults = {
    labelFormatter:
      xAxisOptions.labelFormatter == null
        ? (value: string) => value
        : xAxisOptions.labelFormatter,
    xAxisLabels: xAxisOptions.xAxisLabels,
    useMinimalLabels: xAxisOptions.useMinimalLabels ?? false,
    ...selectedTheme.xAxis,
    hide: xAxisOptions.hide ?? selectedTheme.xAxis.hide,
  };

  const yAxisOptionsWithDefaults = {
    labelFormatter:
      yAxisOptions?.labelFormatter == null
        ? (value: number) => value.toString()
        : yAxisOptions.labelFormatter,
    labelColor: selectedTheme.yAxis.labelColor,
    backgroundColor: selectedTheme.yAxis.backgroundColor,
    integersOnly:
      yAxisOptions?.integersOnly == null ? false : yAxisOptions.integersOnly,
  };

  function renderDefaultTooltipContent({data}: RenderTooltipContentData) {
    const formattedData = data.map(
      ({name, point: {label, value}, color, lineStyle}) => ({
        name,
        color,
        lineStyle,
        point: {
          value: yAxisOptionsWithDefaults.labelFormatter(value),
          label,
        },
      }),
    );
    return <TooltipContent theme={theme} data={formattedData} />;
  }

  const seriesWithDefaults = series.map<SeriesWithDefaults>((series, index) => {
    const seriesColor = seriesColors[index];

    const isSolidLine =
      series.lineStyle == null || series.lineStyle === 'solid';

    const areaColor = isGradientType(seriesColor)
      ? (seriesColor[seriesColor.length - 1] as GradientStop).color
      : seriesColor;

    return {
      lineStyle: selectedTheme.line.style,
      areaColor: isSolidLine
        ? changeColorOpacity(areaColor as string, 0.5)
        : undefined,
      ...series,
      // We want to override the color, not set a default
      // so it has to come last
      color: isSolidLine
        ? series.color ?? seriesColors[index]
        : selectedTheme.line.dottedStrokeColor,
    };
  });

  return (
    <React.Fragment>
      {skipLinkText == null ||
      skipLinkText.length === 0 ||
      series.length === 0 ? null : (
        <SkipLink anchorId={skipLinkAnchorId.current}>{skipLinkText}</SkipLink>
      )}
      <div
        ref={setRef}
        className={styles.Container}
        style={{
          background: selectedTheme.chartContainer.backgroundColor,
          padding: selectedTheme.chartContainer.padding,
          borderRadius: selectedTheme.chartContainer.borderRadius,
        }}
      >
        {chartDimensions == null ? null : (
          <Chart
            series={seriesWithDefaults}
            lineOptions={selectedTheme.line}
            xAxisOptions={xAxisOptionsWithDefaults}
            yAxisOptions={yAxisOptionsWithDefaults}
            gridOptions={selectedTheme.grid}
            crossHairOptions={selectedTheme.crossHair}
            dimensions={chartDimensions}
            isAnimated={isAnimated && !prefersReducedMotion}
            renderTooltipContent={
              renderTooltipContent != null
                ? renderTooltipContent
                : renderDefaultTooltipContent
            }
            emptyStateText={emptyStateText}
          />
        )}
      </div>

      {skipLinkText == null || skipLinkText.length === 0 ? null : (
        <SkipLink.Anchor id={skipLinkAnchorId.current} />
      )}
    </React.Fragment>
  );
}
