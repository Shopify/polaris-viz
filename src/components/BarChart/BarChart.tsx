import React, {useState, useLayoutEffect, useRef} from 'react';
import {useDebouncedCallback} from 'use-debounce';
import {Data} from 'types';
import {colorSky} from '@shopify/polaris-tokens';

import {DEFAULT_GREY_LABEL} from '../../constants';
import {SkipLink} from '../SkipLink';
import {getDefaultColor, uniqueId} from '../../utilities';

import {TooltipContent} from './components';
import {Chart} from './Chart';
import {
  RenderTooltipContentData,
  BarOptions,
  GridOptions,
  XAxisOptions,
  YAxisOptions,
  BarMargin,
} from './types';

export interface BarChartProps {
  data: Data[];
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
  renderTooltipContent,
  emptyStateText,
  isAnimated = false,
  skipLinkText,
  barOptions,
  gridOptions,
  xAxisOptions,
  yAxisOptions,
}: BarChartProps) {
  const [chartDimensions, setChartDimensions] = useState<DOMRect | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const skipLinkAnchorId = useRef(uniqueId('barChart'));

  const emptyState = data.length === 0;

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

  const margin =
    barOptions != null && barOptions.margin != null
      ? BarMargin[barOptions.margin]
      : BarMargin.Medium;

  const barOptionsWithDefaults = {
    color: getDefaultColor(),
    highlightColor: getDefaultColor(),
    hasRoundedCorners: false,
    ...barOptions,
    margin,
  };

  const gridOptionsWithDefaults = {
    showHorizontalLines: true,
    color: colorSky,
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
    ...yAxisOptions,
  };

  function renderDefaultTooltipContent({
    label,
    value,
  }: RenderTooltipContentData) {
    const formattedLabel = xAxisOptionsWithDefaults.labelFormatter(label);
    const formattedValue = yAxisOptionsWithDefaults.labelFormatter(value);

    return <TooltipContent label={formattedLabel} value={formattedValue} />;
  }

  return (
    <div style={{width: '100%', height: '100%'}} ref={containerRef}>
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
