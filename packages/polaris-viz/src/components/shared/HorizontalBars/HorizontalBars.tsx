import {Fragment, useState} from 'react';
import type {ScaleLinear} from 'd3-scale';
import type {DataSeries, LabelFormatter} from '@shopify/polaris-viz-core';
import {
  getColorVisionEventAttrs,
  estimateStringWidth,
  COLOR_VISION_SINGLE_ITEM,
  useChartContext,
} from '@shopify/polaris-viz-core';

import {getHoverZoneOffset} from '../../../utilities';
import {
  HORIZONTAL_BAR_LABEL_OFFSET,
  HORIZONTAL_GROUP_LABEL_HEIGHT,
  HORIZONTAL_SPACE_BETWEEN_SINGLE,
} from '../../../constants';
import {useTheme, useWatchColorVisionEvents} from '../../../hooks';
import {getGradientDefId} from '../GradientDefs';

import {Label, Bar} from './components';
import styles from './HorizontalBars.scss';

const SERIES_DELAY = 150;

export interface HorizontalBarsProps {
  activeGroupIndex: number;
  barHeight: number;
  data: DataSeries[];
  groupIndex: number;
  id: string;
  isSimple: boolean;
  labelFormatter: LabelFormatter;
  name: string;
  xScale: ScaleLinear<number, number>;
  zeroPosition: number;
  containerWidth: number;
  animationDelay?: number;
  areAllNegative?: boolean;
}

export function HorizontalBars({
  activeGroupIndex,
  animationDelay = 0,
  barHeight,
  data,
  groupIndex,
  id,
  isSimple,
  labelFormatter,
  name,
  xScale,
  zeroPosition,
  containerWidth,
  areAllNegative,
}: HorizontalBarsProps) {
  const selectedTheme = useTheme();
  const {characterWidths, theme} = useChartContext();

  const [activeBarIndex, setActiveBarIndex] = useState(-1);

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => {
      if (activeGroupIndex === -1 || activeGroupIndex === groupIndex) {
        setActiveBarIndex(detail.index);
      }
    },
  });

  return (
    <g
      transform={`translate(${zeroPosition},${HORIZONTAL_GROUP_LABEL_HEIGHT})`}
      aria-hidden="true"
    >
      {data.map((_, seriesIndex) => {
        if (data[seriesIndex].data[groupIndex] == null) {
          return;
        }

        const seriesAnimationDelay =
          animationDelay + SERIES_DELAY * seriesIndex;

        const {value} = data[seriesIndex].data[groupIndex];

        if (value == null) {
          return null;
        }

        const isNegative = value && value < 0;
        const label = labelFormatter(value);
        const ariaLabel = `${
          data[seriesIndex] ? data[seriesIndex].name : ''
        } ${value}`;

        const labelWidth = estimateStringWidth(`${label}`, characterWidths);

        const leftLabelOffset = isSimple
          ? labelWidth + HORIZONTAL_BAR_LABEL_OFFSET
          : 0;
        const width = Math.abs(xScale(value ?? 0) - xScale(0));

        const y =
          barHeight * seriesIndex +
          HORIZONTAL_SPACE_BETWEEN_SINGLE * seriesIndex;
        const negativeX = (width + leftLabelOffset) * -1;
        const x = isNegative ? negativeX : width + HORIZONTAL_BAR_LABEL_OFFSET;

        const {clampedSize} = getHoverZoneOffset({
          barSize: width,
          zeroPosition: xScale(0),
          max: containerWidth - x,
          position: 'horizontal',
          isNegative: value < 0,
        });

        return (
          <Fragment key={`series-${seriesIndex}-${id}-${name}`}>
            <Bar
              animationDelay={seriesAnimationDelay}
              areAllNegative={areAllNegative}
              color={`url(#${getGradientDefId(theme, seriesIndex, id)})`}
              height={barHeight}
              index={groupIndex}
              isActive={activeBarIndex === -1 || activeBarIndex === seriesIndex}
              transform={isNegative ? 'scaleX(-1)' : ''}
              width={width}
              x={0}
              y={y}
            />
            {isSimple && (
              <Label
                animationDelay={seriesAnimationDelay}
                barHeight={barHeight}
                color={
                  data[seriesIndex].isComparison
                    ? selectedTheme.seriesColors.comparison
                    : selectedTheme.xAxis.labelColor
                }
                label={label}
                labelWidth={labelWidth}
                x={x}
                y={y}
              />
            )}
            <rect
              className={styles.Bar}
              x={0}
              y={y - HORIZONTAL_SPACE_BETWEEN_SINGLE / 2}
              width={clampedSize}
              height={barHeight + HORIZONTAL_SPACE_BETWEEN_SINGLE}
              fill="transparent"
              style={{transform: isNegative ? 'scaleX(-1)' : ''}}
              {...getColorVisionEventAttrs({
                type: COLOR_VISION_SINGLE_ITEM,
                index: seriesIndex,
              })}
              tabIndex={-1}
              role="img"
              aria-label={ariaLabel}
            />
          </Fragment>
        );
      })}
    </g>
  );
}
