import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import {DEFAULT_LEGENDS_HEIGHT, LEGENDS_TOP_MARGIN} from '../../constants';
import {useResizeObserver, useWatchColorBlindEvents} from '../../hooks';

import {LegendItem} from './components';
import style from './Legends.scss';
import type {LegendData} from './types';

export interface LegendsProps {
  colorBlindType: string;
  legends: LegendData[];
  onHeightChange: Dispatch<SetStateAction<number>>;
}

export function Legends({
  colorBlindType,
  legends,
  onHeightChange,
}: LegendsProps) {
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
      {legends.map((legend, index) => {
        return (
          <LegendItem
            colorBlindType={colorBlindType}
            key={index}
            legend={legend}
            index={index}
            activeIndex={activeIndex}
          />
        );
      })}
    </div>
  );
}
