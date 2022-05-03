export function checkEventPath(
  path: EventTarget[],
  checkFunc: (path: EventTarget) => boolean,
) {
  return path.some(checkFunc);
}
