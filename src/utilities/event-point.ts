import {MouseEvent, TouchEvent} from 'react';

import {isMouseEvent} from './is-mouse-event';
import {isTouchEvent} from './is-touch-event';

export function eventPoint(
  event: MouseEvent<SVGSVGElement> | TouchEvent<SVGSVGElement>,
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
