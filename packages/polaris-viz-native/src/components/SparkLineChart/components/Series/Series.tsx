import React, {useMemo} from 'react';
import type {ScaleLinear} from 'd3-scale';
import {area as areaShape, line} from 'd3-shape';

import type {
  DataPoint,
  DataSeries,
  GradientStop,
  Theme,
} from '../../../../../../polaris-viz-core/src';
import {
  curveStepRounded,
  uniqueId,
  isGradientType,
  Defs,
  Mask,
  Rect,
  LinearGradient,
  usePrefersReducedMotion,
} from '../../../../../../polaris-viz-core/src';
import {Area} from '../Area';

const POINT_RADIUS = 2;

const StrokeDasharray = {
  dotted: '0.1 4',
  dashed: '2 4',
  solid: 'unset',
};

export function Series({
  xScale,
  yScale,
  data,
  isAnimated,
  svgDimensions,
  theme,
}: {
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  data: DataSeries;
  isAnimated: boolean;
  svgDimensions: {width: number; height: number};
  theme: Theme;
}) {
  const {prefersReducedMotion} = usePrefersReducedMotion({native: true});

  const lineGenerator = line<DataPoint>()
    .x(({key}) => xScale(Number(key)))
    .y(({value}) => (value == null ? yScale(0) : yScale(value)))
    .defined(({value}) => value != null);

  const areaGenerator = areaShape<DataPoint>()
    .x(({key}) => xScale(Number(key)))
    .y0(svgDimensions.height)
    .y1(({value}) => (value == null ? yScale(0) : yScale(value)))
    .defined(({value}) => value != null);

  if (theme.line.hasSpline) {
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
  const immediate = !isAnimated || prefersReducedMotion;

  const lineGradientColor = isGradientType(data.color!)
    ? data.color
    : [
        {
          color: data.color,
          offset: 0,
        },
      ];

  if (lineShape == null || areaPath == null) {
    return null;
  }

  const showPoint = !data.isComparison && lastLinePointCoordinates != null;
  const {x: lastX = 0, y: lastY = 0} = lastLinePointCoordinates ?? {};
  const lineStyle = data.isComparison ? 'dashed' : 'solid';

  return (
    <React.Fragment>
      <Defs native>
        <LinearGradient
          id={`line-${id}`}
          gradient={lineGradientColor as GradientStop[]}
          gradientUnits="userSpaceOnUse"
          y1="100%"
          y2="0%"
        />

        <Mask native id={`mask-${id}`}>
          <path
            d={lineShape}
            stroke="white"
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{strokeDasharray: StrokeDasharray[lineStyle]}}
          />
          {showPoint && (
            <circle cx={lastX} cy={lastY} r={POINT_RADIUS} fill="white" />
          )}
        </Mask>
      </Defs>

      {data.isComparison === true ? null : (
        <Area color={data.color!} immediate={immediate} areaPath={areaPath} />
      )}

      <Rect
        native
        x="0"
        y="0"
        width={svgDimensions.width}
        height={svgDimensions.height}
        fill={
          data.isComparison ? theme.seriesColors.comparison : `url(#line-${id})`
        }
        mask={`url(#mask-${`${id}`})`}
      />
    </React.Fragment>
  );
}
