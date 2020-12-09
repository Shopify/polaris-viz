import React from 'react';

import {TooltipContainer} from '../../../TooltipContainer';
import {Margin} from '../../constants';
import {Series} from '../../types';
import {LinePreview} from '../LinePreview';

import styles from './Tooltip.scss';

interface Props {
  activePointIndex: number;
  currentX: number;
  currentY: number;
  formatYAxisLabel(value: number): string;
  series: Series[];
  chartDimensions: DOMRect;
}

export function Tooltip({
  activePointIndex,
  currentX,
  currentY,
  formatYAxisLabel,
  series,
  chartDimensions,
}: Props) {
  return (
    <TooltipContainer
      activePointIndex={activePointIndex}
      currentX={currentX}
      currentY={currentY}
      chartDimensions={chartDimensions}
      margin={Margin}
    >
      <div className={styles.Container}>
        {series.map(({name, data, style = {}}) => {
          const point = data[activePointIndex];

          if (point == null) {
            return null;
          }

          const {color = 'colorPurple', lineStyle = 'solid'} = style;
          const formattedValue = formatYAxisLabel(point.rawValue);

          return (
            <React.Fragment key={name}>
              <LinePreview color={color} lineStyle={lineStyle} />
              <p className={styles.SeriesName}>{point.label}</p>
              <p className={styles.Value}>{formattedValue}</p>
            </React.Fragment>
          );
        })}
      </div>
    </TooltipContainer>
  );
}
