import React, {ReactChildren} from 'react';

export function ExamplesGrid({children}: {children: ReactChildren}) {
  return (
    <div
      style={{
        display: 'grid',
        gridGap: '20px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      }}
    >
      {children}
    </div>
  );
}
