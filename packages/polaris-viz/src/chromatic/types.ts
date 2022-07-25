import type {CSSProperties} from 'react';

export type PropCombinations<T> = {[P in keyof T]: T[P][]};

export type UserOptions = Partial<{
  style: CSSProperties;
}>;
