export function getPathLength(element: SVGPathElement | null) {
  if (element == null) {
    return 0;
  }
  return element.getTotalLength();
}
