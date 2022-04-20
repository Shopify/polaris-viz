import type React from 'react';

import {isMouseEvent} from './isMouseEvent';
import {isTouchEvent} from './isTouchEvent';

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
  const svgNode = event.currentTarget as SVGSVGElement;

  if (svgNode == null) {
    return;
  }

  const screenCTM = svgNode.getScreenCTM();

  if (screenCTM == null) {
    return;
  }

  const point = svgNode.createSVGPoint();
  if (event instanceof MouseEvent) {
    point.x = event.clientX;
    point.y = event.clientY;
  } else if (event instanceof TouchEvent) {
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
