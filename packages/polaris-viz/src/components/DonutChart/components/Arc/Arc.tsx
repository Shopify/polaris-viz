import React, {useMemo} from 'react';
import {arc} from 'd3-shape';
import {uniqueId} from '@shopify/polaris-viz-core';
import type {Color, GradientStop} from '@shopify/polaris-viz-core';

import {classNames} from '../../../../utilities';
import {ARC_PAD_ANGLE} from '../../constants';

import styles from './Arc.scss';

export interface ArcProps {
  radius: number;
  height: number;
  width: number;
  startAngle: number;
  endAngle: number;
  isOnlySegment?: boolean;
  color: Color;
  cornerRadius: number;
  thickness: number;
}

export function Arc({
  radius,
  width,
  height,
  startAngle,
  endAngle,
  isOnlySegment,
  color,
  cornerRadius,
  thickness,
}: ArcProps) {
  const firstColor = (color[0] as GradientStop).color;
  const gradientId = useMemo(() => uniqueId('DonutChart'), []);

  const lastColor = (color[color.length - 1] as GradientStop).color;

  const createArc = arc().cornerRadius(cornerRadius);

  const arcOptions = {
    innerRadius: radius - thickness,
    outerRadius: radius,
    startAngle,
    endAngle,
    padAngle: ARC_PAD_ANGLE,
  };
  const path = createArc(arcOptions);
  const arcWidth = endAngle - startAngle;
  const halfwayPoint = startAngle + arcWidth / 2;

  const conicGradientValue = useMemo((): string => {
    const stopAdjustment = (startAngle - endAngle) * 0.25;

    return `conic-gradient(from ${startAngle}rad, ${firstColor}, ${lastColor} ${
      halfwayPoint - startAngle - stopAdjustment
    }rad ${endAngle - startAngle}rad, transparent ${endAngle - startAngle}rad)`;
  }, [endAngle, firstColor, halfwayPoint, lastColor, startAngle]);

  return (
    <React.Fragment>
      <clipPath id={gradientId} transform={`translate(${radius} ${radius})`}>
        <path className={classNames(styles.Arc)} d={path!} />
      </clipPath>
      <foreignObject
        x="0"
        y="0"
        width={width}
        height={height}
        clipPath={`url(#${gradientId})`}
        transform={`translate(-${radius} -${radius})`}
      >
        <div
          className={styles.Gradient}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            ...(isOnlySegment
              ? {background: lastColor}
              : {backgroundImage: conicGradientValue}),
          }}
        />
      </foreignObject>
    </React.Fragment>
  );
}
