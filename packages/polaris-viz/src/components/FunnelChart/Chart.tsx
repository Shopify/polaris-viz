import React, {useMemo, useState, useCallback, useRef} from 'react';
import {createPortal} from 'react-dom';
import {scaleBand, scaleLinear} from 'd3-scale';
import {
  DataSeries,
  Dimensions,
  XAxisOptions,
  YAxisOptions,
  uniqueId,
  isGradientType,
  LinearGradientWithStops,
  GradientStop,
  BORDER_RADIUS,
  useTheme,
  getAverageColor,
  changeColorOpacity,
  useChartContext,
} from '@shopify/polaris-viz-core';

import {Bar} from '../shared';
import {useReducedLabelIndexes} from '../../hooks';
import {
  BAR_CONTAINER_TEXT_HEIGHT,
  XMLNS,
  MASK_HIGHLIGHT_COLOR,
  MIN_BAR_HEIGHT,
} from '../../constants';

import {FunnelChartXAxisLabels, Label} from './components/';

const Y_AXIS_LABEL_VERTICAL_OFFSET = 32;
const PERCENT_LABEL_VERTICAL_OFFSET = 24;
const X_LABEL_OFFSET = 16;
const NEGATIVE_LABEL_OFFSET = -4;

export interface ChartProps {
  data: DataSeries[];
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  dimensions?: Dimensions;
}

