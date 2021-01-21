import React, {useState, useMemo} from 'react';
import {Color} from 'types';

import {
  eventPoint,
  getTextWidth,
  getTextContainerHeight,
  getMissingSideOfTriangle,
  degreesToRadians,
} from '../../utilities';
import {YAxis} from '../YAxis';
import {TooltipContainer} from '../TooltipContainer';
import {StringLabelFormatter, NumberLabelFormatter} from '../../types';

import {BarData, RenderTooltipContentData} from './types';
import {XAxis, Bar} from './components';
import {useYScale, useXScale} from './hooks';
import {
  MARGIN,
  SPACING,
  SMALL_FONT_SIZE,
  FONT_SIZE,
  SMALL_SCREEN,
  DIAGONAL_ANGLE,
  SPACING_LOOSE,
  MAX_TEXT_BOX_HEIGHT,
  MIN_HORIZONTAL_LABEL_SPACE,
} from './constants';
import styles from './Chart.scss';

interface Props {
  data: BarData[];
  chartDimensions: DOMRect;
  barMargin: number;
  color: Color;
  highlightColor?: Color;
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

  const estimatedYAxisWidth =
    SPACING +
    Math.max(
      ...data.map(({rawValue}) =>
        getTextWidth({text: formatYAxisLabel(rawValue), fontSize}),
      ),
    );

  const datumLabelSpace =
    (chartDimensions.width - estimatedYAxisWidth - MARGIN.Right) / data.length;

  const longestXLabel = data
    .map(({label}) => {
      return {
        label: formatXAxisLabel(label),
        width:
          getTextWidth({text: formatXAxisLabel(label), fontSize}) +
          SPACING_LOOSE,
      };
    })
    .reduce((prev, current) => (prev.width > current.width ? prev : current));

  const xLabelHeight = getTextContainerHeight({
    text: longestXLabel.label,
    fontSize,
    // spacing gives yAxis estimate buffer room
    containerWidth: Math.abs(datumLabelSpace - SPACING_LOOSE),
  });

  const useDiagonalLabels =
    xLabelHeight > MAX_TEXT_BOX_HEIGHT ||
    datumLabelSpace < MIN_HORIZONTAL_LABEL_SPACE;

  // height of the longest label when angled
  const longestAngledLabelHeight =
    Math.cos(degreesToRadians(DIAGONAL_ANGLE)) * longestXLabel.width;
  // shortest label space available is from the first tick
  const firstBarMidpoint = datumLabelSpace / 2;
  const distanceToFirstTick = estimatedYAxisWidth + firstBarMidpoint;
  // find the label length by treating it as a hypotenuse
  const angledLabelMaxLength =
    distanceToFirstTick / Math.cos(degreesToRadians(DIAGONAL_ANGLE));
  //  height between label start and bottom of the chart space, needed for positioning
  const angledLabelCutOff = getMissingSideOfTriangle({
    side1: angledLabelMaxLength,
    side2: distanceToFirstTick,
  });

  const maxXLabelHeight = useDiagonalLabels
    ? Math.min(longestAngledLabelHeight, angledLabelCutOff)
    : xLabelHeight;

  const drawableHeight =
    chartDimensions.height - MARGIN.Top - MARGIN.Bottom - maxXLabelHeight;

  const {yScale, ticks} = useYScale({
    drawableHeight,
    data,
    formatYAxisLabel,
  });

  const yAxisLabelWidth = Math.max(
    ...ticks.map(({formattedValue}) =>
      getTextWidth({text: formattedValue, fontSize}),
    ),
  );

  const axisMargin = SPACING_LOOSE + yAxisLabelWidth;
  const drawableWidth = chartDimensions.width - MARGIN.Right - axisMargin;

  const {xScale, xAxisLabels} = useXScale({
    drawableWidth,
    data,
    barMargin,
    formatXAxisLabel,
  });

  const maxDiagonalLabelLength = Math.min(
    longestXLabel.width,
    angledLabelMaxLength,
  );

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
          transform={`translate(${axisMargin},${chartDimensions.height -
            MARGIN.Bottom -
            maxXLabelHeight})`}
        >
          <XAxis
            labels={xAxisLabels}
            xScale={xScale}
            fontSize={fontSize}
            showFewerLabels={timeSeries && useDiagonalLabels}
            needsDiagonalLabels={useDiagonalLabels}
            labelHeight={xLabelHeight}
            angledLabelHeight={angledLabelCutOff}
            maxDiagonalLabelLength={maxDiagonalLabelLength}
          />
        </g>

        <g transform={`translate(${axisMargin},${MARGIN.Top})`}>
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
      svgY > drawableHeight + MARGIN.Bottom + maxXLabelHeight
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
