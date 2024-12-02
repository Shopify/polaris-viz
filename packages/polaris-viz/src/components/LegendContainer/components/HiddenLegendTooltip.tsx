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
import {
  changeColorOpacity,
  useChartContext,
  useTheme,
} from '@shopify/polaris-viz-core';

import {getFontSize} from '../../../utilities/getFontSize';
import type {LegendData} from '../../../types';
import {TOOLTIP_BG_OPACITY} from '../../../constants';
import {useBrowserCheck} from '../../../hooks/useBrowserCheck';
import {useRootContainer} from '../../../hooks/useRootContainer';
import {useColorVisionEvents} from '../../../hooks/ColorVisionA11y';
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

export const LEGEND_TOOLTIP_ID = 'legend-toolip';
export const LEGEND_TOOLIP_Z_INDEX = 520;

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
  const {id} = useChartContext();
  const tooltipId = `${LEGEND_TOOLTIP_ID}_${id}`;
  const container = useRootContainer(tooltipId);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const activatorRef = useRef<HTMLButtonElement>(null);
  useColorVisionEvents({
    enabled: true,
    root: LEGEND_TOOLTIP_ID,
  });

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

  const handleMouseLeave = useCallback(
    (event) => {
      if (event?.relatedTarget?.id !== tooltipId) {
        setActive(false);
        setPosition(defaultPosition);
      }
    },
    [setActive, setPosition, defaultPosition, tooltipId],
  );

  return (
    <Fragment>
      <button
        className={style.MoreText}
        ref={activatorRef}
        onMouseEnter={getTooltipPosition}
        onMouseLeave={handleMouseLeave}
        onFocus={getTooltipPosition}
        onBlur={handleMouseLeave}
        style={{
          color: selectedTheme.legend.labelColor,
          fontSize: getFontSize(),
        }}
      >
        {label}
      </button>

      {createPortal(
        <div
          className={style.Tooltip}
          ref={tooltipRef}
          onMouseLeave={handleMouseLeave}
          onBlur={handleMouseLeave}
          id={tooltipId}
          style={{
            visibility: active ? 'visible' : 'hidden',
            zIndex: active ? LEGEND_TOOLIP_Z_INDEX : -100000,
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