export function Chart({
  data,
  dimensions,
  xAxisOptions,
  yAxisOptions,
}: ChartProps) {
  const {theme} = useChartContext();
  const selectedTheme = useTheme();

  const [labelHeight, setLabelHeight] = useState(0);
  const dataSeries = data[0].data;
  const colorOverride = data[0].color;

  const xValues = dataSeries.map(({key}) => key) as string[];
  const yValues = dataSeries.map(({value}) => value) as [number, number];

  const {width, height} = dimensions || {width: 0, height: 0};

  const labels = useMemo(
    () => dataSeries.map(({key}) => xAxisOptions.labelFormatter(key)),
    [dataSeries, xAxisOptions],
  );

  const xScale = scaleBand()
    .domain(xValues)
    .range([0, width])
    .paddingInner(0.5);

  const labelXScale = scaleBand()
    .range([0, width])
    .paddingInner(0.5)
    .paddingOuter(0)
    .domain(labels.map((_, index) => index.toString()));

  const drawableHeight = height - labelHeight - X_LABEL_OFFSET;

  const yScale = scaleLinear()
    .range([0, drawableHeight - BAR_CONTAINER_TEXT_HEIGHT])
    .domain([0, Math.max(...yValues)]);

  const barWidth = xScale.bandwidth();

  const getBarHeight = useCallback(
    (rawValue: number) => {
      const rawHeight = Math.abs(yScale(rawValue) - yScale(0));
      const needsMinHeight = rawHeight < MIN_BAR_HEIGHT && rawHeight !== 0;

      return needsMinHeight ? MIN_BAR_HEIGHT : rawHeight;
    },
    [yScale],
  );

  const reducedLabelIndexes = useReducedLabelIndexes({
    dataLength: data[0] ? data[0].data.length : 0,
  });

  const {
    chartContainer: {backgroundColor},
  } = useTheme();

  const color = colorOverride || selectedTheme.seriesColors.single;
  const barsGradient = isGradientType(color!)
    ? color
    : ([{color, offset: 0}] as GradientStop[]);

  const averageColor = getAverageColor(
    barsGradient[0].color,
    barsGradient.length > 1 ? barsGradient[1].color : barsGradient[0].color,
  );

  const connectorGradientId = useMemo(() => uniqueId('connector-gradient'), []);

  const connectorGradient = [
    {
      color: changeColorOpacity(averageColor, 0.2),
      offset: 0,
    },
    {
      color: changeColorOpacity(averageColor, 0),
      offset: 100,
    },
  ];

  const gradientId = useMemo(() => uniqueId('gradient'), []);
  const maskId = useMemo(() => uniqueId('mask'), []);
  const handlePercentLabelFormatter = (percentCalculation) => {
    const percentRounded = Math.round(percentCalculation);
    if (percentCalculation) {
      return `${yAxisOptions.labelFormatter(percentRounded)}%`;
    } else {
      return '';
    }
  };

  const maskRef = useRef<SVGMaskElement>(null);
  return (
    <svg role="list" viewBox={`0 0 ${width} ${height}`} xmlns={XMLNS}>
      <LinearGradientWithStops
        gradient={connectorGradient}
        id={connectorGradientId}
        x1="0%"
        x2="0%"
        y1="100%"
        y2="0%"
      />

      <LinearGradientWithStops gradient={barsGradient} id={`${gradientId}`} />

      <mask ref={maskRef} id={`${maskId}-${theme}-grad`} />
      {dataSeries.map((dataPoint, index: number) => {
        const nextPoint = dataSeries[index + 1];
        const xPosition = xScale(dataPoint.key as string);
        const x = xPosition == null ? 0 : xPosition;
        const nextBarHeight = getBarHeight(nextPoint?.value || 0);
        const yAxisValue = dataPoint.value;
        const percentCalculation =
          nextPoint?.value && yAxisValue
            ? (nextPoint.value / yAxisValue) * 100
            : 0;

        const percentLabel = handlePercentLabelFormatter(percentCalculation);
        const barHeight = getBarHeight(dataPoint.value || 0);
        const formattedYValue = yAxisOptions.labelFormatter(yAxisValue);

        return (
          <React.Fragment key={dataPoint.key}>
            {maskRef.current &&
              createPortal(
                <g key={dataPoint.key} role="listitem">
                  <Bar
                    ariaLabel={`${xAxisOptions.labelFormatter(
                      dataPoint.key,
                    )}: ${yAxisOptions.labelFormatter(dataPoint.value)}`}
                    width={barWidth}
                    height={barHeight}
                    color={MASK_HIGHLIGHT_COLOR}
                    x={x}
                    y={drawableHeight - barHeight}
                    borderRadius={
                      selectedTheme.bar.hasRoundedCorners
                        ? BORDER_RADIUS.Top
                        : BORDER_RADIUS.None
                    }
                  />
                </g>,
                maskRef.current,
              )}
            <g aria-hidden="true">
              <Label
                barHeight={0}
                label={formattedYValue}
                labelWidth={barWidth}
                x={x}
                y={drawableHeight - barHeight - Y_AXIS_LABEL_VERTICAL_OFFSET}
                size="large"
                color={selectedTheme.xAxis.labelColor}
              />
            </g>

            <Connector
              height={drawableHeight}
              startX={x + barWidth}
              startY={drawableHeight - barHeight}
              nextX={xScale(nextPoint?.key as string)}
              nextY={drawableHeight - nextBarHeight}
              nextPoint={nextPoint}
              fill={`url(#${connectorGradientId})`}
            />
            <g aria-hidden="true">
              <Label
                backgroundColor={backgroundColor}
                barHeight={0}
                label={percentLabel}
                labelWidth={barWidth}
                x={x + barWidth}
                y={
                  drawableHeight - nextBarHeight - PERCENT_LABEL_VERTICAL_OFFSET
                }
                size="small"
                color={changeColorOpacity(selectedTheme.xAxis.labelColor, 0.7)}
              />
            </g>
          </React.Fragment>
        );
      })}

      <g aria-hidden="true">
        <FunnelChartXAxisLabels
          chartHeight={height}
          chartX={barWidth / NEGATIVE_LABEL_OFFSET}
          chartY={drawableHeight + X_LABEL_OFFSET}
          labels={labels}
          labelWidth={barWidth + barWidth / 2}
          onHeightChange={setLabelHeight}
          reducedLabelIndexes={reducedLabelIndexes}
          xScale={labelXScale}
        />
      </g>

      <rect
        mask={`url(#${maskId}-${theme}-grad)`}
        x={0}
        y={0}
        width={width}
        height={drawableHeight}
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}

function Connector({
  height,
  nextPoint,
  nextX,
  nextY,
  startX,
  startY,
  fill = MASK_HIGHLIGHT_COLOR,
}) {
  if (nextPoint == null) {
    return null;
  }

  return (
    <path
      d={`M${startX} ${startY} L ${nextX} ${nextY} V ${height} H ${startX} Z`}
      fill={fill}
    />
  );
}
