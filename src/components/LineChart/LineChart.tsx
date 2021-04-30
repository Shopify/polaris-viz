import React, {useLayoutEffect, useRef, useState} from 'react';
import {useDebouncedCallback} from 'use-debounce';
import {colorSky} from '@shopify/polaris-tokens';

import {getDefaultColor, uniqueId} from '../../utilities';
import {SkipLink} from '../SkipLink';
import {usePrefersReducedMotion} from '../../hooks';
import {
  DEFAULT_GREY_LABEL,
  CROSSHAIR_WIDTH,
  DEFAULT_CROSSHAIR_COLOR,
} from '../../constants';

import {Chart} from './Chart';
import {
  Series,
  RenderTooltipContentData,
  LineOptions,
  XAxisOptions,
  YAxisOptions,
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
  xAxisOptions: Partial<XAxisOptions> & Pick<XAxisOptions, 'xAxisLabels'>;
  yAxisOptions?: Partial<YAxisOptions>;
  gridOptions?: Partial<GridOptions>;
  crossHairOptions?: Partial<CrossHairOptions>;
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
}: LineChartProps) {
  const [chartDimensions, setChartDimensions] = useState<DOMRect | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const {prefersReducedMotion} = usePrefersReducedMotion();

  const skipLinkAnchorId = useRef(uniqueId('lineChart'));

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

  const lineOptionsWithDefaults = {hasSpline: false, width: 2, ...lineOptions};

  const xAxisOptionsWithDefaults = {
    labelFormatter: (value: string) => value,
    hideXAxisLabels: false,
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

  const gridOptionsWithDefaults = {
    showVerticalLines: true,
    showHorizontalLines: true,
    color: colorSky,
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
    const defaultColor = getDefaultColor(index);

    return {
      color: defaultColor,
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
      <div style={{width: '100%', height: '100%'}} ref={containerRef}>
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
