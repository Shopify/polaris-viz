import {Fragment} from 'react';
import type {Color, DataPoint, YAxisOptions} from '@shopify/polaris-viz-core';
import {DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';
import type {FunnelChartNextProps} from 'components/FunnelChartNext/FunnelChartNext';

import {SeriesIcon} from '../../../shared/SeriesIcon';
import {BLUE_09, CONNECTOR_GRADIENT} from '../../constants';
import {calculateDropOff} from '../../utilities/calculate-dropoff';
import {TooltipContentContainer, TooltipTitle} from '../../../TooltipContent';

import styles from './Tooltip.scss';

export interface TooltipContentProps {
  activeIndex: number;
  dataSeries: DataPoint[];
  isLast: boolean;
  tooltipLabels: FunnelChartNextProps['tooltipLabels'];
  yAxisOptions: Required<YAxisOptions>;
}

const MAX_WIDTH = 300;

interface Data {
  key: string;
  value: string;
  color: Color;
  percent: number;
}

export function Tooltip({
  activeIndex,
  dataSeries,
  isLast,
  yAxisOptions,
  tooltipLabels,
}: TooltipContentProps) {
  const point = dataSeries[activeIndex];
  const nextPoint = dataSeries[activeIndex + 1];

  const dropOffPercentage = Math.abs(
    calculateDropOff(point?.value ?? 0, nextPoint?.value ?? 0),
  );

  const data: Data[] = [
    {
      key: tooltipLabels.reached,
      value: yAxisOptions.labelFormatter(point.value),
      color: BLUE_09,
      percent: 100 - dropOffPercentage,
    },
  ];

  if (!isLast) {
    data.push({
      key: tooltipLabels.dropped,
      value: yAxisOptions.labelFormatter(
        nextPoint?.value ?? 0 * dropOffPercentage,
      ),
      percent: dropOffPercentage,
      color: CONNECTOR_GRADIENT,
    });
  }

  return (
    <TooltipContentContainer maxWidth={MAX_WIDTH} theme={DEFAULT_THEME_NAME}>
      {() => (
        <Fragment>
          <TooltipTitle theme={DEFAULT_THEME_NAME}>{point.key}</TooltipTitle>
          <div className={styles.Rows}>
            {data.map(({key, value, color, percent}) => {
              return (
                <div className={styles.Row} key={key}>
                  <div className={styles.Keys}>
                    <SeriesIcon color={color!} shape="Bar" />
                    <span>{key}</span>
                  </div>
                  <div className={styles.Values}>
                    <span>{value}</span>
                    {!isLast && (
                      <span>
                        <strong>{formatPercentage(percent)}</strong>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Fragment>
      )}
    </TooltipContentContainer>
  );

  function formatPercentage(value: number) {
    return `${yAxisOptions.labelFormatter(value)}%`;
  }
}