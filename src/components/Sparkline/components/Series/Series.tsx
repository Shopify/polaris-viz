import React, {useMemo} from 'react';
import type {ScaleLinear} from 'd3-scale';
import {area as areaShape, line} from 'd3-shape';

import {colorWhite, colorBlack} from '../../../../constants';
import type {Color, GradientStop, Theme} from '../../../../types';
import {LinearGradient} from '../../../LinearGradient';
import {
  curveStepRounded,
  uniqueId,
  isGradientType,
  classNames,
} from '../../../../utilities';
import {usePrefersReducedMotion} from '../../../../hooks';
import type {SingleSeries, Coordinates} from '../../Sparkline';

import styles from './Series.scss';

const POINT_RADIUS = 2;

const StrokeDasharray = {
  dotted: '0.1 4',
  dashed: '2 4',
  solid: 'unset',
};

function getGradientFill(area: Color | null) {
  if (area == null) {
    return null;
  }
  return isGradientType(area)
    ? area
    : [
        {
          color: area,
          offset: 0,
        },
      ];
}

export function Series({
  xScale,
  yScale,
  series,
  isAnimated,
  svgDimensions,
  theme,
}: {
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  series: SingleSeries;
  isAnimated: boolean;
  svgDimensions: {width: number; height: number};
  theme: Theme;
}) {
  const {prefersReducedMotion} = usePrefersReducedMotion();
  const {
    area = theme.line.sparkArea,
    lineStyle = theme.line.style,
    hasPoint = theme.line.hasPoint,
    data,
    color,
  } = series;

  const lineGenerator = line<Coordinates>()
    .x(({x}) => xScale(x))
    .y(({y}) => (y == null ? yScale(0) : yScale(y)))
    .defined(({y}) => y != null);

  const areaGenerator = areaShape<Coordinates>()
    .x(({x}) => xScale(x))
    .y0(svgDimensions.height)
    .y1(({y}) => (y == null ? yScale(0) : yScale(y)))
    .defined(({y}) => y != null);

  if (theme.line.hasSpline) {
    lineGenerator.curve(curveStepRounded);
    areaGenerator.curve(curveStepRounded);
  }

  const lineShape = lineGenerator(data);
  const [lastLinePoint] = data.filter(({y}) => y != null).slice(-1);

  const lastLinePointCoordinates =
    lastLinePoint.y != null
      ? {
          x: xScale(lastLinePoint.x),
          y: yScale(lastLinePoint.y),
        }
      : null;

  const areaPath = areaGenerator(data);

  const id = useMemo(() => uniqueId('sparkline'), []);
  const immediate = !isAnimated || prefersReducedMotion;

  const lineGradientColor = isGradientType(color!)
    ? color
    : [
        {
          color,
          offset: 0,
        },
      ];

  if (lineShape == null || areaPath == null) {
    return null;
  }

  const areaGradientColor = getGradientFill(area);

  const showPoint = hasPoint && lastLinePointCoordinates != null;
  const {x: lastX = 0, y: lastY = 0} = lastLinePointCoordinates ?? {};

  return (
    <React.Fragment>
      <defs>
        <LinearGradient
          id={`line-${id}`}
          gradient={lineGradientColor as GradientStop[]}
          gradientUnits="userSpaceOnUse"
          y1="100%"
          y2="0%"
        />

        {area == null ? null : (
          <LinearGradient
            id={`area-${id}`}
            gradient={areaGradientColor as GradientStop[]}
          />
        )}

        {showPoint ? (
          <React.Fragment>
            <circle cx={lastX} cy={lastY} r={POINT_RADIUS} id={`point-${id}`} />

            <mask id={`mask-${id}`}>
              <rect
                x="0"
                y="0"
                width={svgDimensions.width}
                height={svgDimensions.height}
                fill={colorWhite}
              />
              <use href={`#point-${id}`} fill={colorBlack} />
            </mask>
          </React.Fragment>
        ) : null}
      </defs>

      <path
        stroke={
          series.lineStyle && series.lineStyle !== 'solid'
            ? theme.line.dottedStrokeColor
            : `url(#line-${id})`
        }
        d={lineShape}
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
        className={classNames(styles.Line, !immediate && styles.AnimatedLine)}
        style={{strokeDasharray: StrokeDasharray[lineStyle]}}
        mask={`url(#mask-${`${id}`})`}
      />

      {area === null ? null : (
        <path
          fill={`url(#area-${id})`}
          d={areaPath}
          className={immediate ? undefined : styles.Area}
        />
      )}

      {showPoint ? (
        <use
          href={`#point-${id}`}
          fill={`url(#line-${id})`}
          className={styles.Point}
        />
      ) : null}
    </React.Fragment>
  );
}
