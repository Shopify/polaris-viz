import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import {DEFAULT_LEGENDS_HEIGHT, LEGENDS_TOP_MARGIN} from '../../constants';
import {useResizeObserver, useWatchColorBlindEvents} from '../../hooks';

import {Legend} from './components';
import type {LegendData} from './types';
import style from './LegendsContainer.scss';

export interface LegendsContainerProps {
  colorBlindType: string;
  data: LegendData[];
  onHeightChange: Dispatch<SetStateAction<number>>;
  theme?: string;
}

export function LegendsContainer({
  colorBlindType,
  data,
  onHeightChange,
  theme,
}: LegendsContainerProps) {
  const {setRef, entry} = useResizeObserver();
  const previousHeight = useRef(DEFAULT_LEGENDS_HEIGHT);
  const [activeIndex, setActiveIndex] = useState(-1);

  useWatchColorBlindEvents({
    type: colorBlindType,
    onIndexChange: ({detail}) => {
      setActiveIndex(detail.index);
    },
  });

  useEffect(() => {
    const newHeight = entry?.contentRect.height;

    if (entry == null || entry?.contentRect.height === previousHeight.current) {
      return;
    }

    previousHeight.current = newHeight!;
    onHeightChange(newHeight! + LEGENDS_TOP_MARGIN);
  }, [entry, onHeightChange]);

  useEffect(() => {
    onHeightChange(DEFAULT_LEGENDS_HEIGHT + LEGENDS_TOP_MARGIN);

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
        colorBlindType={colorBlindType}
        data={data}
        theme={theme}
      />
    </div>
  );
}
