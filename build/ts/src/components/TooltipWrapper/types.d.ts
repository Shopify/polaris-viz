export declare enum TooltipHorizontalOffset {
    Left = 0,
    Right = 1,
    Center = 2
}
export declare enum TooltipVerticalOffset {
    Above = 0,
    Below = 1,
    Inline = 2,
    Center = 3
}
export interface TooltipPositionOffset {
    horizontal: TooltipHorizontalOffset;
    vertical: TooltipVerticalOffset;
}
export interface TooltipPosition {
    x: number;
    y: number;
    activeIndex: number | null;
    position?: TooltipPositionOffset;
}
export interface TooltipPositionParams {
    event?: MouseEvent | TouchEvent;
    index?: number;
    eventType?: 'mouse' | 'focus';
}
//# sourceMappingURL=types.d.ts.map