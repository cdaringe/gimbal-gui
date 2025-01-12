import { HTMLProps } from "react";

export const RestartIcon = (props: HTMLProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke="#1C274C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m15.978 8.715-.442-.453a4.92 4.92 0 0 0-7.072 0c-1.952 1.999-1.952 5.24 0 7.239a4.92 4.92 0 0 0 7.072 0 5.18 5.18 0 0 0 1.425-4.259m-.983-2.527h-2.652m2.651 0V6"
      />
      <path
        stroke="#1C274C"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536"
      />
    </svg>
  );
};
