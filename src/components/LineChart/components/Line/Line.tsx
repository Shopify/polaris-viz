import React from 'react';

import {ANIMATION_DELAY} from '../../constants';
import {getColorValue} from '../../../../utilities';
import {Series} from '../../types';

import styles from './Line.scss';

interface Props {
  series: Required<Series>;
  isAnimated: boolean;
  index: number;
  lineGenerator: any;
}

export const Line = React.memo(function Shape({
  series,
  isAnimated,
  index,
  lineGenerator,
}: Props) {
  const path = lineGenerator(series.data);

  if (path == null) {
    return null;
  }

  return (
    <React.Fragment>
      <path
        d={path}
        style={{
          /* stylelint-disable-next-line value-keyword-case */
          animationDelay: `${index * ANIMATION_DELAY}ms`,
        }}
        fill="none"
        strokeWidth="2px"
        paintOrder="stroke"
        stroke={getColorValue(series.color)}
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeDasharray={series.lineStyle === 'dashed' ? '2 4' : 'unset'}
        className={isAnimated ? styles.Path : null}
      />
    </React.Fragment>
  );
});
