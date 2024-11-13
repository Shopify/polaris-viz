import type {ReactNode} from 'react';
import {useEffect, useRef, useState, useMemo, useCallback} from 'react';
import {InternalChartType, useChartContext} from '@shopify/polaris-viz-core';
import type {
  DataType,
  BoundingRect,
  DataSeries,
  ChartType,
} from '@shopify/polaris-viz-core';
import {createPortal} from 'react-dom';
import type {ScaleBand, ScaleLinear} from 'd3-scale';

import {useRootContainer} from '../../hooks/useRootContainer';
import type {Margin} from '../../types';
import {SwallowErrors} from '../SwallowErrors';

import {getHorizontalBarChartTooltipPosition} from './utilities/getHorizontalBarChartTooltipPosition';
import {getLineChartTooltipPosition} from './utilities/getLineChartTooltipPosition';
import {getVerticalBarChartTooltipPosition} from './utilities/getVerticalBarChartTooltipPosition';
import {shouldBlockTooltipEvents} from './utilities/shouldBlockTooltipEvents';
import type {TooltipPosition} from './types';
import {DEFAULT_TOOLTIP_POSITION} from './constants';
import {TooltipAnimatedContainer} from './components/TooltipAnimatedContainer';

const TOOLTIP_ID = 'polaris_viz_tooltip_root';

const TOUCH_START_DELAY = 300;

interface BaseProps {
  chartBounds: Required<BoundingRect>;
  chartType: InternalChartType;
  data: DataSeries[];
  focusElementDataType: DataType;
  getMarkup: (index: number) => ReactNode;
  longestSeriesIndex: number;
  margin: Margin;
  parentRef: SVGSVGElement | null;
  xScale: ScaleLinear<number, number> | ScaleBand<string>;
  bandwidth?: number;
  onIndexChange?: (index: number | null) => void;
  id?: string;
  type?: ChartType;
  yScale?: ScaleLinear<number, number>;
}

function TooltipWrapperRaw(props: BaseProps) {
  const {
    bandwidth = 0,
    chartBounds,
    chartType,
    data,
    focusElementDataType,
    id,
    longestSeriesIndex,
    onIndexChange,
    parentRef,
    type,
    xScale,
    yScale,
  } = props;
  const {scrollContainer} = useChartContext();
  const [position, setPosition] = useState<TooltipPosition>({
    x: 0,
    y: 0,
    activeIndex: -1,
    position: DEFAULT_TOOLTIP_POSITION,
  });

  const activeIndexRef = useRef<number | null>(null);
  const touchStartTimer = useRef<number>(0);
  const isLongTouch = useRef(false);

  const focusElements = useMemo<NodeListOf<SVGPathElement> | undefined>(() => {
    return parentRef?.querySelectorAll(
      `[data-type="${focusElementDataType}"][aria-hidden="false"]`,
    );
  }, [focusElementDataType, parentRef]);

  useEffect(() => {
    activeIndexRef.current = position.activeIndex;
  }, [position.activeIndex]);

  const alwaysUpdatePosition = chartType === InternalChartType.Line;

  const getPosition = useCallback(
    ({
      event,
      eventType,
      index,
    }: {
      eventType: 'mouse' | 'focus';
      event?: MouseEvent | TouchEvent;
      index?: number;
    }) => {
      switch (chartType) {
        case InternalChartType.Line:
          return getLineChartTooltipPosition({
            chartBounds,
            data,
            event,
            eventType,
            index,
            longestSeriesIndex,
            xScale: xScale as ScaleLinear<number, number>,
          });
        case InternalChartType.HorizontalBar:
          return getHorizontalBarChartTooltipPosition({
            chartBounds,
            data,
            event,
            eventType,
            index,
            longestSeriesIndex,
            type,
            xScale: xScale as ScaleLinear<number, number>,
          });
        case InternalChartType.Bar:
        default:
          return getVerticalBarChartTooltipPosition({
            chartBounds,
            data,
            event,
            eventType,
            index,
            longestSeriesIndex,
            type,
            xScale: xScale as ScaleBand<string>,
            yScale: yScale as ScaleLinear<number, number>,
          });
      }
    },
    [chartBounds, data, longestSeriesIndex, xScale, chartType, yScale, type],
  );

  const showAndPositionTooltip = useCallback(
    (event: MouseEvent | TouchEvent) => {
      const newPosition = getPosition({event, eventType: 'mouse'});

      const scrollContainerTop = Number(scrollContainer?.scrollTop ?? 0);
      const y = newPosition.y + scrollContainerTop;

      if (
        alwaysUpdatePosition &&
        (newPosition.x < chartBounds.x || y < chartBounds.y)
      ) {
        return;
      }

      if (
        !alwaysUpdatePosition &&
        activeIndexRef.current === newPosition.activeIndex
      ) {
        return;
      }

      if (shouldBlockTooltipEvents(event)) {
        return;
      }

      setPosition(newPosition);
      onIndexChange?.(newPosition.activeIndex);
    },
    [
      alwaysUpdatePosition,
      chartBounds,
      getPosition,
      onIndexChange,
      scrollContainer,
    ],
  );

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

  const onMouseMove = useCallback(
    (event: MouseEvent | TouchEvent) => {
      window.clearTimeout(touchStartTimer.current);

      if (event instanceof TouchEvent) {
        if (isLongTouch.current === true) {
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
    parentRef.addEventListener('touchstart', onTouchStart);
    parentRef.addEventListener('touchmove', onMouseMove);
    parentRef.addEventListener('touchend', onMouseLeave);

    setFocusListeners(true);

    return () => {
      parentRef.removeEventListener('mousemove', onMouseMove);
      parentRef.removeEventListener('mouseleave', onMouseLeave);
      parentRef.removeEventListener('touchstart', onTouchStart);
      parentRef.removeEventListener('touchmove', onMouseMove);
      parentRef.removeEventListener('touchend', onMouseLeave);

      setFocusListeners(false);
    };
  }, [
    parentRef,
    onMouseMove,
    onMouseLeave,
    onFocus,
    setFocusListeners,
    onTouchStart,
  ]);

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
      chartBounds={chartBounds}
      chartType={chartType}
      currentX={position.x}
      currentY={position.y}
      id={id}
      margin={props.margin}
      position={position.position}
    >
      {props.getMarkup(position.activeIndex)}
    </TooltipAnimatedContainer>
  );
}

interface TooltipWrapperProps extends BaseProps {
  usePortal?: boolean;
}

export function TooltipWrapper({
  usePortal = false,
  ...props
}: TooltipWrapperProps) {
  if (usePortal) {
    return <TooltipWithPortal {...props} />;
  }

  return <TooltipWithErrors {...props} />;
}

function TooltipWithErrors(props: BaseProps) {
  return (
    <SwallowErrors>
      <TooltipWrapperRaw {...props} />
    </SwallowErrors>
  );
}

function TooltipWithPortal(props: BaseProps) {
  const container = useRootContainer(TOOLTIP_ID);

  return createPortal(<TooltipWithErrors {...props} />, container);
}
