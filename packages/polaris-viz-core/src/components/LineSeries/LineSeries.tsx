import React, {useMemo} from 'react';
import type {ScaleLinear} from 'd3-scale';
import {area as areaShape, line} from 'd3-shape';
import {useSpring} from '@react-spring/core';

import {LinearGradientWithStops} from '../../components';
import {
  DataPoint,
  DataSeries,
  GradientStop,
  usePolarisVizContext,
  useTheme,
  curveStepRounded,
  uniqueId,
  isGradientType,
  LINES_LOAD_ANIMATION_CONFIG,
} from '../../';

import {Area} from './components/Area';

const POINT_RADIUS = 2;
const ANIMATION_DELAY = 200;

const StrokeDasharray = {
  dotted: '0.1 4',
  dashed: '2 4',
  solid: 'unset',
};

export interface LineSeriesProps {
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  data: DataSeries;
  isAnimated: boolean;
  svgDimensions: {width: number; height: number};
  native?: boolean;
  theme: string;
  index: number;
}

export function LineSeries({
  xScale,
  yScale,
  data,
  isAnimated,
  svgDimensions,
  theme = 'Default',
  index = 0,
}: LineSeriesProps) {
  const {
    // eslint-disable-next-line id-length
    components: {Defs, Mask, G, Rect, Circle, Path},
    animated,
  } = usePolarisVizContext();

  const AnimatedGroup = animated(G);
  const color = data?.color;
  const selectedTheme = useTheme(theme);

  const lineGenerator = line<DataPoint>()
    .x(({key}) => xScale(Number(key)))
    .y(({value}) => (value == null ? yScale(0) : yScale(value)))
    .defined(({value}) => value != null);

  const areaGenerator = areaShape<DataPoint>()
    .x(({key}) => xScale(Number(key)))
    .y0(svgDimensions.height)
    .y1(({value}) => (value == null ? yScale(0) : yScale(value)))
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

  const id = useMemo(() => uniqueId('sparkline'), []);
  const immediate = !isAnimated;

  const lineGradientColor = isGradientType(color!)
    ? color
    : [
        {
          color,
          offset: 0,
        },
      ];

  const showPoint = !data.isComparison && lastLinePointCoordinates != null;
  const {x: lastX = 0, y: lastY = 0} = lastLinePointCoordinates ?? {};
  const lineStyle = data.isComparison ? 'dashed' : 'solid';
  const isSolidLine = data.isComparison !== true;

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
    delay: isSolidLine ? index * ANIMATION_DELAY : 0,
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
      <AnimatedGroup transform={isSolidLine ? transform : ''} opacity={opacity}>
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
              style={{
                // transform: [{skewX: '45deg'}],
                strokeDasharray: StrokeDasharray[lineStyle],
              }}
            />
            {showPoint && (
              <Circle cx={lastX} cy={lastY} r={POINT_RADIUS} fill="white" />
            )}
          </Mask>
        </Defs>

        {data.isComparison === true ? null : (
          <Area color={color!} areaPath={areaPath} />
        )}
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
      </AnimatedGroup>
    </React.Fragment>
  );
}
