import styles from './Tooltip.scss';

interface TooltipProps {
  groupName: string;
  groupDescription: string;
  groupGoal: string;
}

export function Tooltip({
  groupName,
  groupDescription,
  groupGoal,
}: TooltipProps) {
  return (
    <div className={styles.Tooltip} data-testid="tooltip">
      <div className={styles.TooltipTitle}>{groupName}</div>
      <div className={styles.TooltipDescription}>{groupDescription}</div>
      {groupGoal && (
        <div className={styles.TooltipGoal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            style={{height: '13px', width: '20px'}}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
          <p className={styles.GroupGoal}>{groupGoal}</p>
        </div>
      )}
    </div>
  );
}
