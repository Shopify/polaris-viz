export function getPointAtLength(
  element: SVGPathElement | null,
  length: number | null,
) {
  if (element == null || length == null) {
    return {x: 0, y: 0};
  }
  return element.getPointAtLength(length);
}
