import React from 'react';

import {isGradientType} from '../../utilities';
import {Data, NullableData, LineStyle, GradientColor, Color} from '../../types';
import {LinePreview} from '../LinePreview';
import {SquareColorPreview} from '../SquareColorPreview';

import styles from './Legend.scss';

interface LegendData {
  lineStyle?: LineStyle;
  data?: (Data | NullableData)[];
  name: string;
  color: Color | GradientColor;
}

interface Props {
  series: LegendData[];
  textColor: any;
}

export function Legend({series, textColor}: Props) {
  return (
    <div className={styles.Container} aria-hidden>
      {series.map(({name, color, lineStyle}, index) => {
        const invalidColor = lineStyle != null && isGradientType(color);

        if (invalidColor) {
          throw new Error('Gradients are not valid for line style legends.');
        }

        const colorPreview =
          lineStyle != null && !isGradientType(color) ? (
            <LinePreview color={color} lineStyle={lineStyle} />
          ) : (
            <SquareColorPreview color={color} />
          );

        return (
          <div className={styles.Series} key={`${name}-${index}`}>
            {colorPreview}
            <p className={styles.SeriesName} style={{color: textColor}}>
              {name}
            </p>
          </div>
        );
      })}
    </div>
  );
}
