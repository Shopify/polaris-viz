import React, {useMemo} from 'react';
import type {ScaleLinear} from 'd3-scale';
import {area as areaShape, line} from 'd3-shape';

import {usePrevious} from '../../hooks';
import type {LineChartDataSeriesWithDefaults} from '../../types';
import {LinearGradientWithStops} from '../../components';
import {
  DataPoint,
  GradientStop,
  usePolarisVizContext,
  useTheme,
  curveStepRounded,
  uniqueId,
  getColorVisionEventAttrs,
  getColorVisionStylesForActiveIndex,
  useChartContext,
  getGradientFromColor,
} from '../../';
import {
  COLOR_VISION_SINGLE_ITEM,
  SHAPE_ANIMATION_HEIGHT_BUFFER,
  STROKE_DOT_ARRAY_WIDTH,
  LINE_SERIES_POINT_RADIUS,
} from '../../constants';

import {Area, AnimatedLine, AnimatedArea} from './components';

const ANIMATION_DELAY = 200;
const SPARK_STROKE_WIDTH = 1.5;

export const StrokeDasharray = {
  dotted: STROKE_DOT_ARRAY_WIDTH,
  solid: 'none',
};

function getLineStyle({
  isComparison = false,
}: {
  isComparison: boolean | undefined;
}) {
  if (!isComparison) {
    return 'solid';
  }

  return 'dotted';
}

export interface LineSeriesProps {
  data: LineChartDataSeriesWithDefaults;
  index: number;
  svgDimensions: {width: number; height: number};
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  activeLineIndex?: number;
  theme: string;
  type?: 'default' | 'spark';
}

export function LineSeries({
  activeLineIndex = -1,
  data,
  index = 0,
  svgDimensions,
  theme,
  type = 'default',
  xScale,
  yScale,
}: LineSeriesProps) {
  const {
    // eslint-disable-next-line id-length
    components: {Defs, Mask, G, Rect, Path, Circle},
    animated,
  } = usePolarisVizContext();

  const previousData = usePrevious(data);

  const {shouldAnimate} = useChartContext();

  const AnimatedGroup = animated(G);
  const color = data?.color;
  const selectedTheme = useTheme(theme);
  const isSparkChart = type === 'spark';
  const lineStyle = getLineStyle({
    isComparison: data.isComparison,
  });

  const lineGenerator = line<DataPoint>()
    .x((_, index) => (xScale == null ? 0 : xScale(index)))
    .y(({value}) => yScale(value ?? 0))
    .defined(({value}) => value != null);

  const areaGenerator = areaShape<DataPoint>()
    .x((_: DataPoint, index: number) => xScale(index))
    .y0(svgDimensions.height)
    .y1(({value}) => yScale(value ?? 0))
    .defined(({value}) => value != null);

  if (selectedTheme.line.hasSpline) {
    lineGenerator.curve(curveStepRounded);
    areaGenerator.curve(curveStepRounded);
  }

  const lineShape = lineGenerator(data.data);
  const [lastLinePoint] = data.data
    .filter(({value}) => value != null)
    .slice(-1);

  const lastLinePointCoordinates =
    lastLinePoint?.value != null
      ? {
          x: xScale(data.data.indexOf(lastLinePoint)),
          y: yScale(lastLinePoint.value),
        }
      : null;

  const areaPath = areaGenerator(data.data);

  const id = useMemo(() => uniqueId('line-series'), []);
  const immediate = !shouldAnimate;

  const lineGradientColor = getGradientFromColor(color);

  const isSolidLine = data.isComparison !== true;
  const solidLineDelay = isSolidLine ? index * ANIMATION_DELAY : 0;
  const delay = immediate ? 0 : solidLineDelay;

  const hasNulls = (data?: LineChartDataSeriesWithDefaults) =>
    data?.data.some(({value}) => value == null);

  const dataIsValidForAnimation =
    !hasNulls(data) &&
    !hasNulls(previousData) &&
    data.data.length === previousData?.data.length;

  const {x: lastX = 0, y: lastY = 0} = lastLinePointCoordinates ?? {};

  const zeroLineData = data.data.map((dataPoint) => ({
    ...dataPoint,
    value: dataPoint.value === null ? null : 0,
  }));

  if (lineShape == null || areaPath == null) {
    return null;
  }

  const strokeWidth = isSparkChart
    ? SPARK_STROKE_WIDTH
    : selectedTheme.line.width;

  const PathHoverTargetSize = 40;

  const showPoint =
    -isSparkChart && !data.isComparison && lastLinePointCoordinates != null;

  const zeroLineY = yScale(0);

  return (
    <React.Fragment>
      <AnimatedGroup opacity={1}>
        <Defs>
          <LinearGradientWithStops
            id={`line-${id}`}
            gradient={lineGradientColor as GradientStop[]}
            gradientUnits="userSpaceOnUse"
            y1="100%"
            y2="0%"
          />

          <Mask id={`mask-${id}`}>
            {dataIsValidForAnimation ? (
              <AnimatedLine
                lastX={lastX}
                lastY={lastY}
                showPoint={showPoint}
                delay={delay}
                lineGenerator={lineGenerator}
                strokeWidth={strokeWidth}
                immediate={immediate}
                index={index}
                activeLineIndex={activeLineIndex}
                strokeDasharray={StrokeDasharray[lineStyle]}
                fromData={previousData}
                toData={data}
                zeroLineY={zeroLineY}
                zeroLineData={zeroLineData}
              />
            ) : (
              <React.Fragment>
                <Path
                  d={lineShape}
                  stroke="white"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth={strokeWidth}
                  style={{
                    ...getColorVisionStylesForActiveIndex({
                      activeIndex: activeLineIndex,
                      index,
                    }),
                    strokeDasharray: StrokeDasharray[lineStyle],
                  }}
                />
                {showPoint && (
                  <Circle
                    cx={lastX}
                    cy={lastY}
                    r={LINE_SERIES_POINT_RADIUS}
                    fill="white"
                  />
                )}
              </React.Fragment>
            )}
          </Mask>
        </Defs>

        {selectedTheme.line.hasArea &&
          (dataIsValidForAnimation ? (
            <AnimatedArea
              areaGenerator={areaGenerator}
              fromData={previousData}
              toData={data}
              zeroLineData={zeroLineData}
              type={type}
              delay={delay}
              immediate={immediate}
            />
          ) : (
            <Area series={data} areaPath={areaPath} type={type} />
          ))}

        <Rect
          x="0"
          y={(strokeWidth + SHAPE_ANIMATION_HEIGHT_BUFFER) * -1}
          width={svgDimensions.width}
          height={
            svgDimensions.height +
            strokeWidth * 2 +
            SHAPE_ANIMATION_HEIGHT_BUFFER
          }
          fill={
            data.isComparison
              ? selectedTheme.seriesColors.comparison
              : `url(#line-${id})`
          }
          mask={`url(#mask-${`${id}`})`}
        />

        <Path
          d={lineShape}
          strokeWidth={PathHoverTargetSize}
          stroke="transparent"
          fill="none"
          {...getColorVisionEventAttrs({
            type: COLOR_VISION_SINGLE_ITEM,
            index,
          })}
        />
      </AnimatedGroup>
    </React.Fragment>
  );
}
