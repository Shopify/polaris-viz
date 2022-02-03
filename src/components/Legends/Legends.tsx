import React, {useEffect, useRef, useState} from 'react';

import {DEFAULT_LEGENDS_HEIGHT} from '../../constants';
import type {Color} from '../../types';
import {useResizeObserver, useWatchColorBlindEvents} from '../../hooks';

import {Legend} from './components';
import style from './Legends.scss';

interface LegendsProps {
  colorBlindType: string;
  legends: {name: string; color: Color}[];
  onHeightChange: (height: number) => void;
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
    onHeightChange(newHeight!);
  }, [entry, onHeightChange]);

  useEffect(() => {
    onHeightChange(DEFAULT_LEGENDS_HEIGHT);

    return () => {
      onHeightChange(0);
    };
  }, [onHeightChange]);

  return (
    <div className={style.Container} ref={setRef}>
      {legends.map((legend, index) => {
        return (
          <Legend
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
