import React, {useState, useMemo} from 'react';
import {Color} from 'types';

import {
  eventPoint,
  getTextWidth,
  getTextContainerHeight,
} from '../../utilities';
import {YAxis} from '../YAxis';
import {TooltipContainer} from '../TooltipContainer';
import {StringLabelFormatter, NumberLabelFormatter} from '../../types';

import {BarData, RenderTooltipContentData} from './types';
import {XAxis, Bar} from './components';
import {useYScale, useXScale} from './hooks';
import {
  MARGIN,
  LINE_HEIGHT,
  SPACING,
  SMALL_FONT_SIZE,
  FONT_SIZE,
  SMALL_SCREEN,
  DIAGONAL_ANGLE,
  SPACING_TIGHT,
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

  //calculate this the way it was before
  const fontSize = 12;

  const roughYAxisWidth =
    SPACING +
    Math.max(
      ...data.map(({rawValue}) =>
        getTextWidth({text: formatYAxisLabel(rawValue), fontSize}),
      ),
    );

  const labelSpace = (chartDimensions.width - roughYAxisWidth) / data.length;
  //make this more smart, actually use the longest one
  const longestLabel = formatXAxisLabel(data[0].label);
  const longestLabelLength = getTextWidth({text: longestLabel, fontSize}) + 20;

  const xLabelHeight = getTextContainerHeight({
    text: longestLabel,
    fontSize,
    containerWidth: labelSpace,
  });

  //actually determine this in a smart way
  const overflowingLabel = true;

  //1. find out what the longest label will be on an angle
  const labelAngle = 90 + DIAGONAL_ANGLE;
  const radians = (labelAngle * Math.PI) / 180;
  const angledLabelHeight = Math.cos(radians) * longestLabelLength;

  //2. find out what the max label allowance is for the first tick

  const spaceToFirstTick = roughYAxisWidth + labelSpace / 2;

  // this will be the max length for the label, passed down to the xaxis
  const angledLabelCutOff = spaceToFirstTick / Math.cos((40 * Math.PI) / 180);

  //get the actual height of that label
  const cutOffLabelHeight = Math.sqrt(
    Math.pow(angledLabelCutOff, 2) - Math.pow(spaceToFirstTick, 2),
  );

  console.log({cutOffLabelHeight});

  const maxXLabelHeight = overflowingLabel
    ? Math.min(angledLabelHeight, cutOffLabelHeight)
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

  const axisMargin = SPACING + yAxisLabelWidth;
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
          transform={`translate(${axisMargin},${chartDimensions.height -
            MARGIN.Bottom -
            maxXLabelHeight})`}
        >
          <XAxis
            labels={xAxisLabels}
            xScale={xScale}
            fontSize={fontSize}
            showFewerLabels={timeSeries && overflowingLabel}
            needsDiagonalLabels={overflowingLabel}
            // xLabelHeight not used when diagonal
            xLabelHeight={xLabelHeight}
            // ***angledLabelHeight*** is the height between the start of the label
            // and the bottom of the chart
            angledLabelHeight={Math.min(angledLabelHeight, cutOffLabelHeight)}
            // ***longestLabelLength*** is the width of the longest string,
            // after this amount truncate
            longestLabelLength={Math.min(longestLabelLength, angledLabelCutOff)}
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
