import React from 'react';

import {NormalizedStackedBar} from '../src';

export function Playground() {
  return (
    <div style={{height: '500px'}}>
      <NormalizedStackedBar
        data={[
          {
            label: 'Google',
            value: 100,
            formattedValue: '$100',
          },
          {
            label: 'Direct',
            value: 500,
            formattedValue: '$500',
          },
          {label: 'Facebook', value: 100, formattedValue: '$100'},
          {label: 'Twitter', value: 100, formattedValue: '$100'},
        ]}
      />
    </div>
  );
}
