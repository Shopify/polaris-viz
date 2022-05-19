import React, {useMemo} from 'react';
import type {GradientStop, Color} from '@shopify/polaris-viz-core';

import styles from './ConicGradientWithStops.scss';

export interface ConicGradientWithStopsProps {
  color: Color;
  startAngle: number;
  endAngle: number;
  height: number;
  width: number;
}

export function ConicGradientWithStops({
  color,
  startAngle,
  endAngle,
  height,
  width,
}: ConicGradientWithStopsProps) {
  const firstColor = (color[0] as GradientStop).color;
  const lastColor = (color[color.length - 1] as GradientStop).color;
  const isSolidColor = color.length === 1;

  const arcWidth = endAngle - startAngle;
  const halfwayPoint = startAngle + arcWidth / 2;
  const conicGradientValue = useMemo((): string => {
    const stopAdjustment = (startAngle - endAngle) * 0.25;
    return `conic-gradient(from ${startAngle}rad, ${firstColor}, ${lastColor} ${
      halfwayPoint - startAngle - stopAdjustment
    }rad ${endAngle - startAngle}rad, transparent ${endAngle - startAngle}rad)`;
  }, [endAngle, firstColor, halfwayPoint, lastColor, startAngle]);

  return (
    <div
      className={styles.Gradient}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        ...(isSolidColor
          ? {background: lastColor}
          : {backgroundImage: conicGradientValue}),
      }}
    />
  );
}
