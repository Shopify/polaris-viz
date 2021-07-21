import React, {useLayoutEffect, useRef, useState, useCallback} from 'react';
import {useDebouncedCallback} from 'use-debounce';

import type {Dimensions, XAxisOptions, YAxisOptions} from '../../types';
import {getSeriesColorsByLength, uniqueId} from '../../utilities';
import {SkipLink} from '../SkipLink';
import {
  usePrefersReducedMotion,
  useResizeObserver,
  useTheme,
} from '../../hooks';
import {
  CROSSHAIR_WIDTH,
  DEFAULT_CROSSHAIR_COLOR,
  colorSky,
  colorWhite,
} from '../../constants';

import {Chart} from './Chart';
import type {
  Series,
  RenderTooltipContentData,
  LineOptions,
  // XAxisOptions,
  // YAxisOptions,
  GridOptions,
  CrossHairOptions,
  SeriesWithDefaults,
} from './types';
import {TooltipContent} from './components';

export interface LineChartProps {
  series: Series[];
  renderTooltipContent?: (data: RenderTooltipContentData) => React.ReactNode;
  skipLinkText?: string;
  emptyStateText?: string;
  isAnimated?: boolean;
  lineOptions?: Partial<LineOptions>;
  xAxisOptions: Partial<XAxisOptions> &
    Required<Pick<XAxisOptions, 'xAxisLabels'>>;
  yAxisOptions?: Partial<YAxisOptions>;
  gridOptions?: Partial<GridOptions>;
  crossHairOptions?: Partial<CrossHairOptions>;
  theme?: string;
}

export function LineChart({
  series,
  renderTooltipContent,
  skipLinkText,
  emptyStateText,
  isAnimated = false,
  lineOptions,
  xAxisOptions,
  yAxisOptions,
  gridOptions,
  crossHairOptions,
  theme = 'Default',
}: LineChartProps) {
  const selectedTheme = useTheme(theme);

  const seriesColors = getSeriesColorsByLength(
    series.length,
    selectedTheme.seriesColors,
  );

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

  const lineOptionsWithDefaults = {
    hasSpline: false,
    width: 2,
    pointStroke: colorWhite,
    ...lineOptions,
  };

  const xAxisOptionsWithDefaults = {
    labelFormatter: (value: string) => value,
    hideLabels: false,
    showTicks: selectedTheme.xAxis.showTicks,
    labelColor: selectedTheme.xAxis.labelColor,
    useMinimalLabels: false,
    ...xAxisOptions,
  };

  const yAxisOptionsWithDefaults = {
    labelFormatter: (value: number) => value.toString(),
    labelColor: selectedTheme.yAxis.labelColor,
    backgroundColor: selectedTheme.yAxis.backgroundColor,
    integersOnly: false,
    ...yAxisOptions,
  };

  const gridOptionsWithDefaults = {
    showVerticalLines: true,
    showHorizontalLines: true,
    color: colorSky,
    horizontalOverflow: false,
    horizontalMargin: 0,
    ...gridOptions,
  };

  const crossHairOptionsWithDefaults = {
    color: DEFAULT_CROSSHAIR_COLOR,
    opacity: 1,
    width: CROSSHAIR_WIDTH,
    ...crossHairOptions,
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
    return <TooltipContent data={formattedData} />;
  }

  const seriesWithDefaults = series.map<SeriesWithDefaults>((series, index) => {
    return {
      color: seriesColors[index],
      lineStyle: 'solid',
      ...series,
    };
  });

  return (
    <React.Fragment>
      {skipLinkText == null ||
      skipLinkText.length === 0 ||
      series.length === 0 ? null : (
        <SkipLink anchorId={skipLinkAnchorId.current}>{skipLinkText}</SkipLink>
      )}
      <div style={{width: '100%', height: '100%'}} ref={setRef}>
        {chartDimensions == null ? null : (
          <Chart
            series={seriesWithDefaults}
            lineOptions={lineOptionsWithDefaults}
            xAxisOptions={xAxisOptionsWithDefaults}
            yAxisOptions={yAxisOptionsWithDefaults}
            gridOptions={gridOptionsWithDefaults}
            crossHairOptions={crossHairOptionsWithDefaults}
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
