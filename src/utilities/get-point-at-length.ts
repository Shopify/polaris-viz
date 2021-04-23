export function getPointAtLength(
  element: SVGPathElement | null,
  length: number | null,
) {
  if (element == null || length == null) {
    return 0;
  }
  return element.getPointAtLength(length);
}
