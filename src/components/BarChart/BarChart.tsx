import React, {useState, useEffect, useRef, useCallback} from 'react';
import {useDebouncedCallback} from 'use-debounce';

import type {Dimensions, XAxisOptions, YAxisOptions} from '../../types';
import {SkipLink} from '../SkipLink';
import {uniqueId, normalizeData} from '../../utilities';
import {useResizeObserver} from '../../hooks';
import {ChartContainer} from '../ChartContainer';

import {TooltipContent} from './components';
import {Chart} from './Chart';
import type {
  BarChartData,
  RenderTooltipContentData,
  Annotation,
  AnnotationLookupTable,
} from './types';

export interface BarChartProps {
  data: BarChartData[];
  annotations?: Annotation[];
  skipLinkText?: string;
  emptyStateText?: string;
  isAnimated?: boolean;
  renderTooltipContent?: (data: RenderTooltipContentData) => React.ReactNode;
  xAxisOptions?: XAxisOptions;
  yAxisOptions?: YAxisOptions;
  theme?: string;
}

export function BarChart({
  data,
  annotations,
  renderTooltipContent,
  emptyStateText,
  isAnimated = false,
  skipLinkText,
  xAxisOptions,
  yAxisOptions,
  theme,
}: BarChartProps) {
  const [chartDimensions, setChartDimensions] = useState<Dimensions | null>(
    null,
  );
  const {ref, setRef, entry} = useResizeObserver();

  const skipLinkAnchorId = useRef(uniqueId('barChart'));

  const emptyState = data.length === 0;

  const xAxisOptionsWithDefaults = {
    labelFormatter: (value: string) => value,
    useMinimalLabels: false,
    wrapLabels: true,
    ...xAxisOptions,
  };

  const yAxisOptionsWithDefaults = {
    labelFormatter: (value: number) => value.toString(),
    integersOnly: false,
    ...yAxisOptions,
  };

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
        console.log('matches');
        console.log(ref.getBoundingClientRect());
        console.log(window);

        // it seems like this doesn't get called in time when using the button, no matter how the dimensions are set
        setChartDimensions({width: 100, height: 100});
      }
    },
    [ref],
  );

  useEffect(() => {
    updateDimensions();

    const isServer = typeof window === 'undefined';

    if (!isServer) {
      window.addEventListener('resize', debouncedUpdateDimensions);

      if (typeof window.matchMedia('print').addEventListener === 'function') {
        window
          .matchMedia('print')
          .addEventListener('change', () =>
            setChartDimensions({width: 100, height: 100}),
          );
      } else if (typeof window.matchMedia('print').addListener === 'function') {
        window
          .matchMedia('print')
          .addListener(() => setChartDimensions({width: 100, height: 100}));
      }
    }

    return () => {
      if (!isServer) {
        window.removeEventListener('resize', debouncedUpdateDimensions);

        if (typeof window.matchMedia('print').addEventListener === 'function') {
          window
            .matchMedia('print')
            .removeEventListener('change', () =>
              setChartDimensions({width: 100, height: 100}),
            );
        } else if (
          typeof window.matchMedia('print').addListener === 'function'
        ) {
          window
            .matchMedia('print')
            .removeListener(() =>
              setChartDimensions({width: 100, height: 100}),
            );
        }
      }
    };
  }, [
    entry,
    debouncedUpdateDimensions,
    updateDimensions,
    ref,
    handlePrintMediaQueryChange,
    isPrinting,
  ]);

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
    <ChartContainer ref={setRef} theme={theme}>
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
            renderTooltipContent={
              renderTooltipContent != null
                ? renderTooltipContent
                : renderDefaultTooltipContent
            }
            xAxisOptions={xAxisOptionsWithDefaults}
            yAxisOptions={yAxisOptionsWithDefaults}
            emptyStateText={emptyStateText}
            theme={theme}
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
