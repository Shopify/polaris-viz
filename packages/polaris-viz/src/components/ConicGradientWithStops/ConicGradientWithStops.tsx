import React from 'react';
import {GradientStop, isGradientType} from '@shopify/polaris-viz-core';

import styles from './ConicGradientWithStops.scss';

export interface ConicGradientWithStopsProps {
  gradient: GradientStop[];
  startAngle: number;
  endAngle: number;
  height: number;
  width: number;
}

export function ConicGradientWithStops({
  gradient,
  startAngle,
  endAngle,
  height,
  width,
}: ConicGradientWithStopsProps) {
  const firstColor = gradient[0].color;
  const lastColor = gradient[gradient.length - 1].color;
  const isGradient = isGradientType(gradient);

  const arcWidth = endAngle - startAngle;
  const halfwayPoint = startAngle + arcWidth / 2;
  const conicGradientValue = createGradient(startAngle, endAngle);

  function createGradient(startAngle, endAngle) {
    const stopAdjustment = (startAngle - endAngle) * 0.25;
    return `conic-gradient(from ${startAngle}rad, ${firstColor}, ${lastColor} ${
      halfwayPoint - startAngle - stopAdjustment
    }rad ${endAngle - startAngle}rad, transparent ${endAngle - startAngle}rad)`;
  }

  return (
    <div
      className={styles.Gradient}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        ...(isGradient
          ? {backgroundImage: conicGradientValue}
          : {background: lastColor}),
      }}
    />
  );
}
