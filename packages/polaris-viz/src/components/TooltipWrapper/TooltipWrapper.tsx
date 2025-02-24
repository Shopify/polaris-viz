import type {ReactNode} from 'react';
import {useEffect, useRef, useState, useMemo, useCallback} from 'react';
import type {InternalChartType} from '@shopify/polaris-viz-core';
import {useChartContext} from '@shopify/polaris-viz-core';
import {createPortal} from 'react-dom';

import {useRootContainer} from '../../hooks/useRootContainer';
import {SwallowErrors} from '../SwallowErrors';
import {TOOLTIP_ID} from '../../constants';

import {ALWAYS_UPDATE_TOOLTIP_POSITION_CHART_TYPES} from './constants';
import type {TooltipPosition} from './types';
import {TooltipAnimatedContainer} from './components/TooltipAnimatedContainer';
import {
  getTargetFromEventType,
  getXYFromEventType,
} from './utilities/eventPoint';
import {shouldBlockTooltipEvents} from './utilities/shouldBlockTooltipEvents';
import {getTooltipDataFromElement} from './utilities/getTooltipDataAttr';

const TOUCH_START_DELAY = 300;

interface BaseProps {
  chartType: InternalChartType;
  getMarkup: (index: number | null) => ReactNode;
  parentElement: SVGSVGElement | null;
  onIndexChange?: (index: number | null) => void;
  id?: string;
}

