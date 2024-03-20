import type {DataSeries} from '@shopify/polaris-viz-core';

import type {ColorVisionInteractionMethods} from '../../../../types';
import {LegendItem} from '../../../../components/Legend';

import styles from './CustomLegend.scss';

interface Props extends ColorVisionInteractionMethods {
  data: DataSeries[];
  theme: string;
}

export function CustomLegend({
  data,
  getColorVisionEventAttrs,
  getColorVisionStyles,
  theme,
}: Props) {
  const lineSeries = data.filter(
    (series) => series?.metadata?.relatedIndex == null,
  );

  const percentileItems = data.filter(
    (series) => series?.metadata?.relatedIndex != null,
  );

  const percentileIndex = lineSeries.length + 1;

  return (
    <ul className={styles.Container}>
      {lineSeries.map(({color, name, isComparison, metadata}) => {
        if (metadata?.isPredictive) {
          return null;
        }

        const index = data.findIndex((series) => series.name === name);

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
              isComparison={isComparison}
              name={name!}
              shape="Line"
              theme={theme}
            />
          </li>
        );
      })}
      <li
        key={percentileIndex}
        style={{
          ...getColorVisionStyles(percentileIndex),
        }}
        {...getColorVisionEventAttrs(percentileIndex)}
      >
        <LegendItem
          color={
            percentileItems[0].color ?? percentileItems[0]?.metadata?.areaColor
          }
          index={percentileIndex}
          name={percentileItems[0]?.metadata?.legendLabel}
          shape="Bar"
          theme={theme}
        />
      </li>
    </ul>
  );
}
