import React, {useState, useMemo, useRef} from 'react';
import {line} from 'd3-shape';

import {useLinearXAxisDetails, useLinearXScale} from '../../hooks';
import {
  SMALL_SCREEN,
  SMALL_FONT_SIZE,
  FONT_SIZE,
  SPACING_TIGHT,
  Margin,
} from '../../constants';
import {VisuallyHiddenRows} from '../VisuallyHiddenRows';
import {LinearXAxis} from '../LinearXAxis';
import {YAxis} from '../YAxis';
import {eventPoint, uniqueId} from '../../utilities';
import {Crosshair} from '../Crosshair';
import {StringLabelFormatter, NumberLabelFormatter} from '../../types';
import {TooltipContainer} from '../TooltipContainer';

import {Series, RenderTooltipContentData} from './types';
import {useYScale} from './hooks';
import {Line, GradientArea} from './components';
import styles from './Chart.scss';

interface Props {
  series: Required<Series>[];
  xAxisLabels: string[];
  formatXAxisLabel: StringLabelFormatter;
  formatYAxisLabel: NumberLabelFormatter;
  dimensions: DOMRect;
  renderTooltipContent: (data: RenderTooltipContentData) => React.ReactNode;
  hideXAxisLabels: boolean;
}

export function Chart({
  series,
  dimensions,
  xAxisLabels,
  formatXAxisLabel,
  formatYAxisLabel,
  renderTooltipContent,
  hideXAxisLabels,
}: Props) {
  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const tooltipId = useRef(uniqueId('lineChart'));

  const fontSize =
    dimensions.width < SMALL_SCREEN ? SMALL_FONT_SIZE : FONT_SIZE;

  const xAxisDetails = useLinearXAxisDetails({
    series,
    fontSize,
    chartDimensions: dimensions,
    formatXAxisLabel,
    formatYAxisLabel,
    xAxisLabels: xAxisLabels == null || hideXAxisLabels ? [] : xAxisLabels,
  });

  const marginBottom =
    xAxisLabels == null
      ? SPACING_TIGHT
      : Number(Margin.Bottom) + xAxisDetails.maxXLabelHeight;

  const drawableHeight = dimensions.height - Margin.Top - marginBottom;

  const formattedLabels = xAxisLabels.map(formatXAxisLabel);

  const {axisMargin, ticks, yScale} = useYScale({
    fontSize,
    drawableHeight,
    series,
    formatYAxisLabel,
  });

  const drawableWidth =
    axisMargin == null ? null : dimensions.width - Margin.Right - axisMargin;
  const longestSeriesLength = series.reduce<number>(
    (max, currentSeries) => Math.max(max, currentSeries.data.length - 1),
    0,
  );

  const {xScale} = useLinearXScale({drawableWidth, longestSeriesLength});

  const tooltipMarkup = useMemo(() => {
    if (activePointIndex == null) {
      return null;
    }

    const data = series
      .filter(function removeEmptyDataPoints({data}) {
        return data[activePointIndex] != null;
      })
      .map(({name, data, color, lineStyle}) => ({
        point: {
          label: data[activePointIndex].label,
          value: data[activePointIndex].rawValue,
        },
        name,
        color,
        lineStyle,
      }));

    return renderTooltipContent({data});
  }, [activePointIndex, renderTooltipContent, series]);

  if (xScale == null || drawableWidth == null || axisMargin == null) {
    return null;
  }

  const lineGenerator = line<{rawValue: number}>()
    .x((_, index) => xScale(index))
    .y(({rawValue}) => yScale(rawValue));

  function handleInteraction(
    event: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>,
  ) {
    if (axisMargin == null || xScale == null) {
      return;
    }

    const point = eventPoint(event);
    if (point == null) {
      return;
    }

    const {svgX, svgY} = point;
    if (svgX < axisMargin) {
      return;
    }

    const closestIndex = Math.round(xScale.invert(svgX - axisMargin));
    setActivePointIndex(Math.min(longestSeriesLength, closestIndex));
    setTooltipPosition({
      x: svgX,
      y: svgY,
    });
  }

  function handleFocus({
    index,
    cx,
    cy,
  }: {
    index?: number;
    cx: number;
    cy: number;
  }) {
    if (index == null) {
      return;
    }
    const margin = axisMargin == null ? 0 : axisMargin;
    setActivePointIndex(index);
    setTooltipPosition({
      x: cx + margin,
      y: cy,
    });
  }

  return (
    <div className={styles.Container}>
      <svg
        role="table"
        width="100%"
        height="100%"
        onMouseMove={handleInteraction}
        onTouchMove={handleInteraction}
        onTouchEnd={() => setActivePointIndex(null)}
        onMouseLeave={() => setActivePointIndex(null)}
      >
        <g
          transform={`translate(${axisMargin},${dimensions.height -
            marginBottom})`}
        >
          <LinearXAxis
            xAxisDetails={xAxisDetails}
            xScale={xScale}
            labels={hideXAxisLabels ? null : formattedLabels}
            drawableWidth={drawableWidth}
            fontSize={fontSize}
            drawableHeight={drawableHeight}
            ariaHidden
          />
        </g>

        <g transform={`translate(${axisMargin},${Margin.Top})`}>
          <YAxis
            ticks={ticks}
            drawableWidth={drawableWidth}
            fontSize={fontSize}
          />
        </g>

        {activePointIndex == null ? null : (
          <g transform={`translate(${axisMargin},${Margin.Top})`}>
            <Crosshair x={xScale(activePointIndex)} height={drawableHeight} />
          </g>
        )}

        <VisuallyHiddenRows
          formatYAxisLabel={formatYAxisLabel}
          xAxisLabels={formattedLabels}
          series={series}
        />

        <g transform={`translate(${axisMargin},${Margin.Top})`}>
          {series
            .slice()
            .reverse()
            .map((singleSeries, index) => {
              const {data, name, showArea} = singleSeries;
              const path = lineGenerator(data);

              if (path == null) {
                throw new Error(
                  `Could not generate line path for series ${name}`,
                );
              }

              const isFirstLine = index === series.length - 1;

              return (
                <React.Fragment key={`${name}-${index}`}>
                  <Line
                    xScale={xScale}
                    yScale={yScale}
                    series={singleSeries}
                    path={path}
                    activePointIndex={activePointIndex}
                    labelledBy={tooltipId.current}
                    handleFocus={handleFocus}
                    tabIndex={isFirstLine ? 0 : -1}
                  />

                  {showArea ? (
                    <GradientArea
                      series={singleSeries}
                      yScale={yScale}
                      xScale={xScale}
                    />
                  ) : null}
                </React.Fragment>
              );
            })}
        </g>
      </svg>

      {tooltipPosition == null || activePointIndex == null ? null : (
        <TooltipContainer
          activePointIndex={activePointIndex}
          currentX={tooltipPosition.x}
          currentY={tooltipPosition.y}
          chartDimensions={dimensions}
          margin={Margin}
          id={tooltipId.current}
        >
          {tooltipMarkup}
        </TooltipContainer>
      )}
    </div>
  );
}
