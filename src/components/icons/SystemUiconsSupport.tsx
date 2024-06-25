import type { SVGProps } from 'react';

export function SystemUiconsSupport(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 21 21"
      fill="currentColor"
      {...props}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx={10.5} cy={10.5} r={8}></circle>
        <circle cx={10.5} cy={10.5} r={4}></circle>
        <path d="M13.5 7.5L16 5m-2.5 8.5L16 16m-8.5-2.5L5 16m2.5-8.5L5 5"></path>
      </g>
    </svg>
  );
}
