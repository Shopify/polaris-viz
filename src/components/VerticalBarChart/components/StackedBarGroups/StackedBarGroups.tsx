import React, {useMemo} from 'react';
import type {ScaleBand, ScaleLinear} from 'd3-scale';

import {formatAriaLabel} from '../../../VerticalBarChart/utilities';
import {getOpacityForActive} from '../../../../hooks/ColorBlindA11y';
import {BAR_SPACING} from '../../../VerticalBarChart/constants';
import {getColorBlindEventAttrs} from '../../../../hooks';
import type {AccessibilitySeries} from '../../../VerticalBarChart/types';
import {Color, DataType, StackedSeries} from '../../../../types';
import {useStackedGapsForVerticalChart} from '../../hooks';

import {Stack} from './components';
import styles from './StackedBarGroups.scss';

interface StackedBarGroupsProps {
  accessibilityData: AccessibilitySeries[];
  activeBarGroup: number;
  colors: Color[];
  drawableHeight: number;
  id: string;
  labels: string[];
  stackedValues: StackedSeries[];
  xScale: ScaleBand<string>;
  yScale: ScaleLinear<number, number>;
  theme?: string;
}

export function StackedBarGroups({
  accessibilityData,
  activeBarGroup,
  drawableHeight,
  id,
  labels,
  stackedValues,
  theme,
  xScale,
  yScale,
}: StackedBarGroupsProps) {
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
    <React.Fragment>
      {formattedStackedValues.map((item, groupIndex) => {
        const x = xScale(groupIndex.toString()) ?? 0;
        const groupAriaLabel = formatAriaLabel(accessibilityData[groupIndex]);

        return (
          <g
            key={groupIndex}
            {...getColorBlindEventAttrs({
              type: 'group',
              index: groupIndex,
            })}
            className={styles.Group}
            style={{opacity: getOpacityForActive(activeBarGroup, groupIndex)}}
            aria-label={groupAriaLabel}
            role="list"
            data-type={DataType.BarGroup}
            data-index={groupIndex}
            aria-hidden="false"
          >
            <rect
              height={drawableHeight}
              x={x}
              width={xScale.bandwidth()}
              fill="transparent"
              aria-hidden="true"
            />
            <Stack
              activeBarGroup={activeBarGroup}
              data={item}
              gaps={gaps}
              groupIndex={groupIndex}
              id={id}
              theme={theme}
              width={width}
              x={x}
              yScale={yScale}
            />
          </g>
        );
      })}
    </React.Fragment>
  );
}
