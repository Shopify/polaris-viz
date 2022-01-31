import {AccessibilityInfo} from 'react-native';

export function usePrefersReducedMotion({native} = {native: false}) {
  if (native) {
    AccessibilityInfo.isReduceMotionEnabled()
      .then((result) => {
        return {
          prefersReducedMotion: result,
        };
      })
      .catch((error) => {
        return {prefersReducedMotion: error};
      });
  }
  const prefersReducedMotion =
    typeof window === 'undefined'
      ? false
      : window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return {prefersReducedMotion};
}
