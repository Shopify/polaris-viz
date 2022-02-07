import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import {DEFAULT_LEGEND_HEIGHT, LEGENDS_TOP_MARGIN} from '../../constants';
import {useResizeObserver, useWatchColorVisionEvents} from '../../hooks';

import {Legend} from './components';
import type {LegendData} from './types';
import style from './LegendContainer.scss';

export interface LegendContainerProps {
  colorVisionType: string;
  data: LegendData[];
  onHeightChange: Dispatch<SetStateAction<number>>;
  theme?: string;
}

export function LegendContainer({
  colorVisionType,
  data,
  onHeightChange,
  theme,
}: LegendContainerProps) {
  const {setRef, entry} = useResizeObserver();
  const previousHeight = useRef(DEFAULT_LEGEND_HEIGHT);
  const [activeIndex, setActiveIndex] = useState(-1);

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

  return (
    <div
      className={style.Container}
      ref={setRef}
      style={{marginTop: LEGENDS_TOP_MARGIN}}
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
