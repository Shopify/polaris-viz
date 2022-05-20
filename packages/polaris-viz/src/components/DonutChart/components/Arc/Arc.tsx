import React, {useMemo} from 'react';
import {arc} from 'd3-shape';
import {GradientStop, uniqueId} from '@shopify/polaris-viz-core';
import type {Color} from '@shopify/polaris-viz-core';

import {ConicGradientWithStops} from '../../../';
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
  color,
  cornerRadius,
  thickness,
}: ArcProps) {
  const gradientId = useMemo(() => uniqueId('DonutChart'), []);
  const createArc = arc().cornerRadius(cornerRadius);

  const arcOptions = {
    innerRadius: radius - thickness,
    outerRadius: radius,
    startAngle,
    endAngle,
    padAngle: ARC_PAD_ANGLE,
  };
  const path = createArc(arcOptions);

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
        <ConicGradientWithStops
          height={height}
          width={width}
          startAngle={startAngle}
          endAngle={endAngle}
          gradient={color as GradientStop[]}
        />
      </foreignObject>
    </React.Fragment>
  );
}
