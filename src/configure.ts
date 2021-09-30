export interface PolarisViz {
  VERSION: string;
}

declare global {
  interface Window {
    PolarisViz: PolarisViz;
  }
}

if (typeof window !== 'undefined') {
  window.PolarisViz = window.PolarisViz || {};
  window.PolarisViz.VERSION = '{{POLARIS_VIZ_VERSION}}';
}

export const polarisVizVersion = '{{POLARIS_VIZ_VERSION}}';
