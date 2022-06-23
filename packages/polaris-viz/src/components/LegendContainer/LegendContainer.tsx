import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {useTheme} from '@shopify/polaris-viz-core';
import type {Direction} from '@shopify/polaris-viz-core';

import {
  DEFAULT_LEGEND_HEIGHT,
  DEFAULT_LEGEND_WIDTH,
  LEGENDS_TOP_MARGIN,
} from '../../constants';
import {useResizeObserver, useWatchColorVisionEvents} from '../../hooks';
import {Legend} from '../Legend';
import type {LegendData} from '../../types';
import {classNames} from '../../utilities';

import style from './LegendContainer.scss';

export interface LegendContainerProps {
  colorVisionType: string;
  data: LegendData[];
  onHeightChange: Dispatch<SetStateAction<number>>;
  onWidthChange?: Dispatch<SetStateAction<number>>;
  theme: string;
  direction?: Direction;
}

export function LegendContainer({
  colorVisionType,
  data,
  onHeightChange,
  onWidthChange = () => {},
  theme,
  direction = 'horizontal',
}: LegendContainerProps) {
  const selectedTheme = useTheme(theme);
  const {setRef, entry} = useResizeObserver();
  const previousHeight = useRef(DEFAULT_LEGEND_HEIGHT);
  const [activeIndex, setActiveIndex] = useState(-1);

  const styleMap = {
    horizontal: {
      container: style.Horizontal,
      margin: `${LEGENDS_TOP_MARGIN}px ${selectedTheme.grid.horizontalMargin}px 0`,
    },
    vertical: {
      container: style.Vertical,
      margin: `0 ${selectedTheme.grid.horizontalMargin}px 0`,
    },
  };

  useWatchColorVisionEvents({
    type: colorVisionType,
    onIndexChange: ({detail}) => {
      setActiveIndex(detail.index);
    },
  });

  useEffect(() => {
    const newHeight = entry?.contentRect.height;

    if (
      entry == null ||
      entry?.contentRect.height === previousHeight.current ||
      newHeight == null
    ) {
      return;
    }

    previousHeight.current = newHeight;
    onHeightChange(newHeight! + LEGENDS_TOP_MARGIN);
  }, [entry, onHeightChange]);

  useEffect(() => {
    onHeightChange(DEFAULT_LEGEND_HEIGHT + LEGENDS_TOP_MARGIN);

    return () => {
      onHeightChange(0);
    };
  }, [onHeightChange]);

  useEffect(() => {
    const newWidth = entry?.contentRect.width;
    if (
      entry == null ||
      entry?.contentRect.width === previousHeight.current ||
      newWidth == null
    ) {
      return;
    }

    previousHeight.current = newWidth;
    onWidthChange(newWidth! + LEGENDS_TOP_MARGIN);
  }, [entry, onWidthChange]);

  useEffect(() => {
    onWidthChange(DEFAULT_LEGEND_WIDTH + LEGENDS_TOP_MARGIN);
    return () => {
      onWidthChange(0);
    };
  }, [onWidthChange]);

  return (
    <div
      className={classNames(style.Container, styleMap[direction].container)}
      ref={setRef}
      role="list"
      style={{margin: styleMap[direction].margin}}
    >
      <Legend
        activeIndex={activeIndex}
        colorVisionType={colorVisionType}
        data={data}
        theme={theme}
      />
    </div>
  );
}
