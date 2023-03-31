import styles from './Styles.scss';

export function TrendIndicator() {
  return (
    <div className={styles.Container}>
      <div className={styles.Mask}>
        <div className={styles.Content}>
          <div className={styles.Icon}>
            <Icon />
          </div>
          <button
            className={styles.Button}
            onClick={() => {
              console.log('click');
            }}
          >
            View report
          </button>
        </div>
      </div>
      <div className={styles.Shadow} />
    </div>
  );
}

function Icon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.5 0C0.671573 0 0 0.671573 0 1.5V12.5C0 13.3284 0.671573 14 1.5 14H12.5C13.3284 14 14 13.3284 14 12.5V1.5C14 0.671573 13.3284 0 12.5 0H1.5ZM12 12H10V6H12V12ZM6 12H8V3H6V12ZM4 12H2V9H4V12Z"
        fill="currentColor"
      />
    </svg>
  );
}
