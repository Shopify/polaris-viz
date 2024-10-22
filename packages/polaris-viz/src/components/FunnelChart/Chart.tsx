import {Fragment, useMemo, useState, useCallback} from 'react';
import {scaleBand, scaleLinear} from 'd3-scale';
import type {
  DataSeries,
  Dimensions,
  XAxisOptions,
  YAxisOptions,
} from '@shopify/polaris-viz-core';
import {
  uniqueId,
  LinearGradientWithStops,
  useTheme,
  getAverageColor,
  changeColorOpacity,
  useChartContext,
  LINE_HEIGHT,
  getGradientFromColor,
} from '@shopify/polaris-viz-core';

import {ChartElements} from '../ChartElements';
import {useReducedLabelIndexes} from '../../hooks';
import {
  BAR_CONTAINER_TEXT_HEIGHT,
  MASK_HIGHLIGHT_COLOR,
  MIN_BAR_HEIGHT,
} from '../../constants';

import {FunnelChartXAxisLabels, FunnelSegment} from './components/';
import type {LabelHelpers} from './FunnelChart';

const X_LABEL_OFFSET = 16;
const NEGATIVE_LABEL_OFFSET = -4;

export interface ChartProps {
  data: DataSeries[];
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  dimensions?: Dimensions;
  labelHelpers?: LabelHelpers[];
}

export function Chart({
  data,
  dimensions,
  xAxisOptions,
  yAxisOptions,
  labelHelpers,
}: ChartProps) {
  const {theme} = useChartContext();
  const selectedTheme = useTheme();

  const [xAxisHeight, setXAxisHeight] = useState(LINE_HEIGHT);
  const dataSeries = data[0].data;
  const colorOverride = data[0].color;
  const [maskRef, setMaskRef] = useState<SVGMaskElement | null>(null);

  const xValues = dataSeries.map(({key}) => key) as string[];
  const yValues = dataSeries.map(({value}) => value) as number[];

  const maxValue = yValues.length === 0 ? 0 : Math.max(...yValues);

  if (!Number.isFinite(maxValue)) {
    throw new Error('Data must be finite');
  }

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

  const drawableHeight = height - xAxisHeight - X_LABEL_OFFSET;

  const yScale = scaleLinear()
    .range([0, drawableHeight - BAR_CONTAINER_TEXT_HEIGHT])
    .domain([0, maxValue]);

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

  const color = colorOverride || selectedTheme.seriesColors.single;
  const barsGradient = getGradientFromColor(color);

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

  return (
    <ChartElements.Svg height={height} width={width}>
      <LinearGradientWithStops
        gradient={connectorGradient}
        id={connectorGradientId}
        x1="0%"
        x2="0%"
        y1="100%"
        y2="0%"
      />

      <LinearGradientWithStops gradient={barsGradient} id={`${gradientId}`} />

      <mask ref={setMaskRef} id={`${maskId}-${theme}-grad`} />
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

        const barHeight = getBarHeight(dataPoint.value || 0);
        const percentLabel = handlePercentLabelFormatter(percentCalculation);
        const formattedYValue = yAxisOptions.labelFormatter(yAxisValue);

        const labelHelper = labelHelpers?.find(
          (helper) => helper.key === dataPoint.key,
        );

        return (
          <Fragment key={dataPoint.key}>
            {maskRef && (
              <g key={dataPoint.key} role="listitem">
                <FunnelSegment
                  percentLabel={percentLabel}
                  labelHelper={labelHelper && labelHelper.value}
                  formattedYValue={formattedYValue}
                  isLast={index === dataSeries.length - 1}
                  connector={{
                    height: drawableHeight,
                    startX: x + barWidth,
                    startY: drawableHeight - barHeight,
                    nextX: xScale(nextPoint?.key as string),
                    nextY: drawableHeight - nextBarHeight,
                    nextPoint,
                    fill: `url(#${connectorGradientId})`,
                  }}
                  ariaLabel={`${xAxisOptions.labelFormatter(
                    dataPoint.key,
                  )}: ${yAxisOptions.labelFormatter(dataPoint.value)}`}
                  barWidth={barWidth}
                  barHeight={barHeight}
                  color={MASK_HIGHLIGHT_COLOR}
                  x={x}
                  portalTo={maskRef}
                  index={index}
                  drawableHeight={drawableHeight}
                />
              </g>
            )}
          </Fragment>
        );
      })}

      <g aria-hidden="true">
        <FunnelChartXAxisLabels
          allowLineWrap={xAxisOptions.allowLineWrap}
          chartX={barWidth / NEGATIVE_LABEL_OFFSET}
          chartY={drawableHeight + X_LABEL_OFFSET}
          labels={labels}
          labelWidth={barWidth + barWidth / 2}
          onHeightChange={setXAxisHeight}
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
        style={{
          pointerEvents: 'none',
        }}
      />
    </ChartElements.Svg>
  );
}
