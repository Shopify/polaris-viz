export function classNames(
  ...classes: (string | boolean | undefined | null | 0)[]
) {
  return classes.filter(Boolean).join(' ');
}
