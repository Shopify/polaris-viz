import type {CSSProperties, ReactNode} from 'react';

export type PropCombinations<T> = {[P in keyof T]: any} & {
  children?: ReactNode[];
};

export type UserOptions = Partial<{
  style: CSSProperties;
}>;
