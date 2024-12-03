import type {LabelFormatter} from '@shopify/polaris-viz-core';

import type {LineChartPredictiveDataSeries} from '../../../../components/LineChartPredictive/types';
import type {ColorVisionInteractionMethods} from '../../../../types';
import {LegendItem} from '../../../Legend/components/LegendItem/LegendItem';
import {SeriesIcon} from '../SeriesIcon/SeriesIcon';

import styles from './CustomLegend.scss';

export interface Props extends ColorVisionInteractionMethods {
  data: LineChartPredictiveDataSeries[];
  predictiveSeriesNames: string[];
  seriesNameFormatter: LabelFormatter;
  theme: string;
}

export function CustomLegend({
  data,
  predictiveSeriesNames,
  getColorVisionEventAttrs,
  getColorVisionStyles,
  seriesNameFormatter,
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
              name={seriesNameFormatter(name ?? '')}
              shape="Line"
              theme={theme}
            />
          </li>
        );
      })}
    </ul>
  );
}
