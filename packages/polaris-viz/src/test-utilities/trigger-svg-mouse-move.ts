import type {Root} from '@shopify/react-testing';

export function triggerSVGMouseMove(chart: Root<any>) {
  const svg = chart.find('svg')!;

  chart.act(() => {
    svg.domNode?.dispatchEvent(new MouseEvent('mousemove'));
  });
}
