export function shouldBlockTooltipEvents(event: MouseEvent | TouchEvent) {
  return event.composedPath().some((path) => {
    const dataset = (path as HTMLElement).dataset;
    return dataset != null && dataset.blockTooltipEvents === 'true';
  });
}
