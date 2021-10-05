import React, {ReactChildren} from 'react';

import styles from './PropertyTable.scss';

export function PropertyTable({
  children,
  global = false,
}: {
  children: ReactChildren;
  global: boolean;
}) {
  return (
    <table className={styles.PropertyTable} style={{width: '100%'}}>
      <colgroup>
        <col span={1} style={{width: '1%'}} />
        <col span={1} style={{width: '1%'}} />
        <col span={1} style={{width: '50%'}} />
        <col span={1} style={{width: '1%'}} />
      </colgroup>

      <thead>
        <tr>
          <th>property</th>
          <th>type</th>
          <th>description</th>
          {!global && <th>components affected</th>}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

// eslint-disable-next-line react/display-name
PropertyTable.Row = ({
  property,
  type,
  description,
  chartsAffected,
}: {
  property: string;
  type: string | string[];
  description: string;
  chartsAffected?: string[];
}) => {
  return (
    <tr>
      <td>
        <code>{property}</code>
      </td>
      <td>
        {Array.isArray(type) ? (
          <div className={styles.typeArray}>
            {type.map((i, index) => {
              return (
                <span key={`${i}${index}`}>
                  <code>{i}</code>
                  {index === type.length - 1 ? null : (
                    // eslint-disable-next-line @shopify/jsx-no-hardcoded-content
                    <React.Fragment>{'|\n'}</React.Fragment>
                  )}
                </span>
              );
            })}
          </div>
        ) : (
          <code>{type}</code>
        )}
      </td>
      <td>{description}</td>
      {chartsAffected && (
        <td>
          {chartsAffected.map((chart, index) => (
            <code key={`${chart}${index}`}>{chart}</code>
          ))}
        </td>
      )}
    </tr>
  );
};
