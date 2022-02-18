export function usePrefersReducedMotion({native} = {native: false}) {
  if (native) {
    return {prefersReducedMotion: false};
  }

  const prefersReducedMotion =
    typeof window.matchMedia !== 'function'
      ? false
      : window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return {prefersReducedMotion};
}
