import type {RefObject} from 'react';
import {useMemo} from 'react';

import type {LegendData} from '../../../types';
import type {LegendItemDimension} from '../../Legend';

export interface HorizontalOverflowLegendProps {
  direction: 'horizontal';
  data: LegendData[];
  width: number;
  activatorWidth: number;
  legendItemDimensions: RefObject<LegendItemDimension[]>;
  leftMargin: number;
  horizontalMargin: number;
  enableHideOverflow: boolean;
}

export interface VerticalOverflowLegendProps {
  direction: 'vertical';
  data: LegendData[];
  height: number;
  enableHideOverflow: boolean;
  legendItemDimensions: RefObject<LegendItemDimension[]>;
}

export type UseOverflowLegendProps =
  | HorizontalOverflowLegendProps
  | VerticalOverflowLegendProps;

const LEGEND_GAP = 10;

export function useOverflowLegend(props: UseOverflowLegendProps) {
  const {direction, enableHideOverflow, legendItemDimensions, data} = props;

  const allData = useMemo(() => {
    return data.filter((legend) => legend.isHidden !== true);
  }, [data]);

  const {displayedData, hiddenData} = useMemo(() => {
    if (
      !enableHideOverflow ||
      !legendItemDimensions.current ||
      allData.length <= 1
    ) {
      return {displayedData: allData, hiddenData: []};
    }

    if (direction === 'vertical') {
      const {height} = props;

      let lastVisibleIndex = allData.length;

      legendItemDimensions.current.reduce((totalHeight, card, index) => {
        if (totalHeight + card.height + index * LEGEND_GAP > height) {
          lastVisibleIndex = index;
        } else {
          return totalHeight + card.height;
        }
      }, lastVisibleIndex);

      return {
        displayedData: allData.slice(0, lastVisibleIndex || 1),
        hiddenData: allData.slice(lastVisibleIndex || 1, allData.length),
      };
    }

    const {width, leftMargin, horizontalMargin, activatorWidth} = props;

    let lastVisibleIndex = allData.length;
    const containerWidth =
      width - leftMargin - horizontalMargin - activatorWidth;

    legendItemDimensions.current
      .filter((dimension) => Boolean(dimension))
      .reduce((totalWidth, card, index) => {
        if (totalWidth + card.width + index * LEGEND_GAP > containerWidth) {
          lastVisibleIndex = index;
        } else {
          return totalWidth + card.width;
        }
      }, lastVisibleIndex);

    return {
      displayedData: allData.slice(0, lastVisibleIndex || 1),
      hiddenData: allData.slice(lastVisibleIndex || 1, allData.length),
    };
  }, [enableHideOverflow, legendItemDimensions, direction, props, allData]);

  return {
    displayedData,
    hiddenData,
  };
}
