import React, {useMemo} from 'react';
import type {ScaleLinear} from 'd3-scale';
import {area as areaShape, line} from 'd3-shape';
import {useSpring} from '@react-spring/core';

import type {LineChartDataSeriesWithDefaults} from '../../types';
import {LinearGradientWithStops} from '../../components';
import {
  DataPoint,
  GradientStop,
  usePolarisVizContext,
  useTheme,
  curveStepRounded,
  uniqueId,
  isGradientType,
  LINES_LOAD_ANIMATION_CONFIG,
  getColorVisionEventAttrs,
  getColorVisionStylesForActiveIndex,
} from '../../';
import {COLOR_VISION_SINGLE_ITEM} from '../../constants';

import {Area} from './components';
import styles from './LineSeries.scss';

const POINT_RADIUS = 2;
const ANIMATION_DELAY = 200;
const SPARK_STROKE_WIDTH = 1;

export const StrokeDasharray = {
  dotted: '0.1 8',
  dashed: '2 4',
  solid: 'unset',
};

function getLineStyle({
  isComparison = false,
  isSparkChart,
}: {
  isComparison: boolean | undefined;
  isSparkChart: boolean;
}) {
  if (!isComparison) {
    return 'solid';
  }

  if (isSparkChart) {
    return 'dashed';
  }

  return 'dotted';
}

export interface LineSeriesProps {
  data: LineChartDataSeriesWithDefaults;
  index: number;
  isAnimated: boolean;
  svgDimensions: {width: number; height: number};
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  activeLineIndex?: number;
  theme?: string;
  type?: 'default' | 'spark';
}

export function LineSeries({
  activeLineIndex = -1,
  data,
  index = 0,
  isAnimated,
  svgDimensions,
  theme = 'Default',
  type = 'default',
  xScale,
  yScale,
}: LineSeriesProps) {
  const {
    // eslint-disable-next-line id-length
    components: {Defs, Mask, G, Rect, Circle, Path},
    animated,
  } = usePolarisVizContext();

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
    lastLinePoint.value != null
      ? {
          x: xScale(Number(lastLinePoint.key)),
          y: yScale(lastLinePoint.value),
        }
      : null;

  const areaPath = areaGenerator(data.data);

  const id = useMemo(() => uniqueId('line-series'), []);
  const immediate = !isAnimated;

  const lineGradientColor = isGradientType(color!)
    ? color
    : [
        {
          color,
          offset: 0,
        },
      ];

  const showPoint =
    isSparkChart &&
    !data.isComparison &&
    lastLinePointCoordinates != null &&
    selectedTheme.line.hasPoint;

  const {x: lastX = 0, y: lastY = 0} = lastLinePointCoordinates ?? {};
  const lineStyle = getLineStyle({
    isComparison: data.isComparison,
    isSparkChart,
  });
  const isSolidLine = data.isComparison !== true;
  const solidLineDelay = isSolidLine ? index * ANIMATION_DELAY : 0;
  const delay = immediate ? 0 : solidLineDelay;

  const {scaleY, translateY, opacity} = useSpring({
    from: {
      translateY: svgDimensions.height,
      scaleY: 0,
      opacity: 0,
    },
    to: {
      translateY: 0,
      scaleY: 1,
      opacity: 1,
    },
    delay,
    config: LINES_LOAD_ANIMATION_CONFIG,
    default: {immediate},
  });

  const transform = scaleY.to(
    (value: number) => `translate(0 ${translateY.get()}) scale(1 ${value})`,
  );

  if (lineShape == null || areaPath == null) {
    return null;
  }

  return (
    <React.Fragment>
      <AnimatedGroup
        className={styles.Group}
        transform={isSolidLine ? transform : ''}
        opacity={opacity}
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
            <Path
              d={lineShape}
              stroke="white"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth={
                isSparkChart
                  ? SPARK_STROKE_WIDTH
                  : `${selectedTheme.line.width}px`
              }
              style={{
                ...getColorVisionStylesForActiveIndex({
                  activeIndex: activeLineIndex,
                  index,
                }),
                strokeDasharray: StrokeDasharray[lineStyle],
              }}
            />
            {showPoint && (
              <Circle cx={lastX} cy={lastY} r={POINT_RADIUS} fill="white" />
            )}
          </Mask>
        </Defs>

        <Area
          series={data}
          areaPath={areaPath}
          type={type}
          sparkArea={selectedTheme.line.sparkArea}
        />

        <Rect
          x="0"
          y="0"
          width={svgDimensions.width}
          height={svgDimensions.height}
          fill={
            data.isComparison
              ? selectedTheme.seriesColors.comparison
              : `url(#line-${id})`
          }
          mask={`url(#mask-${`${id}`})`}
        />

        <Path
          className={styles.Line}
          d={lineShape}
          strokeWidth={`${10}px`}
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
