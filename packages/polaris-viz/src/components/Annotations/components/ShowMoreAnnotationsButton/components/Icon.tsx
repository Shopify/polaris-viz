interface Props {
  fill: string;
  isShowingAllAnnotations: boolean;
}

export function Icon({fill, isShowingAllAnnotations}: Props) {
  return (
    <g transform="translate(7,6)">
      {isShowingAllAnnotations ? (
        <path
          d="M9 2C9.55228 2 10 1.55228 10 1C10 0.447715 9.55228 0 9 0L1 0C0.447715 0 0 0.447715 0 1C0 1.55228 0.447715 2 1 2L9 2Z"
          fill={fill}
          transform={`translate(0,${4})`}
        />
      ) : (
        <path
          d="M5 0a1 1 0 0 0-1 1v3H1a1 1 0 1 0 0 2h3v3a1 1 0 1 0 2 0V6h3a1 1 0 1 0 0-2H6V1a1 1 0 0 0-1-1Z"
          fill={fill}
        />
      )}
    </g>
  );
}
