import React, {ReactChildren} from 'react';

export function ExamplesGrid({children}: {children: ReactChildren}) {
  return (
    <div
      style={{
        display: 'grid',
        gridGap: '20px',
        gridTemplateColumns: 'repeat(2, minmax(250px, 1fr))',
        gridTemplateRows: '1fr',
      }}
    >
      {children}
    </div>
  );
}
