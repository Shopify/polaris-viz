import React, {useState, useLayoutEffect, useRef, useCallback} from 'react';
import {useDebouncedCallback} from 'use-debounce';
import {colorSky} from '@shopify/polaris-tokens';

import {Dimensions} from '../../types';
import {DEFAULT_GREY_LABEL} from '../../constants';
import {SkipLink} from '../SkipLink';
import {getDefaultColor, uniqueId, normalizeData} from '../../utilities';
import {useResizeObserver} from '../../hooks';

import {TooltipContent} from './components';
import {Chart} from './Chart';
import {
  BarChartData,
  RenderTooltipContentData,
  BarOptions,
  GridOptions,
  XAxisOptions,
  YAxisOptions,
  BarMargin,
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
  barOptions?: Partial<BarOptions>;
  gridOptions?: Partial<GridOptions>;
  xAxisOptions?: Partial<XAxisOptions>;
  yAxisOptions?: Partial<YAxisOptions>;
}

export function BarChart({
  data,
  annotations,
  renderTooltipContent,
  emptyStateText,
  isAnimated = false,
  skipLinkText,
  barOptions,
  gridOptions,
  xAxisOptions,
  yAxisOptions,
}: BarChartProps) {
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

  useLayoutEffect(() => {
    updateDimensions();

    const isServer = typeof window === 'undefined';

    if (!isServer) {
      window.addEventListener('resize', debouncedUpdateDimensions);
      window
        .matchMedia('print')
        .addEventListener('change', handlePrintMediaQueryChange);
    }

    return () => {
      if (!isServer) {
        window.removeEventListener('resize', debouncedUpdateDimensions);
        window
          .matchMedia('print')
          .removeEventListener('change', handlePrintMediaQueryChange);
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
    color: getDefaultColor(),
    hasRoundedCorners: false,
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
    useMinimalLabels: false,
    ...xAxisOptions,
  };

  const yAxisOptionsWithDefaults = {
    labelFormatter: (value: number) => value.toString(),
    labelColor: DEFAULT_GREY_LABEL,
    backgroundColor: 'transparent',
    integersOnly: false,
    ...yAxisOptions,
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
      />
    );
  }

  let annotationsLookupTable: AnnotationLookupTable = {};
  if (annotations != null && annotations.length > 0) {
    annotationsLookupTable = normalizeData(annotations, 'dataIndex');
  }

  return (
    <div style={{width: '100%', height: '100%'}} ref={setRef}>
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
            barOptions={barOptionsWithDefaults}
            gridOptions={gridOptionsWithDefaults}
            xAxisOptions={xAxisOptionsWithDefaults}
            yAxisOptions={yAxisOptionsWithDefaults}
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
