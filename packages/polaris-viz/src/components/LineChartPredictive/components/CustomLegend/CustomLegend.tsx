import {uniqueId} from '@shopify/polaris-viz-core';
import {useMemo} from 'react';

import type {LineChartPredictiveDataSeries} from '../../../../components/LineChartPredictive/types';
import type {ColorVisionInteractionMethods} from '../../../../types';
import {LegendItem} from '../../../../components/Legend';
import {SeriesIcon} from '../SeriesIcon';

import styles from './CustomLegend.scss';

interface Props extends ColorVisionInteractionMethods {
  data: LineChartPredictiveDataSeries[];
  predictiveSeriesNames: string[];
  theme: string;
}

export function CustomLegend({
  data,
  predictiveSeriesNames,
  getColorVisionEventAttrs,
  getColorVisionStyles,
  theme,
}: Props) {
  return (
    <ul className={styles.Container}>
      {data.map(({color, name, isComparison, metadata}, index) => {
        if (metadata?.isPredictive) {
          return null;
        }

        function renderSeriesIcon() {
          return <SeriesIcon color={color!} />;
        }

        return (
          <li
            key={index}
            style={{
              ...getColorVisionStyles(index),
            }}
            {...getColorVisionEventAttrs(index)}
          >
            <LegendItem
              color={color!}
              index={index}
              renderSeriesIcon={
                predictiveSeriesNames.includes(name ?? '')
                  ? renderSeriesIcon
                  : undefined
              }
              isComparison={isComparison}
              name={name!}
              shape="Line"
              theme={theme}
            />
          </li>
        );
      })}
    </ul>
  );
}
