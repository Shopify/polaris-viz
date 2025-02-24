import type React from 'react';
import type {Position} from '@shopify/polaris-viz-core';

export function eventPoint(
  event: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>,
) {
  const svgNode = event.currentTarget;

  if (svgNode == null) {
    return;
  }

  const screenCTM = svgNode.getScreenCTM();

  if (screenCTM == null) {
    return;
  }

  const point = svgNode.createSVGPoint();
  if (isMouseEvent(event)) {
    point.x = event.clientX;
    point.y = event.clientY;
  } else if (isTouchEvent(event)) {
    const touch = event.changedTouches[0];
    point.x = touch.clientX;
    point.y = touch.clientY;
  }

  const transformedSVGPoint = point.matrixTransform(screenCTM.inverse());

  return {
    clientX: point.x,
    clientY: point.y,
    svgX: transformedSVGPoint.x,
    svgY: transformedSVGPoint.y,
  };
}

export function eventPointNative(event: MouseEvent | TouchEvent) {
  const svgNode = getSVGNodeFromTarget(event);

  if (svgNode == null) {
    return;
  }

  const screenCTM = svgNode.getScreenCTM();

  if (screenCTM == null) {
    return;
  }

  const point = svgNode.createSVGPoint();
  const {x, y} = getXYFromEventType(event);

  point.x = x;
  point.y = y;

  const transformedSVGPoint = point.matrixTransform(screenCTM.inverse());

  return {
    svgX: transformedSVGPoint.x,
    svgY: transformedSVGPoint.y,
  };

  function getSVGNodeFromTarget(event: MouseEvent | TouchEvent) {
    if (event.currentTarget == null) {
      return (event.target as SVGElement)?.closest('svg');
    }

    return event.currentTarget as SVGSVGElement;
  }
}

export function getXYFromEventType(event: MouseEvent | TouchEvent): Position {
  return 'touches' in event
    ? {x: event.touches[0].pageX, y: event.touches[0].pageY}
    : {x: event.pageX, y: event.pageY};
}

export function getTargetFromEventType(
  event: MouseEvent | TouchEvent,
): HTMLElement | SVGSVGElement | null {
  if ('touches' in event) {
    const touch = event.touches[0];
    return document.elementFromPoint(touch.clientX, touch.clientY) as
      | HTMLElement
      | SVGSVGElement
      | null;
  }

  return event.target as HTMLElement | SVGSVGElement;
}

export function isMouseEvent(
  event: React.SyntheticEvent,
): event is React.MouseEvent {
  return event.nativeEvent instanceof MouseEvent;
}

export function isTouchEvent(
  event: React.SyntheticEvent,
): event is React.TouchEvent {
  return (
    typeof TouchEvent !== 'undefined' && event.nativeEvent instanceof TouchEvent
  );
}
