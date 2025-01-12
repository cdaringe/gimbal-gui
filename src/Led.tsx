import { HTMLProps } from "react";
import "./assets/led.css";

type LedProps = HTMLProps<HTMLDivElement> & {
  ledColor: "red" | "yellow" | "green";
};

export const LED = ({ ledColor, className = "", ...rest }: LedProps) => {
  return (
    <div className={`led-box ${className}`} {...rest}>
      <div
        className={
          ledColor === "red"
            ? "led-red"
            : ledColor === "green"
              ? "led-green"
              : "led-yellow"
        }
      ></div>
    </div>
  );
};
