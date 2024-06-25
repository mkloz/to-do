import { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="3rem"
      viewBox="0 0 55.000000 47.000000"
      preserveAspectRatio="xMidYMid meet"
      fill="currentColor"
      {...props}
    >
      <g
        transform="translate(0.000000,47.000000) scale(0.100000,-0.100000)"
        stroke="none"
      >
        <path
          d="M168 326 c-5 -22 -1 -25 31 -28 31 -3 36 -7 39 -30 3 -24 8 -28 33
-28 27 0 29 -3 29 -35 0 -32 -2 -35 -30 -35 -27 0 -30 -3 -30 -30 0 -27 3 -30
30 -30 27 0 30 3 30 30 0 27 3 30 30 30 28 0 30 3 30 35 0 32 -2 35 -31 35
-27 0 -30 3 -27 28 2 22 8 28 36 30 26 3 32 7 32 28 0 24 -1 24 -99 24 -97 0
-99 0 -103 -24z"
        />
      </g>
    </svg>
  );
}
