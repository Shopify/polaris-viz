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
  lastBarTreatment: boolean;
  useHardCodedGradient: boolean;
  isAnimated: boolean;
  background: string;
  tooltipBackground: any;
  useFullGradientOpacity: any;
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
  background,
  isAnimated,
  tooltipBackground,
  useFullGradientOpacity,
}: Props) {
  const [activeBar, setActiveBar] = useState<number | null>(null);
  const [showAnnotation, updateAnnotation] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const highestValue = Math.max(...data.map((value) => value.rawValue));

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
      isMedian: data[activeBar].annotation,
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
        {useHardCodedGradient ? (
          <defs>
            <linearGradient
              id="bar-gradient"
              x1="0"
              y1="0"
              x2="0"
              y2={drawableHeight}
              gradientUnits="userSpaceOnUse"
            >
              {/* light blue */}
              <stop
                offset="0%"
                stopColor={useFullGradientOpacity ? '#319CFF' : '#8DC8FF'}
                stopOpacity="0.85"
              />
              {/* purple */}
              <stop
                offset="100%"
                stopColor="#5F51FF"
                stopOpacity={useFullGradientOpacity ? '0.85' : '0.35'}
              />
            </linearGradient>

            <linearGradient
              id="bar-gradient-top"
              x1="0"
              y1="0"
              x2="0"
              y2={drawableHeight}
              gradientUnits="userSpaceOnUse"
            >
              {/* green shown only if highest bar */}
              <stop
                offset="0%"
                stopColor={useFullGradientOpacity ? '#08CA9B' : '#08CA9B'}
                stopOpacity={useFullGradientOpacity ? '0.85' : '0.85'}
              />
              {/* light blue */}
              <stop
                offset={useFullGradientOpacity ? '30%' : '30%'}
                stopColor={useFullGradientOpacity ? '#319CFF' : '#8DC8FF'}
                stopOpacity={useFullGradientOpacity ? '0.85' : '0.65'}
              />

              {/* purple */}
              <stop
                offset="100%"
                stopColor="#5F51FF"
                stopOpacity={useFullGradientOpacity ? '0.85' : '0.35'}
              />
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

            const opacity =
              activeBar === null || index === activeBar ? 1.0 : 0.3;

            return (
              <g
                role="listitem"
                key={index}
                style={{
                  opacity,
                  // Use polaris react ease function
                  // https://github.com/Shopify/polaris-react/blob/master/src/utilities/theme/tokens.ts#L43-L46
                  transition: 'opacity 0.3s cubic-bezier(0.4, 0.22, 0.28, 1)',
                }}
              >
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
                  drawableHeight={drawableHeight}
                  lastBarTreatment={
                    index + 1 === data.length && lastBarTreatment
                  }
                  useHardCodedGradient={useHardCodedGradient}
                  highestValue={rawValue === highestValue}
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
                {/* <circle
                  cx={xPosition + barWidth / 2}
                  cy={drawableHeight}
                  r="6"
                  stroke={background}
                  strokeWidth="2"
                  fill="#8F68FF"
                  // style={{cursor: 'pointer'}}
                  // onClick={() => updateAnnotation((state) => !state)}
                  // onMouseMove={(e) => {
                  //   e.preventDefault();
                  //   e.stopPropagation();
                  //   setActiveBar(null);
                  // }}
                /> */}

                <line
                  x1={xPosition + barWidth / 2}
                  x2={xPosition + barWidth / 2}
                  y1={drawableHeight}
                  y2={0}
                  className={styles.Line}
                />
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
          tooltipBackground={tooltipBackground}
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