function TooltipWrapperRaw(props: BaseProps) {
  const {chartType, id, onIndexChange, parentElement} = props;
  const {containerBounds} = useChartContext();

  const defaultPosition = useMemo(
    () => ({
      x: containerBounds.x + containerBounds.width / 2,
      y: containerBounds.y + containerBounds.height / 2,
    }),
    [containerBounds],
  );

  const [position, setPosition] = useState<TooltipPosition>({
    ...defaultPosition,
    activeIndex: -1,
    seriesBounds: null,
  });

  const activeIndexRef = useRef<number | null>(null);
  const touchStartTimer = useRef<number>(0);
  const isLongTouch = useRef(false);

  const focusElements = useMemo<NodeListOf<SVGPathElement> | undefined>(() => {
    return parentElement?.querySelectorAll(`[data-tooltip]`);
  }, [parentElement]);

  useEffect(() => {
    activeIndexRef.current = position.activeIndex;
  }, [position.activeIndex]);

  const alwaysUpdatePosition =
    ALWAYS_UPDATE_TOOLTIP_POSITION_CHART_TYPES.includes(chartType);

  const getPosition = useCallback(
    (event: MouseEvent | TouchEvent) => {
      const resetPosition = {
        ...position,
        ...defaultPosition,
      };

      if (shouldBlockTooltipEvents(event)) {
        return {
          ...resetPosition,
          activeIndex: -1,
        };
      }

      if (event == null || event.target == null) {
        return resetPosition;
      }

      const target = getTargetFromEventType(event);

      if (target == null) {
        return resetPosition;
      }

      // TODO: Use the constant
      if (target.dataset.tooltipIndex == null) {
        // Keep moving the tooltip even if there's no index,
        // we will continue using the existing activeIndex
        if (alwaysUpdatePosition) {
          const {x: eventX, y: eventY} = getXYFromEventType(event);

          return {...position, x: eventX, y: eventY};
        }

        return {
          ...resetPosition,
          activeIndex: -1,
        };
      }

      const {x, y, activeIndex, seriesBounds} =
        getTooltipDataFromElement(target);

      if (alwaysUpdatePosition) {
        const {x: eventX, y: eventY} = getXYFromEventType(event);

        return {
          ...position,
          x: eventX,
          y: eventY,
          activeIndex,
        };
      }

      if (y == null || x == null) {
        return resetPosition;
      }

      return {
        x,
        y,
        activeIndex: activeIndex == null ? position.activeIndex : activeIndex,
        seriesBounds,
      };
    },
    [alwaysUpdatePosition, position, defaultPosition],
  );

  const showAndPositionTooltip = useCallback(
    (event: MouseEvent | TouchEvent) => {
      const newPosition = getPosition(event);

      if (
        !alwaysUpdatePosition &&
        activeIndexRef.current === newPosition.activeIndex
      ) {
        return;
      }

      setPosition(newPosition);

      if (newPosition.activeIndex != null) {
        onIndexChange?.(newPosition.activeIndex);
      }
    },
    [alwaysUpdatePosition, getPosition, onIndexChange],
  );

  const onMouseMove = useCallback(
    (event: MouseEvent | TouchEvent) => {
      window.clearTimeout(touchStartTimer.current);

      if (typeof TouchEvent !== 'undefined' && event instanceof TouchEvent) {
        if (isLongTouch.current === true) {
          // prevents scrolling after long touch (since it is supposed to move the tooltip/datapoint vs scroll)
          event?.preventDefault();
        } else {
          return;
        }
      }

      showAndPositionTooltip(event);
    },
    [showAndPositionTooltip],
  );

  const onMouseLeave = useCallback(() => {
    isLongTouch.current = false;
    window.clearTimeout(touchStartTimer.current);
    onIndexChange?.(null);
    setPosition((prevState) => {
      return {...prevState, ...defaultPosition, activeIndex: -1};
    });
  }, [onIndexChange, defaultPosition]);

  const onTouchStart = useCallback(
    (event: TouchEvent) => {
      touchStartTimer.current = window.setTimeout(() => {
        event.preventDefault();

        isLongTouch.current = true;

        showAndPositionTooltip(event);
      }, TOUCH_START_DELAY);
    },
    [showAndPositionTooltip],
  );

  const onFocus = useCallback(
    (event: FocusEvent) => {
      const target = event.currentTarget as SVGSVGElement;

      if (target == null) {
        return;
      }

      const {x, y, activeIndex, seriesBounds} =
        getTooltipDataFromElement(target);

      setPosition((prevState) => ({
        ...prevState,
        x: x ?? prevState.x,
        y: y ?? prevState.y,
        activeIndex,
        seriesBounds,
      }));
      onIndexChange?.(activeIndex);
    },
    [onIndexChange],
  );

  const onFocusIn = useCallback(() => {
    if (!parentElement?.contains(document.activeElement)) {
      onMouseLeave();
    }
  }, [parentElement, onMouseLeave]);

  const setFocusListeners = useCallback(
    (attach: boolean) => {
      if (!focusElements) {
        return;
      }

      focusElements.forEach((el: SVGPathElement) => {
        if (attach) {
          el.addEventListener('focus', onFocus);
        } else {
          el.removeEventListener('focus', onFocus);
        }
      });
    },
    [focusElements, onFocus],
  );

  useEffect(() => {
    if (!parentElement) {
      return;
    }

    parentElement.addEventListener('mousemove', onMouseMove);
    parentElement.addEventListener('mouseleave', onMouseLeave);
    parentElement.addEventListener('touchstart', onTouchStart);
    parentElement.addEventListener('touchmove', onMouseMove);
    parentElement.addEventListener('touchend', onMouseLeave);

    setFocusListeners(true);

    return () => {
      parentElement.removeEventListener('mousemove', onMouseMove);
      parentElement.removeEventListener('mouseleave', onMouseLeave);
      parentElement.removeEventListener('touchstart', onTouchStart);
      parentElement.removeEventListener('touchmove', onMouseMove);
      parentElement.removeEventListener('touchend', onMouseLeave);

      setFocusListeners(false);
    };
  }, [
    parentElement,
    onMouseLeave,
    onTouchStart,
    setFocusListeners,
    onMouseMove,
  ]);

  useEffect(() => {
    document.addEventListener('focusin', onFocusIn);

    return () => {
      document.removeEventListener('focusin', onFocusIn);
    };
  }, [parentElement, onFocusIn]);

  return (
    <TooltipAnimatedContainer
      activePointIndex={position.activeIndex}
      chartType={chartType}
      id={id}
      seriesBounds={position.seriesBounds}
      x={position.x}
      y={position.y}
    >
      {props.getMarkup(position.activeIndex)}
    </TooltipAnimatedContainer>
  );
}

export function TooltipWrapper(props: BaseProps) {
  const container = useRootContainer(TOOLTIP_ID);

  return createPortal(
    <SwallowErrors>
      <TooltipWrapperRaw {...props} />
    </SwallowErrors>,
    container,
  );
}
