import React, {useState, useLayoutEffect, useRef, useCallback} from 'react';
import {useDebouncedCallback} from 'use-debounce';

import {getSeriesColorsFromCount} from '../../hooks/use-theme-series-colors';
import {Dimensions, BarMargin} from '../../types';
import {SkipLink} from '../SkipLink';
import {uniqueId, normalizeData} from '../../utilities';
import {useResizeObserver, useTheme} from '../../hooks';
import type {XAxisOptions, YAxisOptions} from '../../types';

import styles from './BarChart.scss';
import {TooltipContent} from './components';
import {Chart} from './Chart';
import type {
  BarChartData,
  RenderTooltipContentData,
  Annotation,
  AnnotationLookupTable,
} from './types';

export interface BarChartProps {
  /** Data represented as bars */
  data: BarChartData[];
  /** An array of annotations to show on the chart. */
  annotations?: Annotation[];
  /**
   * If provided, renders a `<SkipLink/>` button with the string.
   *
   * Use this for charts with large data sets, so keyboard users
   * can skip all the tabbable data points in the chart.
   * */
  skipLinkText?: string;
  /**
   * Used to indicate to screenreaders that a chart with no data has been rendered,
   * in the case that an empty array is passed as the data.
   *
   * It is strongly recommended that this is included if the data prop could
   * be an empty array.
   * */
  emptyStateText?: string;
  /**
   * Whether to animate the bars when the chart is initially rendered and its data is updated.
   *
   * Even if `isAnimated` is set to true, animations will not be
   * displayed for users with reduced motion preferences.
   * */
  isAnimated?: boolean;
  /**
   * Accepts a function that renders the tooltip content.
   *
   * By default it calls `formatXAxisLabel` and `formatYAxisLabel` to format
   * the the tooltip values and passes them to `<BarChartTooltipContent />`
   */
  renderTooltipContent?: (data: RenderTooltipContentData) => React.ReactNode;
  /** An object used to configure the xAxis and its labels. */
  xAxisOptions?: XAxisOptions;
  /** An object used to configure the yAxis and its labels. */
  yAxisOptions?: YAxisOptions;
  /** The theme that the chart will inherit its styles from */
  theme?: string;
}

/** Used to show comparison across categories or time. */
export function BarChart({
  data,
  annotations,
  renderTooltipContent,
  emptyStateText,
  isAnimated = false,
  skipLinkText,
  xAxisOptions = {
    labelFormatter: (value: string) => value,
    useMinimalLabels: false,
  },
  yAxisOptions = {
    integersOnly: false,
    labelFormatter: (value: number) => value.toString(),
  },
  theme,
}: BarChartProps) {
  const selectedTheme = useTheme(theme);
  const [seriesColor] = getSeriesColorsFromCount(1, selectedTheme);

  const [chartDimensions, setChartDimensions] = useState<Dimensions | null>(
    null,
  );
  const {ref, setRef, entry} = useResizeObserver();

  const skipLinkAnchorId = useRef(uniqueId('barChart'));

  const emptyState = data.length === 0;

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

  const xAxisOptionsWithDefaults = {
    labelFormatter:
      xAxisOptions.labelFormatter == null
        ? (value: string) => value
        : xAxisOptions.labelFormatter,
    useMinimalLabels:
      xAxisOptions.useMinimalLabels == null
        ? false
        : xAxisOptions.useMinimalLabels,
  };

  const yAxisOptionsWithDefaults = {
    labelFormatter:
      yAxisOptions.labelFormatter == null
        ? (value: number) => value.toString()
        : yAxisOptions.labelFormatter,
    integersOnly:
      yAxisOptions.integersOnly == null ? false : yAxisOptions.integersOnly,
  };

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
    ref,
    handlePrintMediaQueryChange,
  ]);

  const barThemeWithMargins = {
    ...selectedTheme.bar,
    color: seriesColor,
    innerMargin: BarMargin[selectedTheme.bar.innerMargin],
    outerMargin: BarMargin[selectedTheme.bar.outerMargin],
  };

  function renderDefaultTooltipContent({
    label,
    value,
    annotation,
  }: RenderTooltipContentData) {
    const formattedLabel = xAxisOptionsWithDefaults.labelFormatter(label);
    const formattedValue = yAxisOptionsWithDefaults.labelFormatter(value);
    return (
      <TooltipContent
        label={formattedLabel}
        value={formattedValue}
        annotation={annotation}
        theme={theme}
      />
    );
  }

  let annotationsLookupTable: AnnotationLookupTable = {};
  if (annotations != null && annotations.length > 0) {
    annotationsLookupTable = normalizeData(annotations, 'dataIndex');
  }

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
            isAnimated={isAnimated}
            data={data}
            annotationsLookupTable={annotationsLookupTable}
            chartDimensions={chartDimensions}
            barTheme={barThemeWithMargins}
            gridTheme={selectedTheme.grid}
            xAxisTheme={selectedTheme.xAxis}
            yAxisTheme={selectedTheme.yAxis}
            renderTooltipContent={
              renderTooltipContent != null
                ? renderTooltipContent
                : renderDefaultTooltipContent
            }
            xAxisOptions={xAxisOptionsWithDefaults}
            yAxisOptions={yAxisOptionsWithDefaults}
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
