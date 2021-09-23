import React from 'react';

export function ComponentContainer({
  chart,
  title,
  description,
  link,
}: {
  chart: React.Component;
  title: string;
  description: string;
  link: string;
}) {
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

      <div style={{width: '100%', height: '250px'}}>{chart}</div>
    </div>
  );
}
