import {
  COLOR_VISION_SINGLE_ITEM,
  FONT_FAMILY,
  changeColorOpacity,
  useTheme,
} from '@shopify/polaris-viz-core';
import type {ReactNode} from 'react';
import {useRef, useState} from 'react';

import {useWatchColorVisionEvents} from '../../../../hooks';
import {TOOLTIP_BG_OPACITY} from '../../../../constants';
import {useBrowserCheck} from '../../../../hooks/useBrowserCheck';

import styles from './TooltipContentContainer.scss';

interface Props {
  children: ({
    activeColorVisionIndex,
  }: {
    activeColorVisionIndex: number;
  }) => ReactNode;
  maxWidth: number;
  minWidth?: number;
  theme: string;
  color?: string;
  ignoreColorVisionEvents?: boolean;
}

export function TooltipContentContainer({
  children,
  maxWidth,
  theme,
  color,
  ignoreColorVisionEvents = false,
  minWidth,
}: Props) {
  const {isFirefox} = useBrowserCheck();

  const selectedTheme = useTheme(theme);

  const [activeColorVisionIndex, setActiveIndex] = useState(-1);

  const resetTimer = useRef<number>(0);

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => {
      window.clearTimeout(resetTimer.current);

      if (detail.index === -1) {
        resetTimer.current = window.setTimeout(() => {
          setActiveIndex(-1);
        }, 100);
      } else {
        setActiveIndex(detail.index);
      }
    },
    enabled: !ignoreColorVisionEvents,
  });

  return (
    <div
      className={styles.Container}
      style={{
        background: color
          ? color
          : changeColorOpacity(
              selectedTheme.tooltip.backgroundColor,
              isFirefox ? 1 : TOOLTIP_BG_OPACITY,
            ),
        maxWidth,
        minWidth,
        fontFamily: FONT_FAMILY,
      }}
    >
      {children({activeColorVisionIndex})}
    </div>
  );
}
