import React, {FC, ReactNode} from 'react';
import objectHash from 'object-hash';

import type {UserOptions} from '../types';
import {getCombinations} from '../utilities/getCombinations';
import {CombinationRenderer} from '../components/CombinationRenderer';

export type PropCombinations<T> = {[P in keyof T]: any} & {
  children?: ReactNode[];
};

export function addWithPropsCombinations<T>(
  component: FC<T>,
  possibleValuesByPropName: PropCombinations<T>,
  userOptions: UserOptions = {},
) {
  return function AddWithPropsCombinations() {
    const propsCombinations = getCombinations(possibleValuesByPropName);

    return (
      <React.Fragment>
        {propsCombinations.map((props, index) => (
          <CombinationRenderer
            Component={component}
            props={props}
            options={userOptions}
            key={`${index}:${objectHash(props)}`}
          />
        ))}
      </React.Fragment>
    );
  };
}
