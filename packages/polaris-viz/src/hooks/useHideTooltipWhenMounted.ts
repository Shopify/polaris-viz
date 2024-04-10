import {useEffect} from 'react';

export function useHideTooltipWhenMounted() {
  useEffect(() => {
    const tooltip = document.querySelector<HTMLElement>('[data-tooltip]');

    if (tooltip) {
      tooltip.style.display = 'none';
    }

    return () => {
      if (tooltip) {
        tooltip.style.display = 'block';
      }
    };
  }, []);
}
