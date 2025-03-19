export default function Loading() {
  return (
    <svg
      className="pl"
      viewBox="0 0 160 160"
      width="160px"
      height="160px"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
    >
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" />
          <stop offset="100%" stopColor="#fff" />
        </linearGradient>
        <mask id="mask1">
          <rect x="0" y="0" width="160" height="160" fill="url(#grad)" />
        </mask>
        <mask id="mask2">
          <rect x="28" y="28" width="104" height="104" fill="url(#grad)" />
        </mask>
      </defs>
      <g>
        <g className="pl_ring-rotate">
          <circle
            className="p1_ring-stroke"
            cx="80"
            cy="80"
            r="72"
            strokeWidth="4"
            fill="none"
          />
        </g>
        <g mask="url(#mask1)">
          <g className="pl_ring-rotate">
            <circle
              className="p1_ring-stroke"
              cx="80"
              cy="80"
              r="72"
              strokeWidth="4"
              fill="none"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
