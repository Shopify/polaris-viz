import React, {
  useEffect,
  useRef,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import type {DataType, Dimensions} from '@shopify/polaris-viz-core';

import type {Margin} from '../../types';

import type {TooltipPosition, TooltipPositionParams} from './types';
import {DEFAULT_TOOLTIP_POSITION} from './constants';
import {TooltipAnimatedContainer} from './components/TooltipAnimatedContainer';
import type {AlteredPosition} from './utilities';

interface TooltipWrapperProps {
  chartDimensions: Dimensions;
  getMarkup: (index: number) => ReactNode;
  getPosition: (data: TooltipPositionParams) => TooltipPosition;
  margin: Margin;
  parentRef: SVGSVGElement | null;
  focusElementDataType: DataType;
  bandwidth?: number;
  getAlteredPosition?: AlteredPosition;
  id?: string;
  onIndexChange?: (index: number | null) => void;
}

export function TooltipWrapper(props: TooltipWrapperProps) {
  const {
    bandwidth = 0,
    focusElementDataType,
    getAlteredPosition,
    getPosition,
    id,
    onIndexChange,
    parentRef,
  } = props;
  const [position, setPosition] = useState<TooltipPosition>({
    x: 0,
    y: 0,
    activeIndex: -1,
    position: DEFAULT_TOOLTIP_POSITION,
  });

  const activeIndexRef = useRef<number | null>(null);
  const focusElements = useMemo<NodeListOf<SVGPathElement> | undefined>(() => {
    return parentRef?.querySelectorAll(
      `[data-type="${focusElementDataType}"][aria-hidden="false"]`,
    );
  }, [focusElementDataType, parentRef]);

  useEffect(() => {
    activeIndexRef.current = position.activeIndex;
  }, [position.activeIndex]);

  const onMouseMove = useCallback(
    (event: MouseEvent | TouchEvent) => {
      const newPosition = getPosition({event, eventType: 'mouse'});

      if (activeIndexRef.current === newPosition.activeIndex) {
        return;
      }

      setPosition(newPosition);
      onIndexChange?.(newPosition.activeIndex);
    },
    [getPosition, onIndexChange],
  );

  const onMouseLeave = useCallback(() => {
    onIndexChange?.(null);
    setPosition((prevState) => {
      return {...prevState, activeIndex: -1};
    });
  }, [onIndexChange]);

  const onFocus = useCallback(
    (event: FocusEvent) => {
      const target = event.currentTarget as SVGSVGElement;

      if (!target) {
        return;
      }

      const index = Number(target.dataset.index);
      const newPosition = getPosition({index, eventType: 'focus'});

      setPosition(newPosition);
      onIndexChange?.(newPosition.activeIndex);
    },
    [getPosition, onIndexChange],
  );

  const onFocusIn = useCallback(() => {
    if (!parentRef?.contains(document.activeElement)) {
      onMouseLeave();
    }
  }, [parentRef, onMouseLeave]);

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
    if (!parentRef) {
      return;
    }

    parentRef.addEventListener('mousemove', onMouseMove);
    parentRef.addEventListener('mouseleave', onMouseLeave);
    parentRef.addEventListener('touchmove', onMouseMove);
    parentRef.addEventListener('touchend', onMouseLeave);

    setFocusListeners(true);

    return () => {
      parentRef.removeEventListener('mousemove', onMouseMove);
      parentRef.removeEventListener('mouseleave', onMouseLeave);
      parentRef.removeEventListener('touchmove', onMouseMove);
      parentRef.removeEventListener('touchend', onMouseLeave);

      setFocusListeners(false);
    };
  }, [parentRef, onMouseMove, onMouseLeave, onFocus, setFocusListeners]);

  useEffect(() => {
    document.addEventListener('focusin', onFocusIn);

    return () => {
      document.removeEventListener('focusin', onFocusIn);
    };
  }, [parentRef, onFocusIn]);

  if (position.activeIndex == null || position.activeIndex < 0) {
    return null;
  }

  return (
    <TooltipAnimatedContainer
      activePointIndex={position.activeIndex}
      bandwidth={bandwidth}
      chartDimensions={props.chartDimensions}
      currentX={position.x}
      currentY={position.y}
      id={id}
      getAlteredPosition={getAlteredPosition}
      margin={props.margin}
      position={position.position}
    >
      {props.getMarkup(position.activeIndex)}
    </TooltipAnimatedContainer>
  );
}
