import type { SVGProps } from 'react';

export function CarbonCircleFilled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      fill="currentColor"
      {...props}
    >
      <circle cx={16} cy={16} r={10}></circle>
      <path d="M16 30a14 14 0 1 1 14-14a14.016 14.016 0 0 1-14 14m0-26a12 12 0 1 0 12 12A12.014 12.014 0 0 0 16 4"></path>
    </svg>
  );
}
