import {Fragment} from 'react';
import type {Color, DataPoint, LabelFormatter} from '@shopify/polaris-viz-core';
import {DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';

import {TOOLTIP_WIDTH} from '../../constants';
import {FUNNEL_CHART_CONNECTOR_GRADIENT} from '../../../shared/FunnelChartConnector';
import {FUNNEL_CHART_SEGMENT_FILL} from '../../../shared/FunnelChartSegment';
import type {FunnelChartNextProps} from '../../FunnelChartNext';
import {SeriesIcon} from '../../../shared/SeriesIcon';
import {calculateDropOff} from '../../utilities/calculate-dropoff';
import {TooltipContentContainer, TooltipTitle} from '../../../TooltipContent';

import styles from './Tooltip.scss';

export interface TooltipContentProps {
  activeIndex: number;
  dataSeries: DataPoint[];
  isLast: boolean;
  tooltipLabels: FunnelChartNextProps['tooltipLabels'];
  labelFormatter: LabelFormatter;
  percentageFormatter: (value: number) => string;
}

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
  tooltipLabels,
  labelFormatter,
  percentageFormatter,
}: TooltipContentProps) {
  const point = dataSeries[activeIndex];
  const nextPoint = dataSeries[activeIndex + 1];

  const dropOffPercentage = Math.abs(
    calculateDropOff(point?.value ?? 0, nextPoint?.value ?? 0),
  );

  const data: Data[] = [
    {
      key: tooltipLabels.reached,
      value: labelFormatter(point.value),
      color: FUNNEL_CHART_SEGMENT_FILL,
      percent: 100 - dropOffPercentage,
    },
  ];

  if (!isLast) {
    data.push({
      key: tooltipLabels.dropped,
      value: labelFormatter(nextPoint?.value ?? 0 * dropOffPercentage),
      percent: dropOffPercentage,
      color: FUNNEL_CHART_CONNECTOR_GRADIENT,
    });
  }

  return (
    <TooltipContentContainer
      maxWidth={TOOLTIP_WIDTH}
      theme={DEFAULT_THEME_NAME}
    >
      {() => (
        <Fragment>
          <TooltipTitle theme={DEFAULT_THEME_NAME}>{point.key}</TooltipTitle>
          <div className={styles.Rows}>
            {data.map(({key, value, color, percent}, index) => {
              return (
                <div className={styles.Row} key={`row-${index}-${key}`}>
                  <div className={styles.Keys}>
                    <SeriesIcon color={color!} shape="Bar" />
                    <span>{key}</span>
                  </div>
                  <div className={styles.Values}>
                    <span>{value}</span>
                    {!isLast && (
                      <span>
                        <strong>{percentageFormatter(percent)}</strong>
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
}
