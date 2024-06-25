import type { SVGProps } from 'react';

export function CiCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0"
      ></path>
    </svg>
  );
}
