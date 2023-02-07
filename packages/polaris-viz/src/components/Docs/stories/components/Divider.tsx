import { Fragment } from 'react';

export function Divider({noLine}: {noLine?: string}) {
  return (
    <Fragment>
      <hr
        style={{
          margin: '32px 0',
          borderBottom: '0px',
          border: noLine ? '0' : 'undefined',
        }}
      />
    </Fragment>
  );
}
