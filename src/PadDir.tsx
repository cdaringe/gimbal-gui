import { HTMLProps } from "react";

export const PadDir = (props: HTMLProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      viewBox="0 0 97.359 115.608"
      {...props}
    >
      <defs>
        <linearGradient id="pad_dir_g1">
          <stop offset="0%" stopColor="#343e2c" />
          <stop offset="100%" stopColor="#436428" />
        </linearGradient>
        <linearGradient
          xlinkHref="#pad_dir_g1"
          id="pad_dir_g2"
          x1="52.628"
          x2="149.987"
          y1="104.322"
          y2="104.322"
          gradientTransform="translate(-52.628 -46.519)"
        />
      </defs>
      <path
        d="M44.71 115.115c-3.206-1.037-3.189-1.021-23.039-20.892C5.325 77.86 2.344 74.761 1.636 73.388-.05 70.126.004 71.205 0 40.287-.003 20.78.086 11.759.29 10.786c.771-3.701 3.92-7.771 7.205-9.313C10.728-.047 9.429 0 48.679 0s37.952-.046 41.186 1.473c3.285 1.542 6.434 5.612 7.205 9.313.203.973.292 9.995.289 29.5-.004 30.923.049 29.843-1.637 33.102-.707 1.367-3.679 4.466-19.507 20.347-11.893 11.932-19.248 19.115-20.26 19.783-.873.578-2.344 1.285-3.268 1.573-2.184.68-5.915.69-7.976.024"
        style={{ fill: "url(#pad_dir_g1)" }}
      />
    </svg>
  );
};
