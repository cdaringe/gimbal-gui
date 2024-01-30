import { HTMLProps } from "react";
import "./assets/led.css";

type LedProps = HTMLProps<HTMLDivElement> & {
  ledColor: "red" | "green";
};

export const LED = ({ ledColor, className = "", ...rest }: LedProps) => {
  return (
    <div className={`led-box ${className}`} {...rest}>
      <div className={ledColor === "red" ? "led-red" : "led-green"}></div>
    </div>
  );
};
