import {Fragment, useMemo} from 'react';
import type {ScaleLinear} from 'd3-scale';
import {area as areaShape, line} from 'd3-shape';

import {usePrevious} from '../../hooks';
import type {LineChartDataSeriesWithDefaults} from '../../types';
import {LinearGradientWithStops} from '../../components';
import type {DataPoint, GradientStop} from '../../';
import {
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
} from '../../constants';

import {Area, AnimatedLine, AnimatedArea} from './components';

const ANIMATION_DELAY = 200;
const SPARK_STROKE_WIDTH = 1.5;

export interface LineSeriesProps {
  data: LineChartDataSeriesWithDefaults;
  index: number;
  svgDimensions: {width: number; height: number};
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  activeLineIndex?: number;
  animationDelay?: number;
  hiddenIndexes?: number[];
  theme: string;
  type?: 'default' | 'spark';
  shouldShowArea?: boolean;
}

export function LineSeries({
  activeLineIndex = -1,
  animationDelay,
  data,
  hiddenIndexes = [],
  index: lineSeriesIndex = 0,
  svgDimensions,
  theme,
  type = 'default',
  xScale,
  yScale,
  shouldShowArea = true,
}: LineSeriesProps) {
  const index = data?.metadata?.relatedIndex ?? lineSeriesIndex;

  const {
    // eslint-disable-next-line id-length
    components: {Defs, Mask, G, Rect, Path},
    animated,
  } = usePolarisVizContext();

  const previousData = usePrevious(data);

  const {shouldAnimate, comparisonIndexes} = useChartContext();

  const AnimatedGroup = animated(G);
  const color = data?.color;
  const selectedTheme = useTheme(theme);
  const isSparkChart = type === 'spark';

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

  const hasMultipleComparisonSeries = comparisonIndexes.length > 1;
  const isComparisonLine =
    data.isComparison === true || comparisonIndexes.includes(index);

  const solidLineDelay =
    animationDelay == null ? index * ANIMATION_DELAY : animationDelay;
  const delay = immediate || isComparisonLine ? 0 : solidLineDelay;

  const hasNulls = (data?: LineChartDataSeriesWithDefaults) =>
    data?.data.some(({value}) => value == null);

  const dataIsValidForAnimation =
    !hasNulls(data) &&
    !hasNulls(previousData) &&
    data.data.length === previousData?.data.length;

  const {y: lastY = 0} = lastLinePointCoordinates ?? {};

  const zeroLineData = data.data.map((dataPoint) => ({
    ...dataPoint,
    value: dataPoint.value === null ? null : 0,
  }));

  if (lineShape == null || areaPath == null) {
    return null;
  }

  const strokeWidth = isSparkChart
    ? SPARK_STROKE_WIDTH
    : data.width ?? selectedTheme.line.width;
  const strokeDasharray = data.strokeDasharray ?? 'none';

  const PathHoverTargetSize = 15;

  const showArea =
    selectedTheme.line.hasArea &&
    data?.styleOverride?.line?.hasArea !== false &&
    shouldShowArea;

  const zeroLineY = yScale(0);

  /* Renders visual points for isolated data points in a comparison dataset.
  The dash stroke is too small to render these points effectively. */
  const renderIsolatedPoints = (
    data: LineChartDataSeriesWithDefaults,
  ): JSX.Element[] => {
    const points: JSX.Element[] = [];
    data.data.forEach((point, index) => {
      const prev = data.data[index - 1];
      const next = data.data[index + 1];
      if (
        point.value !== null &&
        (!prev || prev.value === null) &&
        (!next || next.value === null)
      ) {
        points.push(
          <circle
            cx={xScale(index)}
            cy={yScale(point.value)}
            r={1}
            fill={String(color)}
            key={index}
          />,
        );
      }
    });
    return points;
  };

  return (
    <Fragment>
      <AnimatedGroup
        opacity={1}
        style={{display: hiddenIndexes.includes(index) ? 'none' : undefined}}
      >
        <Defs>
          <LinearGradientWithStops
            id={`line-${id}`}
            gradient={lineGradientColor as GradientStop[]}
            gradientUnits="userSpaceOnUse"
            y1="100%"
            y2="0%"
          />

          <Mask id={`mask-${id}`}>
            <G
              style={{
                ...(hasMultipleComparisonSeries
                  ? {}
                  : getColorVisionStylesForActiveIndex({
                      activeIndex: activeLineIndex,
                      index,
                    })),
              }}
            >
              {dataIsValidForAnimation ? (
                <AnimatedLine
                  activeLineIndex={activeLineIndex}
                  delay={delay}
                  fromData={previousData}
                  immediate={immediate}
                  index={index}
                  isComparisonLine={isComparisonLine}
                  lastY={lastY}
                  lineGenerator={lineGenerator}
                  strokeDasharray={strokeDasharray}
                  strokeWidth={strokeWidth}
                  toData={data}
                  zeroLineData={zeroLineData}
                  zeroLineY={zeroLineY}
                />
              ) : (
                <Fragment>
                  <Path
                    d={lineShape}
                    stroke="white"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth={strokeWidth}
                    style={{
                      strokeDasharray,
                      strokeLinecap: 'round',
                    }}
                  />
                </Fragment>
              )}
            </G>
          </Mask>
        </Defs>

        {showArea &&
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
          fill={`url(#line-${id})`}
          mask={`url(#mask-${`${id}`})`}
          style={{pointerEvents: 'none'}}
        />
        {data.isComparison && renderIsolatedPoints(data)}
        <Path
          d={lineShape}
          strokeWidth={PathHoverTargetSize}
          stroke="transparent"
          fill="none"
          {...getColorVisionEventAttrs({
            type: COLOR_VISION_SINGLE_ITEM,
            index,
          })}
          style={{
            pointerEvents:
              hasMultipleComparisonSeries && isComparisonLine ? 'none' : 'auto',
          }}
        />
      </AnimatedGroup>
    </Fragment>
  );
}
