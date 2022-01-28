import {AccessibilityInfo} from 'react-native';

export function usePrefersReducedMotion({native = false}) {
  if (native) {
    return {prefersReducedMotion: AccessibilityInfo.isReduceMotionEnabled()};
  }
  const prefersReducedMotion =
    typeof window === 'undefined'
      ? false
      : window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return {prefersReducedMotion};
}
