import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {ReactNode} from 'react';
import {createPortal} from 'react-dom';
import {changeColorOpacity, useTheme} from '@shopify/polaris-viz-core';

import type {LegendData} from '../../../types';
import {TOOLTIP_BG_OPACITY} from '../../../constants';
import {useBrowserCheck} from '../../../hooks/useBrowserCheck';
import {useRootContainer} from '../../../hooks/useRootContainer';
import {TOOLTIP_MARGIN} from '../../TooltipWrapper';
import {Legend} from '../../Legend';

import style from './HiddenLegendTooltip.scss';

interface Props {
  activeIndex: number;
  colorVisionType: string;
  data: LegendData[];
  label: ReactNode;
  setActivatorWidth: (width: number) => void;
  theme?: string;
  lastVisibleIndex?: number;
}

export const HIDDEN_LEGEND_TOOLTIP_ID = 'hidden-legend-toolip';

export function HiddenLegendTooltip({
  activeIndex,
  colorVisionType,
  data,
  theme,
  label,
  lastVisibleIndex = 0,
  setActivatorWidth,
}: Props) {
  const selectedTheme = useTheme();
  const {isFirefox} = useBrowserCheck();
  const container = useRootContainer(HIDDEN_LEGEND_TOOLTIP_ID);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const activatorRef = useRef<HTMLButtonElement>(null);

  const defaultPosition = useMemo(
    () => ({
      top: 0,
      left: 0,
    }),
    [],
  );

  const [position, setPosition] =
    useState<{top: number; left: number}>(defaultPosition);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (activatorRef.current == null) {
      return;
    }
    const activator = activatorRef.current.getBoundingClientRect();
    setActivatorWidth(activator.width);
  }, [setActivatorWidth]);

  const getTooltipPosition = useCallback(() => {
    if (tooltipRef.current == null || activatorRef.current == null) {
      return;
    }

    setActive(true);

    const activator = activatorRef.current.getBoundingClientRect();
    const tooltip = tooltipRef.current.getBoundingClientRect();

    const xPosition = activator.x + window.scrollX;
    const yPosition = activator.y + window.scrollY + activator.height;

    function getXPosition() {
      const goesPastRightOfWindow =
        xPosition + tooltip.width + TOOLTIP_MARGIN > window.innerWidth;

      if (goesPastRightOfWindow) {
        return xPosition - tooltip.width + activator.width;
      }
      return xPosition;
    }

    function getYPosition() {
      const goesPastBottomOfWindow =
        yPosition + tooltip.height + TOOLTIP_MARGIN >=
        window.innerHeight + window.scrollY;
      if (goesPastBottomOfWindow) {
        return yPosition - tooltip.height - activator.height;
      }

      return yPosition;
    }

    setPosition({
      top: getYPosition(),
      left: getXPosition(),
    });
  }, [setPosition]);

  const handleMouseLeave = useCallback(() => {
    setActive(false);
    setPosition(defaultPosition);
  }, [setActive, setPosition, defaultPosition]);

  return (
    <Fragment>
      <button
        className={style.MoreText}
        ref={activatorRef}
        onMouseEnter={getTooltipPosition}
        onMouseLeave={handleMouseLeave}
        onFocus={getTooltipPosition}
        onBlur={handleMouseLeave}
      >
        {label}
      </button>

      {createPortal(
        <div
          className={style.Tooltip}
          ref={tooltipRef}
          style={{
            visibility: active ? 'visible' : 'hidden',
            zIndex: active ? 1 : -100000,
            background: changeColorOpacity(
              selectedTheme.tooltip.backgroundColor,
              isFirefox ? 1 : TOOLTIP_BG_OPACITY,
            ),
            ...position,
          }}
        >
          <Legend
            activeIndex={activeIndex}
            colorVisionType={colorVisionType}
            data={data}
            theme={theme}
            indexOffset={lastVisibleIndex}
            backgroundColor="transparent"
          />
        </div>,
        container,
      )}
    </Fragment>
  );
}
