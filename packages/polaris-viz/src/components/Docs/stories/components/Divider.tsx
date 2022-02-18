import React from 'react';

export function Divider({noLine}: {noLine?: string}) {
  return (
    <React.Fragment>
      <hr
        style={{
          margin: '32px 0',
          borderBottom: '0px',
          border: noLine ? '0' : 'undefined',
        }}
      />
    </React.Fragment>
  );
}
