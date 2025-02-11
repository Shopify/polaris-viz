import type {CSSProperties, Dispatch, SetStateAction} from 'react';
import {Fragment, useEffect, useRef, useState} from 'react';
import isEqual from 'fast-deep-equal';
import {
  getColorVisionEventAttrs,
  getColorVisionStylesForActiveIndex,
  LEGENDS_BOTTOM_MARGIN,
  LEGENDS_TOP_MARGIN,
  useChartContext,
  useTheme,
} from '@shopify/polaris-viz-core';
import type {Direction, Dimensions} from '@shopify/polaris-viz-core';

import {DEFAULT_LEGEND_HEIGHT, DEFAULT_LEGEND_WIDTH} from '../../constants';
import {useResizeObserver, useWatchColorVisionEvents} from '../../hooks';
import {Legend} from '../Legend';
import type {
  LegendData,
  LegendPosition,
  RenderHiddenLegendLabel,
  RenderLegendContent,
} from '../../types';
import {classNames} from '../../utilities';

import style from './LegendContainer.scss';
import {HiddenLegendTooltip} from './components/HiddenLegendTooltip';
import type {UseOverflowLegendProps} from './hooks/useOverflowLegend';
import {useOverflowLegend} from './hooks/useOverflowLegend';

export interface LegendContainerProps {
  colorVisionType: string;
  data: LegendData[];
  onDimensionChange: Dispatch<SetStateAction<Dimensions>>;
  direction?: Direction;
  fullWidth?: boolean;
  position?: LegendPosition;
  maxWidth?: number;
  renderLegendContent?: RenderLegendContent;
  /* If enabled, hides overflowing legend items with "+ n more" */
  enableHideOverflow?: boolean;
  renderHiddenLegendLabel?: RenderHiddenLegendLabel;
}

export function LegendContainer({
  colorVisionType,
  data: allData,
  onDimensionChange,
  direction = 'horizontal',
  fullWidth = false,
  position = 'bottom',
  maxWidth,
  renderLegendContent,
  enableHideOverflow = false,
  renderHiddenLegendLabel = (count) => `+${count} more`,
}: LegendContainerProps) {
  const selectedTheme = useTheme();
  const {setRef, entry} = useResizeObserver();
  const {theme, containerBounds} = useChartContext();

  const previousHeight = useRef(DEFAULT_LEGEND_HEIGHT);
  const previousWidth = useRef(DEFAULT_LEGEND_WIDTH);
  const [activeIndex, setActiveIndex] = useState(-1);
  const isPositionTop = position.includes('top');
  const isPositionLeft = position.includes('left');

  const {horizontalMargin} = selectedTheme.grid;
  const leftMargin = isPositionLeft ? 0 : horizontalMargin;

  const legendItemDimensions = useRef([{width: 0, height: 0}]);
  const [activatorWidth, setActivatorWidth] = useState(0);

  const overflowLegendProps =
    direction === 'horizontal'
      ? {
          direction: 'horizontal' as const,
          data: allData,
          enableHideOverflow,
          legendItemDimensions,
          width: containerBounds.width,
          activatorWidth,
          leftMargin,
          horizontalMargin,
        }
      : ({
          direction: 'vertical' as const,
          data: allData,
          height: containerBounds.height,
          enableHideOverflow,
          legendItemDimensions,
        } as UseOverflowLegendProps);

  const {displayedData, hiddenData} = useOverflowLegend(overflowLegendProps);

  // We only filter out the hidden data here because we want to pass all
  // the data to <Legend /> so that the indexes aren't messed up.
  const allVisibleData = allData.filter((legend) => legend.isHidden !== true);
  const hasHiddenData =
    enableHideOverflow && displayedData.length < allVisibleData.length;

  const styleMap: {[key: string]: CSSProperties} = {
    horizontal: {
      justifyContent: 'flex-end',
      margin: isPositionTop
        ? `0 ${horizontalMargin}px ${LEGENDS_BOTTOM_MARGIN}px ${leftMargin}px`
        : `${LEGENDS_TOP_MARGIN}px ${horizontalMargin}px 0 ${leftMargin}px`,
      flexDirection: 'row',
      flexWrap: enableHideOverflow ? 'nowrap' : 'wrap',
    },
    vertical: {
      alignItems: 'flex-start',
      margin: `0 ${horizontalMargin}px 0 ${leftMargin}px`,
      flexDirection: 'column',
      maxWidth: fullWidth ? 'none' : maxWidth,
      flex: fullWidth ? 1 : 'initial',
    },
    centerTiles: {
      justifyContent: 'center',
    },
  };

  const shouldCenterTiles = (pos) => {
    if (pos === 'top' || pos === 'bottom') {
      return {justifyContent: 'center'};
    }
  };

  const colorVisionInteractionMethods = {
    getColorVisionStyles: (index: number) =>
      getColorVisionStylesForActiveIndex({activeIndex, index}),
    getColorVisionEventAttrs: (index: number) =>
      getColorVisionEventAttrs({type: colorVisionType, index}),
  };

  useWatchColorVisionEvents({
    type: colorVisionType,
    onIndexChange: ({detail}) => {
      setActiveIndex(detail.index);
    },
  });

  useEffect(() => {
    const newHeight = entry?.contentRect.height;
    const newWidth = entry?.contentRect.width;
    const newDimensions = {height: newHeight!, width: newWidth!};
    if (entry == null || newHeight == null || newWidth == null) {
      return;
    }
    if (
      isEqual(
        {height: previousHeight.current, width: previousWidth.current},
        newDimensions,
      )
    ) {
      return;
    }
    previousHeight.current = newDimensions.height;
    previousWidth.current = newDimensions.width;
    onDimensionChange(newDimensions);
  }, [entry, onDimensionChange]);

  return (
    <div
      className={classNames(style.Container)}
      ref={setRef}
      role="list"
      style={{...styleMap[direction], ...shouldCenterTiles(position)}}
    >
      {renderLegendContent?.(colorVisionInteractionMethods, activeIndex) ?? (
        <Fragment>
          <Legend
            activeIndex={activeIndex}
            colorVisionType={colorVisionType}
            data={hasHiddenData ? displayedData : allData}
            theme={theme}
            itemDimensions={
              enableHideOverflow ? legendItemDimensions : undefined
            }
            truncate={hasHiddenData}
          />
          {hasHiddenData && (
            <HiddenLegendTooltip
              activeIndex={activeIndex}
              colorVisionType={colorVisionType}
              data={hiddenData}
              theme={theme}
              label={renderHiddenLegendLabel(
                allData.length - displayedData.length,
              )}
              lastVisibleIndex={allData.length - hiddenData.length}
              setActivatorWidth={setActivatorWidth}
            />
          )}
        </Fragment>
      )}
    </div>
  );
}
