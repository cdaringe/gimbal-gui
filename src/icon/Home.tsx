import { HTMLProps } from "react";

export const Home = (props: HTMLProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      viewBox="0 0 1920 1920"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M960.16 0 28 932.16l79 78.777 853.16-853.16 853.16 853.16 78.889-78.777zm613.693 1027.34v781.078h-334.86v-557.913h-557.8v557.912H346.445V1027.34H234.751V1920h1450.684v-892.66zm-446.33 334.748v446.441H792.775v-446.441zM960.127 692.604c61.593 0 111.582 49.989 111.582 111.582 0 61.594-49.989 111.583-111.582 111.583-61.594 0-111.583-49.99-111.583-111.583s49.99-111.582 111.583-111.582m223.165 111.582c0-123.075-100.09-223.165-223.165-223.165-123.076 0-223.165 100.09-223.165 223.165 0 123.076 100.09 223.165 223.165 223.165s223.165-100.09 223.165-223.165"
      />
    </svg>
  );
};