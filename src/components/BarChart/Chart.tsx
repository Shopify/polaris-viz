import React, {useState, useMemo} from 'react';
import {Color, Data, GradientColor} from 'types';

import {LINE_HEIGHT} from '../../constants';
import {eventPoint, getTextWidth, getBarXAxisDetails} from '../../utilities';
import {YAxis} from '../YAxis';
import {BarChartXAxis} from '../BarChartXAxis';
import {TooltipContainer} from '../TooltipContainer';
import {Bar} from '../Bar';
import {StringLabelFormatter, NumberLabelFormatter} from '../../types';

import {RenderTooltipContentData} from './types';
import {useYScale, useXScale} from './hooks';
import {
  MARGIN,
  SMALL_FONT_SIZE,
  FONT_SIZE,
  SMALL_SCREEN,
  SPACING,
} from './constants';
import styles from './Chart.scss';

interface Props {
  data: Data[];
  chartDimensions: DOMRect;
  barMargin: number;
  color: Color | GradientColor;
  highlightColor: Color | GradientColor;
  formatXAxisLabel: StringLabelFormatter;
  formatYAxisLabel: NumberLabelFormatter;
  timeSeries: boolean;
  renderTooltipContent: (data: RenderTooltipContentData) => React.ReactNode;
  hasRoundedCorners: boolean;
  textColor: string;
  axisColor: string;
  leftAlignLabels: boolean;
  useHardCodedGradient: boolean;
  isAnimated: boolean;
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
  hasRoundedCorners,
  textColor,
  axisColor,
  leftAlignLabels,
  useHardCodedGradient,
  lastBarTreatment,
  isAnimated,
}: Props) {
  const [activeBar, setActiveBar] = useState<number | null>(null);
  const [showAnnotation, updateAnnotation] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const fontSize =
    chartDimensions.width < SMALL_SCREEN ? SMALL_FONT_SIZE : FONT_SIZE;

  const {ticks: initialTicks} = useYScale({
    drawableHeight:
      chartDimensions.height - MARGIN.Top - MARGIN.Bottom - LINE_HEIGHT,
    data,
    formatYAxisLabel,
  });

  const approxYAxisLabelWidth = useMemo(
    () =>
      Math.max(
        ...initialTicks.map(({formattedValue}) =>
          getTextWidth({text: formattedValue, fontSize}),
        ),
      ),
    [fontSize, initialTicks],
  );

  const xAxisDetails = useMemo(
    () =>
      getBarXAxisDetails({
        yAxisLabelWidth: approxYAxisLabelWidth,
        fontSize,
        xLabels: data.map(({label}) => formatXAxisLabel(label)),
        chartDimensions,
        padding: barMargin,
      }),
    [
      approxYAxisLabelWidth,
      fontSize,
      data,
      chartDimensions,
      barMargin,
      formatXAxisLabel,
    ],
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

  const axisMargin = SPACING + yAxisLabelWidth;
  const drawableWidth = chartDimensions.width - MARGIN.Right - axisMargin;

  const {xScale, xAxisLabels} = useXScale({
    drawableWidth,
    data,
    barMargin,
    formatXAxisLabel,
  });

  const barWidth = xScale.bandwidth();

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
        role="list"
      >
        {useHardCodedGradient || lastBarTreatment ? (
          <defs>
            <linearGradient
              id="bar-gradient"
              x1="0"
              y1="0"
              x2="0"
              y2={drawableHeight}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#757F9A" offset="50%" />
              <stop stopColor="#D7DDE8" offset="100%" />
            </linearGradient>

            <linearGradient
              id="bar-gradient2"
              x1="0"
              y1="0"
              x2="0"
              y2={drawableHeight}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4BFCE0" offset="21%" />
              <stop stopColor="#4EADFB" offset="62%" />
              <stop stopColor="#801AFD" offset="109%" />
            </linearGradient>
          </defs>
        ) : null}

        <g
          transform={`translate(${axisMargin},${chartDimensions.height -
            MARGIN.Bottom -
            xAxisDetails.maxXLabelHeight})`}
          aria-hidden="true"
        >
          <BarChartXAxis
            labels={xAxisLabels}
            xScale={xScale}
            fontSize={fontSize}
            showFewerLabels={timeSeries && xAxisDetails.needsDiagonalLabels}
            xAxisDetails={xAxisDetails}
            textColor={textColor}
            axisColor={axisColor}
            leftAlignLabels={leftAlignLabels}
          />
        </g>

        <g
          transform={`translate(${axisMargin},${MARGIN.Top})`}
          aria-hidden="true"
        >
          <YAxis
            ticks={ticks}
            drawableWidth={drawableWidth}
            fontSize={fontSize}
            textColor={textColor}
            axisColor={axisColor}
          />
        </g>

        <g transform={`translate(${axisMargin},${MARGIN.Top})`}>
          {data.map(({rawValue}, index) => {
            const xPosition = xScale(index.toString());
            const ariaLabel = `${formatXAxisLabel(
              data[index].label,
            )}: ${formatYAxisLabel(data[index].rawValue)}`;

            return (
              <g role="listitem" key={index}>
                <Bar
                  key={index}
                  x={xPosition == null ? 0 : xPosition}
                  yScale={yScale}
                  rawValue={rawValue}
                  width={barWidth}
                  isSelected={index === activeBar}
                  color={color}
                  highlightColor={highlightColor}
                  onFocus={handleFocus}
                  index={index}
                  ariaLabel={ariaLabel}
                  tabIndex={0}
                  role="img"
                  numberOfBars={data.length}
                  isAnimated={isAnimated}
                  hasRoundedCorners={hasRoundedCorners}
                  chartDimensions={chartDimensions}
                  lastBarTreatment={
                    index + 1 === data.length && lastBarTreatment
                  }
                  useHardCodedGradient={useHardCodedGradient}
                />
              </g>
            );
          })}
        </g>

        <g transform={`translate(${axisMargin},${MARGIN.Top})`}>
          {data.map(({annotation, rawValue}, index) => {
            if (annotation == null) {
              return null;
            }
            const xPosition = xScale(index.toString());

            return (
              <g role="listitem" key={index}>
                <circle
                  cx={xPosition + barWidth / 2}
                  cy={yScale(rawValue) - 13}
                  r="6"
                  stroke="#fff"
                  strokeWidth="2"
                  fill="#3A32B8"
                  style={{cursor: 'pointer'}}
                  onClick={() => updateAnnotation((state) => !state)}
                  onMouseMove={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveBar(null);
                  }}
                />

                <foreignObject
                  width="80"
                  height="60"
                  x={xPosition - 25}
                  y={yScale(rawValue) - 80}
                >
                  <div
                    style={{
                      background: '#fff',
                      padding: '8px',
                      borderRadius: '3px',
                      opacity: showAnnotation ? '1' : '0',
                      fontSize: 12,
                      transition: 'opacity 0.3s',
                    }}
                  >
                    {annotation}
                  </div>
                </foreignObject>
              </g>
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

  function handleFocus({
    index,
    cx,
    cy,
  }: {
    index: number;
    cx: number;
    cy: number;
  }) {
    if (index == null) return;
    setActiveBar(index);
    setTooltipPosition({
      x: cx + axisMargin + xScale.bandwidth() / 2,
      y: cy,
    });
  }

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
