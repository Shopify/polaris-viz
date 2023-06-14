import type {CSSProperties, Dispatch, SetStateAction} from 'react';
import {useEffect, useRef, useState} from 'react';
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
  RenderLegendContent,
} from '../../types';
import {classNames} from '../../utilities';

import style from './LegendContainer.scss';

export interface LegendContainerProps {
  colorVisionType: string;
  data: LegendData[];
  onDimensionChange: Dispatch<SetStateAction<Dimensions>>;
  direction?: Direction;
  fullWidth?: boolean;
  position?: LegendPosition;
  maxWidth?: number;
  renderLegendContent?: RenderLegendContent;
}

export function LegendContainer({
  colorVisionType,
  data,
  onDimensionChange,
  direction = 'horizontal',
  fullWidth = false,
  position = 'top-left',
  maxWidth,
  renderLegendContent,
}: LegendContainerProps) {
  const selectedTheme = useTheme();
  const {setRef, entry} = useResizeObserver();
  const {theme} = useChartContext();

  const previousHeight = useRef(DEFAULT_LEGEND_HEIGHT);
  const previousWidth = useRef(DEFAULT_LEGEND_WIDTH);
  const [activeIndex, setActiveIndex] = useState(-1);
  const isPositionTop = position.includes('top');
  const isPositionLeft = position.includes('left');

  const {horizontalMargin} = selectedTheme.grid;
  const leftMargin = isPositionLeft ? 0 : horizontalMargin;

  const styleMap: {[key: string]: CSSProperties} = {
    horizontal: {
      justifyContent: 'flex-end',
      margin: isPositionTop
        ? `0 ${horizontalMargin}px ${LEGENDS_BOTTOM_MARGIN}px ${leftMargin}px`
        : `${LEGENDS_TOP_MARGIN}px ${horizontalMargin}px 0 ${leftMargin}px`,
      flexDirection: 'row',
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
      {renderLegendContent?.(colorVisionInteractionMethods) ?? (
        <Legend
          activeIndex={activeIndex}
          colorVisionType={colorVisionType}
          data={data}
          theme={theme}
        />
      )}
    </div>
  );
}
