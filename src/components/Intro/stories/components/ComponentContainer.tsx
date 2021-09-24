import React from 'react';

export function ComponentContainer({
  chart,
  title,
  description,
  link,
  center,
}: {
  chart: React.Component;
  title: string;
  description: string;
  link: string;
  center?: boolean;
}) {
  const centerStyles = {
    width: '100%',
    height: '250px',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    display: 'grid',
    alignContent: 'center',
    justifyContent: 'center',
  };

  const styles = {
    width: '100%',
    height: '250px',
  };

  return (
    <div
      style={{
        background: 'rgb(31, 31, 37)',
        borderRadius: '8px',
        paddingBottom: '10px',
      }}
    >
      <div
        style={{
          background: '#444',
          borderRadius: '8px 8px 0 0',
          padding: '20px',
        }}
      >
        <h3 style={{marginTop: 0}}>{title}</h3>
        <p style={{margin: 0}}>
          {description}
          <a style={{color: 'white', textDecoration: 'none'}} href={link}>
            View documentation →
          </a>
        </p>
      </div>

      <div style={center ? {...centerStyles} : {...styles}}>{chart}</div>
    </div>
  );
}
