import {Fragment, useCallback, useMemo} from 'react';
import type {ScaleLinear} from 'd3-scale';
import {
  uniqueId,
  LinearGradientWithStops,
  DataType,
  COLOR_VISION_SINGLE_ITEM,
  COLOR_VISION_GROUP_ITEM,
  getColorVisionEventAttrs,
  clamp,
  useTheme,
  useChartContext,
  BAR_SPACING,
} from '@shopify/polaris-viz-core';
import type {Color} from '@shopify/polaris-viz-core';

import {getChartId} from '../../../../utilities/getChartId';
import {getHoverZoneOffset} from '../../../../utilities';
import {
  MASK_HIGHLIGHT_COLOR,
  SHAPE_ANIMATION_HEIGHT_BUFFER,
} from '../../../../constants';
import type {AccessibilitySeries} from '../../../VerticalBarChart/types';
import {formatAriaLabel} from '../../utilities';
import {applyColorVisionToDomElement} from '../../../../utilities/applyColorVisionToDomElement';
import {useWatchColorVisionEvents} from '../../../../hooks';
import {VerticalBar} from '../VerticalBar';

import styles from './BarGroup.scss';

const COLOR_VISION_MASK = 'colorVisionMask';

export interface BarGroupProps {
  animationDelay: number;
  x: number;
  yScale: ScaleLinear<number, number>;
  width: number;
  drawableHeight: number;
  data: (number | null)[];
  colors: Color[];
  barGroupIndex: number;
  indexOffset: number;
  accessibilityData: AccessibilitySeries[];
  activeBarGroup: number;
  gapWidth: number;
  areAllNegative?: boolean;
  theme?: string;
}

export function BarGroup({
  animationDelay,
  x,
  data,
  yScale,
  width,
  colors,
  drawableHeight,
  indexOffset,
  barGroupIndex,
  accessibilityData,
  activeBarGroup,
  gapWidth,
  theme,
  areAllNegative,
}: BarGroupProps) {
  const groupAriaLabel = formatAriaLabel(accessibilityData[barGroupIndex]);
  const {id, isPerformanceImpacted} = useChartContext();

  const selectedTheme = useTheme(theme);

  const maskItems = useMemo(() => {
    const chart = document.getElementById(getChartId(id));

    if (chart == null) {
      return [];
    }

    return chart.querySelectorAll<SVGRectElement>(
      `[data-type="${COLOR_VISION_MASK}"][data-group-index="${barGroupIndex}"]`,
    );
    // We want this to run whenever colors change so we
    // get all the mask items again.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors]);

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => {
      if (
        detail.index === -1 ||
        activeBarGroup === -1 ||
        activeBarGroup === barGroupIndex
      ) {
        maskItems.forEach((element) => {
          applyColorVisionToDomElement({
            element,
            activeIndex: detail.index,
            isPerformanceImpacted,
          });
        });
      }
    },
  });

  const dataLength = clamp({amount: data.length, min: 1, max: Infinity});
  const barWidth = width / dataLength;

  const getBarHeight = useCallback(
    (rawValue: number) => {
      return Math.abs(yScale(rawValue) - yScale(0));
    },
    [yScale],
  );
  const gradientId = useMemo(() => uniqueId('gradient'), []);
  const maskId = useMemo(() => uniqueId('mask'), []);

  const gradients = colors.map((color) => {
    return typeof color === 'string'
      ? [
          {
            color,
            offset: 0,
          },
        ]
      : color;
  });

  return (
    <Fragment>
      <mask id={maskId}>
        {data.map((rawValue, index) => {
          if (rawValue == null) {
            return null;
          }

          return (
            <g
              className={styles.BarGroup}
              data-type={DataType.BarGroup}
              data-index={barGroupIndex}
              key={`${barGroupIndex}${index}`}
            >
              <VerticalBar
                height={getBarHeight(rawValue)}
                color={MASK_HIGHLIGHT_COLOR}
                x={x + (barWidth + BAR_SPACING) * index}
                zeroPosition={yScale(0)}
                rawValue={rawValue}
                width={barWidth}
                index={index}
                animationDelay={animationDelay}
                areAllNegative={areAllNegative}
              />
            </g>
          );
        })}
      </mask>

      <g mask={`url(#${maskId})`}>
        {gradients.map((gradient, index) => {
          return (
            <g key={`${maskId}${index}`}>
              <LinearGradientWithStops
                gradient={gradient}
                id={`${gradientId}${index}`}
              />
              <rect
                x={x + (barWidth + BAR_SPACING) * index}
                y={SHAPE_ANIMATION_HEIGHT_BUFFER * -1}
                width={barWidth - BAR_SPACING}
                height={drawableHeight + SHAPE_ANIMATION_HEIGHT_BUFFER * 2}
                data-type={COLOR_VISION_MASK}
                data-index={index}
                data-group-index={barGroupIndex}
                fill={
                  data[index] === 0
                    ? selectedTheme.bar.zeroValueColor
                    : `url(#${gradientId}${index})`
                }
              />
            </g>
          );
        })}
      </g>

      <g
        {...getColorVisionEventAttrs({
          type: COLOR_VISION_GROUP_ITEM,
          index: barGroupIndex,
        })}
        className={styles.BarGroup}
        data-type={DataType.BarGroup}
        data-index={barGroupIndex}
        aria-hidden="false"
        aria-label={groupAriaLabel}
        role="list"
      >
        <rect
          width={barWidth * dataLength + gapWidth}
          x={x - gapWidth / 2}
          height={drawableHeight}
          fill="transparent"
          aria-hidden="true"
        />

        {data.map((rawValue, index) => {
          if (rawValue === null) {
            return null;
          }

          const {label, value} = accessibilityData[barGroupIndex].data[index];
          const ariaLabel = `${label} ${value}`;
          const height = clamp({
            amount: Math.abs(yScale(rawValue) - yScale(0)),
            min: 1,
            max: Infinity,
          });
          const isNegative = rawValue < 0;
          const y = isNegative ? yScale(0) : yScale(0) - height;

          const {clampedSize, offset} = getHoverZoneOffset({
            barSize: height,
            zeroPosition: yScale(0),
            max: drawableHeight,
            position: 'vertical',
          });

          return (
            <rect
              key={index}
              height={clampedSize}
              x={x + barWidth * index}
              y={isNegative || areAllNegative ? y : y - offset}
              width={barWidth}
              fill="transparent"
              aria-label={ariaLabel}
              role="listitem"
              {...getColorVisionEventAttrs({
                type: COLOR_VISION_SINGLE_ITEM,
                index: index + indexOffset,
                watch: !isPerformanceImpacted,
              })}
              className={styles.Bar}
              tabIndex={-1}
            />
          );
        })}
      </g>
    </Fragment>
  );
}
