import {AccessibilityInfo} from 'react-native';

export function usePrefersReducedMotion() {
  AccessibilityInfo.isReduceMotionEnabled()
    .then((result) => {
      return {
        prefersReducedMotion: result,
      };
    })
    .catch((error) => {
      return {prefersReducedMotion: error};
    });

  const prefersReducedMotion =
    typeof window.matchMedia !== 'function'
      ? false
      : window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return {prefersReducedMotion};
}
