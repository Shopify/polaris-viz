import {Fragment, FC} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import objectHash from 'object-hash';

import type {PropCombinations, UserOptions} from '../types';
import {getCombinations} from '../utilities/getCombinations';
import {CombinationRenderer} from '../components/CombinationRenderer';

export function addWithPropsCombinations<T>(
  component: FC,
  possibleValuesByPropName: PropCombinations<T>,
  userOptions: UserOptions = {},
) {
  return function AddWithPropsCombinations() {
    const propsCombinations = getCombinations(possibleValuesByPropName);

    return (
      <Fragment>
        {propsCombinations.map((props, index) => (
          <CombinationRenderer
            Component={component}
            props={props}
            options={userOptions}
            key={`${index}:${objectHash(props)}`}
          />
        ))}
      </Fragment>
    );
  };
}
