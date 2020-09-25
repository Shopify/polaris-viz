export function usePrefersReducedMotion() {
  const prefersReducedMotion =
    typeof window === 'undefined'
      ? false
      : window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return {prefersReducedMotion};
}
