import {Fragment, useMemo} from 'react';
import type {ScaleBand, ScaleLinear} from 'd3-scale';
import type {Color, DataSeries} from '@shopify/polaris-viz-core';
import {
  getColorVisionEventAttrs,
  DataType,
  COLOR_VISION_GROUP_ITEM,
  getColorVisionStylesForActiveIndex,
  BAR_SPACING,
  useChartContext,
} from '@shopify/polaris-viz-core';
import type {TooltipAttrData} from 'components/TooltipWrapper/utilities/getTooltipDataAttr';

import {getTooltipDataAttr} from '../../../TooltipWrapper';
import {getLoadAnimationDelay} from '../../../../utilities/getLoadAnimationDelay';
import {
  formatAriaLabel,
  sortBarChartData,
} from '../../../VerticalBarChart/utilities';
import type {AccessibilitySeries} from '../../../VerticalBarChart/types';
import type {StackedSeries} from '../../../../types';
import {useStackedGapsForVerticalChart} from '../../hooks';

import {Stack} from './components';
import styles from './StackedBarGroups.scss';

interface StackedBarGroupsProps {
  accessibilityData: AccessibilitySeries[];
  activeBarGroup: number;
  chartXPosition: number;
  chartYPosition: number;
  data: DataSeries[];
  colors: Color[];
  drawableHeight: number;
  gapWidth: number;
  id: string;
  labels: string[];
  stackedValues: StackedSeries[];
  xScale: ScaleBand<string>;
  yScale: ScaleLinear<number, number>;
}

export function StackedBarGroups({
  accessibilityData,
  activeBarGroup,
  chartXPosition,
  chartYPosition,
  data,
  drawableHeight,
  gapWidth,
  id,
  labels,
  stackedValues,
  xScale,
  yScale,
}: StackedBarGroupsProps) {
  const {containerBounds} = useChartContext();
  const width = xScale.bandwidth() - BAR_SPACING;

  const formattedStackedValues = useMemo(() => {
    return labels.map((_, labelIndex) => {
      return stackedValues.map((data) => {
        return data[labelIndex];
      });
    });
  }, [labels, stackedValues]);

  const gaps = useStackedGapsForVerticalChart({
    stackedValues,
    labels,
  });

  return (
    <Fragment>
      {formattedStackedValues.map((item, groupIndex) => {
        const x = xScale(groupIndex.toString()) ?? 0;
        const groupAriaLabel = formatAriaLabel(accessibilityData[groupIndex]);
        const animationDelay = getLoadAnimationDelay(
          groupIndex,
          formattedStackedValues.length,
        );

        const sortedData = sortBarChartData(data);
        const highestValueForStack =
          sortedData[groupIndex].reduce(sumPositiveData, 0) ?? 0;

        const hoverAreaX = x - gapWidth / 2;
        const hoverAreaWidth = xScale.bandwidth() + gapWidth;

        const tooltipData: TooltipAttrData = {
          index: groupIndex,
          x:
            containerBounds.x +
            chartXPosition +
            hoverAreaX +
            hoverAreaWidth / 2,
          y: containerBounds.y + chartYPosition + yScale(highestValueForStack),
          seriesBounds: {
            width: hoverAreaWidth,
            height: drawableHeight,
            x: containerBounds.x + chartXPosition + hoverAreaX,
            y: containerBounds.y + chartYPosition,
          },
        };

        return (
          <g
            key={groupIndex}
            className={styles.Group}
            style={getColorVisionStylesForActiveIndex({
              activeIndex: activeBarGroup,
              index: groupIndex,
            })}
            aria-label={groupAriaLabel}
            role="list"
          >
            <rect
              {...getColorVisionEventAttrs({
                type: COLOR_VISION_GROUP_ITEM,
                index: groupIndex,
              })}
              {...getTooltipDataAttr(tooltipData)}
              data-type={DataType.BarGroup}
              data-index={groupIndex}
              aria-hidden="false"
              width={hoverAreaWidth}
              x={hoverAreaX}
              height={drawableHeight}
              stroke="red"
              fill="rgba(0,0,255,0.2)"
            />

            <Stack
              activeBarGroup={activeBarGroup}
              animationDelay={animationDelay}
              data={item}
              gaps={gaps}
              groupIndex={groupIndex}
              id={id}
              tooltipData={tooltipData}
              width={width}
              x={x}
              yScale={yScale}
            />
          </g>
        );
      })}
    </Fragment>
  );
}

function sumPositiveData(prevValue: number, currValue: number) {
  return currValue < 0 ? prevValue : prevValue + currValue;
}
