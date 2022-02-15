export function usePrefersReducedMotion() {
  const prefersReducedMotion =
    typeof window.matchMedia !== 'function'
      ? false
      : window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return {prefersReducedMotion};
}
