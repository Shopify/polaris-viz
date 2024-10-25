import React, {useState, useEffect} from 'react';
import type {ScaleLinear} from 'd3-scale';

import {XAxis} from '../../XAxis';
import styles from '../Grid.scss';

import {AxisLabel} from './AxisLabel';

interface XAxisLabelsProps {
  xLabels: string[];
  xAxisLabelWidth: number;
  xAxisHeight: number;
  chartPositions: {
    xAxisBounds: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  };
  dimensions: {width: number; height: number};
  xScale: ScaleLinear<number, number>;
  xAxisOptions: {
    hide?: boolean;
    label?: string;
    highLabel?: string;
  };
  Y_AXIS_LABEL_WIDTH: number;
  Y_LABEL_OFFSET: number;
  X_LABEL_OFFSET: number;
  setXAxisHeight: (height: number) => void;
  isAnimated: boolean;
}

export function XAxisLabels({
  xLabels,
  xAxisLabelWidth,
  xAxisHeight,
  chartPositions,
  dimensions,
  xScale,
  xAxisOptions,
  Y_AXIS_LABEL_WIDTH,
  Y_LABEL_OFFSET,
  X_LABEL_OFFSET,
  setXAxisHeight,
  isAnimated,
}: XAxisLabelsProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const animationDelay = isAnimated && !prefersReducedMotion ? '0.5s' : '0s';

  return (
    <g className={styles.FadeInLabel} opacity={xAxisOptions?.hide ? 0 : 1}>
      <XAxis
        allowLineWrap={false}
        labels={xLabels}
        labelWidth={xAxisLabelWidth}
        onHeightChange={setXAxisHeight}
        x={Y_AXIS_LABEL_WIDTH + Y_LABEL_OFFSET}
        y={chartPositions.xAxisBounds.y + Y_LABEL_OFFSET}
        xScale={xScale}
        ariaHidden
      />

      <React.Fragment>
        <AxisLabel
          x={dimensions.width + Y_LABEL_OFFSET}
          y={dimensions.height + xAxisHeight / 2}
          textAnchor="end"
          dominantBaseline="bottom"
          label={xAxisOptions.highLabel ?? ''}
          animationDelay={animationDelay}
          isAnimated={isAnimated}
        />
      </React.Fragment>

      {xAxisOptions.label && (
        <text
          x={
            (chartPositions.xAxisBounds.x + chartPositions.xAxisBounds.width) /
            2
          }
          y={dimensions.height + X_LABEL_OFFSET}
          fontSize="14"
          fill="#6b7177"
          textAnchor="middle"
          style={{animationDelay}}
        >
          {xAxisOptions.label}
        </text>
      )}
    </g>
  );
}
