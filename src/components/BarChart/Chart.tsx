import React, {useState, useMemo} from 'react';
import type {Color, Data} from 'types';

import {eventPoint, getTextWidth} from '../../utilities';
import {YAxis} from '../YAxis';
import {TooltipContainer} from '../TooltipContainer';
import type {StringLabelFormatter, NumberLabelFormatter} from '../../types';

import type {RenderTooltipContentData} from './types';
import {XAxis, Bar} from './components';
import {useYScale, useXScale} from './hooks';
import {
  MARGIN,
  SMALL_FONT_SIZE,
  FONT_SIZE,
  SMALL_SCREEN,
  SPACING_LOOSE,
  SPACING_EXTRA_TIGHT,
} from './constants';
import {getXAxisDetails} from './utilities';
import styles from './Chart.scss';

interface Props {
  data: Data[];
  chartDimensions: DOMRect;
  barMargin: number;
  color: Color;
  highlightColor: Color;
  formatXAxisLabel: StringLabelFormatter;
  formatYAxisLabel: NumberLabelFormatter;
  timeSeries: boolean;
  renderTooltipContent: (data: RenderTooltipContentData) => React.ReactNode;
}

export function Chart({
  data,
  chartDimensions,
  barMargin,
  color,
  highlightColor,
  formatXAxisLabel,
  formatYAxisLabel,
  timeSeries,
  renderTooltipContent,
}: Props) {
  const [activeBar, setActiveBar] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const fontSize =
    chartDimensions.width < SMALL_SCREEN ? SMALL_FONT_SIZE : FONT_SIZE;

  const xAxisDetails = useMemo(
    () =>
      getXAxisDetails({
        data,
        fontSize,
        formatYAxisLabel,
        formatXAxisLabel,
        chartDimensions,
      }),
    [data, fontSize, formatYAxisLabel, formatXAxisLabel, chartDimensions],
  );

  const drawableHeight =
    chartDimensions.height -
    MARGIN.Top -
    MARGIN.Bottom -
    xAxisDetails.maxXLabelHeight;

  const {yScale, ticks} = useYScale({
    drawableHeight,
    data,
    formatYAxisLabel,
  });

  const yAxisLabelWidth = useMemo(
    () =>
      Math.max(
        ...ticks.map(({formattedValue}) =>
          getTextWidth({text: formattedValue, fontSize}),
        ),
      ),
    [fontSize, ticks],
  );

  const axisMargin = SPACING_LOOSE + yAxisLabelWidth;
  const drawableWidth = chartDimensions.width - MARGIN.Right - axisMargin;

  const {xScale, xAxisLabels} = useXScale({
    drawableWidth,
    data,
    barMargin,
    formatXAxisLabel,
  });

  const tooltipMarkup = useMemo(() => {
    if (activeBar == null) {
      return null;
    }

    return renderTooltipContent({
      label: data[activeBar].label,
      value: data[activeBar].rawValue,
    });
  }, [activeBar, data, renderTooltipContent]);

  return (
    <div
      className={styles.ChartContainer}
      style={{
        height: chartDimensions.height,
        width: chartDimensions.width,
      }}
    >
      <svg
        width="100%"
        height="100%"
        onMouseMove={handleInteraction}
        onTouchMove={handleInteraction}
        onMouseLeave={() => setActiveBar(null)}
        onTouchEnd={() => setActiveBar(null)}
      >
        <g
          transform={`translate(${axisMargin},${
            chartDimensions.height -
            MARGIN.Bottom -
            xAxisDetails.maxXLabelHeight
          })`}
        >
          <XAxis
            labels={xAxisLabels}
            xScale={xScale}
            fontSize={fontSize}
            showFewerLabels={timeSeries && xAxisDetails.needsDiagonalLabels}
            xAxisDetails={xAxisDetails}
          />
        </g>

        <g
          transform={`translate(${axisMargin + SPACING_EXTRA_TIGHT},${
            MARGIN.Top
          })`}
        >
          <YAxis ticks={ticks} drawableWidth={drawableWidth} />
        </g>

        <g transform={`translate(${axisMargin},${MARGIN.Top})`}>
          {data.map(({rawValue}, index) => {
            const xPosition = xScale(index.toString());

            return (
              <Bar
                key={index}
                x={xPosition == null ? 0 : xPosition}
                yScale={yScale}
                rawValue={rawValue}
                width={xScale.bandwidth()}
                isSelected={index === activeBar}
                color={color}
                highlightColor={highlightColor}
              />
            );
          })}
        </g>
      </svg>

      {tooltipPosition != null && activeBar != null ? (
        <TooltipContainer
          activePointIndex={activeBar}
          currentX={tooltipPosition.x}
          currentY={tooltipPosition.y}
          chartDimensions={chartDimensions}
          margin={MARGIN}
          position="center"
        >
          {tooltipMarkup}
        </TooltipContainer>
      ) : null}
    </div>
  );

  function handleInteraction(
    event: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>,
  ) {
    const point = eventPoint(event);

    if (point == null) {
      return;
    }

    const {svgX, svgY} = point;
    const currentPoint = svgX - axisMargin;
    const currentIndex = Math.floor(currentPoint / xScale.step());

    if (
      currentIndex < 0 ||
      currentIndex > data.length - 1 ||
      svgY <= MARGIN.Top ||
      svgY > drawableHeight + MARGIN.Bottom + xAxisDetails.maxXLabelHeight
    ) {
      setActiveBar(null);
      return;
    }

    const xPosition = xScale(currentIndex.toString());
    const value = data[currentIndex].rawValue;
    const tooltipXPositon =
      xPosition == null ? 0 : xPosition + axisMargin + xScale.bandwidth() / 2;

    setActiveBar(currentIndex);
    setTooltipPosition({
      x: tooltipXPositon,
      y: yScale(value),
    });
  }
}
