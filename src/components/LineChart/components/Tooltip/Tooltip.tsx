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
  formatYAxisValue(value: number): string;
  series: Series[];
  chartDimensions: DOMRect;
}

export function Tooltip({
  activePointIndex,
  currentX,
  currentY,
  formatYAxisValue,
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
        {series.map(({name, data, formatY, style = {}}) => {
          const point = data[activePointIndex];

          if (point == null) {
            return null;
          }

          const {color = 'colorPurple', lineStyle = 'solid'} = style;
          const formattedYValue =
            formatY == null ? formatYAxisValue(point.y) : formatY(point.y);

          return (
            <React.Fragment key={name}>
              <LinePreview color={color} lineStyle={lineStyle} />
              <p className={styles.SeriesName}>{name}</p>
              <p className={styles.Value}>{formattedYValue}</p>
            </React.Fragment>
          );
        })}
      </div>
    </TooltipContainer>
  );
}
