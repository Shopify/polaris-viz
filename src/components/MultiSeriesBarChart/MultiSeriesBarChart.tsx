import React, {useState, useLayoutEffect, useRef, useCallback} from 'react';
import {useDebouncedCallback} from 'use-debounce';

import {ChartContainer} from '../../components/ChartContainer';
import type {Dimensions} from '../../types';
import {SkipLink} from '../SkipLink';
import {TooltipContent} from '../TooltipContent';
import {getPrintFriendlyTheme, uniqueId} from '../../utilities';
import {
  usePrintResizing,
  useResizeObserver,
  useTheme,
  useThemeSeriesColors,
} from '../../hooks';

import {Chart} from './Chart';
import type {
  Series,
  RenderTooltipContentData,
  XAxisOptions,
  YAxisOptions,
} from './types';

export interface MultiSeriesBarChartProps {
  series: Series[];
  renderTooltipContent?(data: RenderTooltipContentData): React.ReactNode;

  barOptions?: {isStacked: boolean};
  emptyStateText?: string;
  isAnimated?: boolean;
  skipLinkText?: string;
  theme?: string;
  xAxisOptions?: Partial<XAxisOptions>;
  yAxisOptions?: Partial<YAxisOptions>;
}

export function MultiSeriesBarChart({
  series,
  barOptions = {isStacked: false},
  renderTooltipContent,
  skipLinkText,
  isAnimated = false,
  xAxisOptions,
  yAxisOptions,
  emptyStateText,
  theme,
}: MultiSeriesBarChartProps) {
  const [chartDimensions, setChartDimensions] = useState<Dimensions | null>(
    null,
  );

  const skipLinkAnchorId = useRef(uniqueId('multiSeriesBarChart'));
  const {ref, setRef, entry} = useResizeObserver();

  const {isPrinting} = usePrintResizing({ref, setChartDimensions});
  const printFriendlyTheme = getPrintFriendlyTheme({isPrinting, theme});
  const selectedTheme = useTheme(printFriendlyTheme);
  const seriesColors = useThemeSeriesColors(series, selectedTheme);

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

  useLayoutEffect(() => {
    updateDimensions();

    const isServer = typeof window === 'undefined';

    if (!isServer) {
      window.addEventListener('resize', debouncedUpdateDimensions);
    }

    return () => {
      if (!isServer) {
        window.removeEventListener('resize', debouncedUpdateDimensions);
      }
    };
  }, [entry, debouncedUpdateDimensions, updateDimensions]);

  const xAxisOptionsWithDefaults: XAxisOptions = {
    labelFormatter: (value: string) => value,
    labels: [],
    wrapLabels: true,
    ...xAxisOptions,
  };

  const yAxisOptionsWithDefaults: Required<YAxisOptions> = {
    labelFormatter: (value: number) => value.toString(),
    integersOnly: false,
    ...yAxisOptions,
  };

  function renderDefaultTooltipContent({data}: RenderTooltipContentData) {
    const formattedData = data.map(({label, value, color}) => ({
      color,
      label,
      value: yAxisOptionsWithDefaults.labelFormatter(value),
    }));

    return <TooltipContent theme={printFriendlyTheme} data={formattedData} />;
  }

  const seriesWithDefaults = series.map((series, index) => ({
    color: seriesColors[index],
    ...series,
  }));

  return (
    <ChartContainer ref={setRef} theme={printFriendlyTheme}>
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
            isStacked={barOptions.isStacked}
            series={seriesWithDefaults}
            chartDimensions={chartDimensions}
            xAxisOptions={xAxisOptionsWithDefaults}
            yAxisOptions={yAxisOptionsWithDefaults}
            isAnimated={isAnimated}
            renderTooltipContent={
              renderTooltipContent != null
                ? renderTooltipContent
                : renderDefaultTooltipContent
            }
            emptyStateText={emptyStateText}
            theme={printFriendlyTheme}
          />
          {skipLinkText == null ||
          skipLinkText.length === 0 ||
          emptyState ? null : (
            <SkipLink.Anchor id={skipLinkAnchorId.current} />
          )}
        </React.Fragment>
      )}
    </ChartContainer>
  );
}
