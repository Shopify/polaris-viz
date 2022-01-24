import { ResizeObserverEntry } from '@juggle/resize-observer';
export declare const useResizeObserver: <T extends HTMLElement>() => {
    ref: T | null;
    setRef: (node: T | null) => void;
    entry: ResizeObserverEntry | null;
};
//# sourceMappingURL=useResizeObserver.d.ts.map