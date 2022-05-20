import React from 'react';
import type {GradientStop} from '@shopify/polaris-viz-core';

import {createCSSConicGradient} from '../../utilities';

import styles from './ConicGradientWithStops.scss';

export interface ConicGradientWithStopsProps {
  gradient: GradientStop[];
  height: number;
  width: number;
}

export function ConicGradientWithStops({
  gradient,
  height,
  width,
}: ConicGradientWithStopsProps) {
  const conicGradientValue = createCSSConicGradient(gradient);

  return (
    <div
      className={styles.Gradient}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: conicGradientValue,
      }}
    />
  );
}
