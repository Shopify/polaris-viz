import React, {useState, useMemo, useRef, useCallback} from 'react';
import throttle from 'lodash.throttle';

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
import {Point} from '../Point';
import {eventPoint, uniqueId} from '../../utilities';
import {Crosshair} from '../Crosshair';
import {
  StringLabelFormatter,
  NumberLabelFormatter,
  ActiveTooltip,
} from '../../types';
import {TooltipContainer} from '../TooltipContainer';

import {Series, RenderTooltipContentData, TooltipData} from './types';
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
  hasSpline: boolean;
  axisColor: string;
  textColor: string;
  lineWidth: number;
}

export function Chart({
  series,
  dimensions,
  xAxisLabels,
  formatXAxisLabel,
  formatYAxisLabel,
  renderTooltipContent,
  hideXAxisLabels,
  hasSpline,
  axisColor,
  textColor,
  lineWidth,
}: Props) {
  const [tooltipDetails, setTooltipDetails] = useState<ActiveTooltip | null>(
    null,
  );

  const tooltipId = useRef(uniqueId('lineChart'));

  const fontSize =
    dimensions.width < SMALL_SCREEN ? SMALL_FONT_SIZE : FONT_SIZE;

  const {ticks: initialTicks} = useYScale({
    fontSize,
    drawableHeight: dimensions.height - Margin.Top,
    series,
    formatYAxisLabel,
  });

  const xAxisDetails = useLinearXAxisDetails({
    series,
    fontSize,
    chartDimensions: dimensions,
    formatXAxisLabel,
    initialTicks,
    xAxisLabels: xAxisLabels == null || hideXAxisLabels ? [] : xAxisLabels,
  });

  const marginBottom =
    xAxisLabels == null
      ? SPACING_TIGHT
      : Number(Margin.Bottom) + xAxisDetails.maxXLabelHeight;

  const drawableHeight = dimensions.height - Margin.Top - marginBottom;

  const formattedLabels = useMemo(() => xAxisLabels.map(formatXAxisLabel), [
    formatXAxisLabel,
    xAxisLabels,
  ]);

  const {axisMargin, ticks, yScale} = useYScale({
    fontSize,
    drawableHeight,
    series,
    formatYAxisLabel,
  });

  const handleFocus = useCallback(
    (details: ActiveTooltip | null) => {
      if (details == null) {
        setTooltipDetails(null);
      } else {
        const {x, y, index} = details;
        setTooltipDetails({index, y, x: x + axisMargin});
      }
    },
    [axisMargin],
  );

  const drawableWidth =
    axisMargin == null ? null : dimensions.width - Margin.Right - axisMargin;

  const longestSeriesLength = useMemo(
    () =>
      series.reduce<number>(
        (max, currentSeries) => Math.max(max, currentSeries.data.length - 1),
        0,
      ),
    [series],
  );

  const {xScale} = useLinearXScale({drawableWidth, longestSeriesLength});

  const tooltipMarkup = useMemo(() => {
    if (tooltipDetails == null) {
      return null;
    }

    const data = series.reduce<TooltipData[]>(
      (accumulator, {data, name, color, lineStyle}) => {
        const currentDataPoint = data[tooltipDetails.index];
        if (currentDataPoint != null) {
          accumulator.push({
            point: {
              label: currentDataPoint.label,
              value: currentDataPoint.rawValue,
            },
            name,
            color,
            lineStyle,
          });
        }
        return accumulator;
      },
      [],
    );

    if (data == null) {
      return null;
    }

    return renderTooltipContent({data});
  }, [renderTooltipContent, series, tooltipDetails]);

  const reversedSeries = useMemo(() => series.slice().reverse(), [series]);

  if (xScale == null || drawableWidth == null || axisMargin == null) {
    return null;
  }

  const handleMouseInteraction = throttle(
    (
      event:
        | React.MouseEvent<SVGSVGElement>
        | React.TouchEvent<SVGSVGElement>
        | null,
    ) => {
      handleInteraction(event);
    },
    50,
    {leading: true},
  );

  function handleInteraction(
    event:
      | React.MouseEvent<SVGSVGElement>
      | React.TouchEvent<SVGSVGElement>
      | null,
  ) {
    if (axisMargin == null || xScale == null) {
      return;
    }

    if (event === null) {
      setTooltipDetails(null);
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

    setTooltipDetails({
      x: svgX,
      y: svgY,
      index: Math.min(longestSeriesLength, closestIndex),
    });
  }

  return (
    <div className={styles.Container}>
      <svg
        role="table"
        width="100%"
        height="100%"
        onMouseMove={(event) => {
          event.persist();
          handleMouseInteraction(event);
        }}
        onTouchMove={(event) => {
          event.persist();
          handleInteraction(event);
        }}
        onTouchEnd={() => handleInteraction(null)}
        onMouseLeave={() => handleMouseInteraction(null)}
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
            axisColor={axisColor}
            textColor={textColor}
          />
        </g>

        <g transform={`translate(${axisMargin},${Margin.Top})`}>
          <YAxis
            ticks={ticks}
            drawableWidth={drawableWidth}
            fontSize={fontSize}
            axisColor={axisColor}
            textColor={textColor}
          />
        </g>

        {tooltipDetails == null ? null : (
          <g transform={`translate(${axisMargin},${Margin.Top})`}>
            <Crosshair
              x={xScale(tooltipDetails.index)}
              height={drawableHeight}
            />
          </g>
        )}

        <VisuallyHiddenRows
          formatYAxisLabel={formatYAxisLabel}
          xAxisLabels={formattedLabels}
          series={series}
        />

        <g transform={`translate(${axisMargin},${Margin.Top})`}>
          {reversedSeries.map((singleSeries, index) => {
            const {data, name, showArea, color} = singleSeries;
            const isFirstLine = index === series.length - 1;

            return (
              <React.Fragment key={`${name}-${index}`}>
                {showArea ? (
                  <GradientArea
                    series={singleSeries}
                    yScale={yScale}
                    xScale={xScale}
                    hasSpline={hasSpline}
                  />
                ) : null}

                <Line
                  series={singleSeries}
                  xScale={xScale}
                  yScale={yScale}
                  hasSpline={hasSpline}
                  lineWidth={lineWidth}
                />

                {data.map(({rawValue}, dataIndex) => {
                  const activeIndex =
                    tooltipDetails == null ? null : tooltipDetails.index;

                  return (
                    <Point
                      key={`${name}-${index}-${dataIndex}`}
                      color={color}
                      cx={xScale(dataIndex)}
                      cy={yScale(rawValue)}
                      active={activeIndex === dataIndex}
                      onFocus={handleFocus}
                      index={dataIndex}
                      tabIndex={isFirstLine ? 0 : -1}
                      ariaLabelledby={tooltipId.current}
                    />
                  );
                })}
              </React.Fragment>
            );
          })}
        </g>
      </svg>

      {tooltipDetails == null ? null : (
        <TooltipContainer
          activePointIndex={tooltipDetails.index}
          currentX={tooltipDetails.x}
          currentY={tooltipDetails.y}
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
