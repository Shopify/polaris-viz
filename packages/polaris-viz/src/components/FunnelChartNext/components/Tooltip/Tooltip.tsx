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
  tooltipLabels,
  labelFormatter,
  percentageFormatter,
}: TooltipContentProps) {
  const point = dataSeries[activeIndex];
  const previousPoint = dataSeries[activeIndex - 1];
  const isFirst = activeIndex === 0;

  const dropOffPercentage = Math.abs(
    calculateDropOff(previousPoint?.value ?? 0, point?.value ?? 0),
  );

  const data: Data[] = [
    {
      key: tooltipLabels.reached,
      value: labelFormatter(point.value),
      color: FUNNEL_CHART_SEGMENT_FILL,
      percent: isFirst ? 100 : 100 - dropOffPercentage,
    },
  ];

  if (!isFirst) {
    data.push({
      key: tooltipLabels.dropped,
      value: labelFormatter((previousPoint?.value ?? 0) - (point.value ?? 0)),
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
                    <span>
                      <strong>{percentageFormatter(percent)}</strong>
                    </span>
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
