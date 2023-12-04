import type {ColorVisionInteractionMethods, DataSeries} from 'index';
import type {LabelFormatter} from '@shopify/polaris-viz-core';
import {useTheme} from '@shopify/polaris-viz-core';

import {TrendIndicator} from '../../../TrendIndicator';
import {getTrendIndicatorData} from '../../../../utilities/getTrendIndicatorData';
import {SquareColorPreview} from '../../../../components/SquareColorPreview';

import styles from './LegendValues.scss';

interface LegendContentProps {
  data: DataSeries[];
  labelFormatter: LabelFormatter;
  getColorVisionStyles: ColorVisionInteractionMethods['getColorVisionStyles'];
  getColorVisionEventAttrs: ColorVisionInteractionMethods['getColorVisionEventAttrs'];
}

export function LegendValues({
  data,
  labelFormatter,
  getColorVisionStyles,
  getColorVisionEventAttrs,
}: LegendContentProps) {
  const selectedTheme = useTheme();

  const maxTrendIndicatorWidth = data.reduce((maxWidth, {metadata}) => {
    if (!metadata?.trend) {
      return maxWidth;
    }

    const {trendIndicatorWidth} = getTrendIndicatorData(metadata.trend);

    return Math.max(maxWidth, trendIndicatorWidth);
  }, 0);

  return (
    <table className={styles.Table}>
      {data.map(({name, data, metadata}, index) => {
        const value = data[0].value;
        const valueExists = value !== null && value !== undefined;

        return (
          <tr
            key={name}
            style={{
              ...getColorVisionStyles(index),
            }}
            {...getColorVisionEventAttrs(index)}
          >
            <td className={styles.ColorPreview}>
              <SquareColorPreview
                color={selectedTheme.seriesColors.upToEight[index]}
              />
            </td>

            <td className={styles.Name}>
              <span
                style={{
                  color: selectedTheme.legend.labelColor,
                }}
              >
                {name}
              </span>
            </td>

            <td className={styles.TableSpacer} />

            <td className={styles.alignRight}>
              <span
                style={{
                  color: selectedTheme.legend.labelColor,
                }}
              >
                {valueExists ? labelFormatter(value) : '-'}
              </span>
            </td>

            <td
              className={styles.alignLeft}
              style={{minWidth: maxTrendIndicatorWidth, paddingLeft: '4px'}}
            >
              <span>
                {metadata?.trend && valueExists && (
                  <TrendIndicator {...metadata.trend} />
                )}
              </span>
            </td>
          </tr>
        );
      })}
    </table>
  );
}
