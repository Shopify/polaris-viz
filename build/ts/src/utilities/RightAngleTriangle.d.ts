interface Dimensions {
    sideA: number;
    sideB: number;
    sideC: number;
}
declare type AtLeastOneValue<T, U = {
    [K in keyof T]: Pick<T, K>;
}> = Partial<T> & U[keyof U];
export declare class RightAngleTriangle {
    dimensions: AtLeastOneValue<Dimensions>;
    constructor(dimensions: AtLeastOneValue<Dimensions>);
    getAdjacentLength(): number;
    getOppositeLength(): number;
    getHypotenuseLength(): number;
}
export {};
//# sourceMappingURL=RightAngleTriangle.d.ts.map