import type {Color} from '@shopify/polaris-viz-core';
import {
  isGradientType,
  LinearGradientWithStops,
  changeGradientOpacity,
  uniqueId,
} from '@shopify/polaris-viz-core';
import {useMemo} from 'react';

import styles from './SeriesIcon.scss';

export function SeriesIcon({color}: {color: Color}) {
  const id = useMemo(() => uniqueId('SeriesIcon'), []);

  return (
    <div className={styles.IconContainer}>
      <svg
        width="19"
        height="4"
        viewBox="0 0 19 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 2C8 0.89543 8.89543 0 10 0C11.1046 0 12 0.89543 12 2C12 3.10457 11.1046 4 10 4C8.89543 4 8 3.10457 8 2ZM7.17071 1C7.06015 1.31278 7 1.64936 7 2C7 2.35064 7.06015 2.68722 7.17071 3H1C0.447715 3 0 2.55228 0 2C0 1.44772 0.447715 1 1 1H7.17071ZM13 2C13 2.55228 13.4477 3 14 3H14.4C14.9523 3 15.4 2.55228 15.4 2C15.4 1.44772 14.9523 1 14.4 1H14C13.4477 1 13 1.44772 13 2ZM17.6 1C17.0477 1 16.6 1.44772 16.6 2C16.6 2.55228 17.0477 3 17.6 3H18C18.5523 3 19 2.55228 19 2C19 1.44772 18.5523 1 18 1H17.6Z"
          fill={`url(#${id})`}
        />
        {isGradientType(color) ? (
          <defs>
            <LinearGradientWithStops
              id={id}
              gradient={changeGradientOpacity(color)}
              gradientUnits="userSpaceOnUse"
              y1="100%"
              y2="0%"
            />
          </defs>
        ) : null}
      </svg>
    </div>
  );
}
