import {useEffect} from 'react';

export function InteractionHandler() {
  useEffect(() => {
    const items = document.querySelectorAll('[data-interaction-watch="true"]');

    function onMouseEnter(event: MouseEvent) {
      const dataset = (event.currentTarget as HTMLElement)?.dataset;

      const id = dataset?.interactionId;
      const type = dataset?.interactionType;

      if (type == null || id == null) {
        return;
      }

      const typeItems = document.querySelectorAll(
        `[data-interaction-respond="true"][data-interaction-type="${type}"]`,
      ) as NodeListOf<HTMLElement>;

      typeItems.forEach((item) => {
        const itemId = item.dataset.interactionId;

        if (itemId === id) {
          item.style.opacity = '1';
        } else {
          item.style.opacity = '0.25';
        }
      });
    }

    function onMouseLeave(event: MouseEvent) {
      const dataset = (event.currentTarget as HTMLElement)?.dataset;

      const type = dataset?.interactionType;

      if (type == null) {
        return;
      }

      const typeItems = document.querySelectorAll(
        `[data-interaction-respond="true"][data-interaction-type="${type}"]`,
      ) as NodeListOf<HTMLElement>;

      typeItems.forEach((item) => {
        item.style.opacity = '1';
      });
    }

    items.forEach((item) => {
      (item as HTMLElement).addEventListener('mouseenter', onMouseEnter);
      (item as HTMLElement).addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      items.forEach((item) => {
        (item as HTMLElement).removeEventListener('mouseenter', onMouseEnter);
        (item as HTMLElement).removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  return null;
}
