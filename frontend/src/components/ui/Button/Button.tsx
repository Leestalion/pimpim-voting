import { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  [key: string]: any;
}

export const Button = ({ children, type = "button", className, ...props }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${className} ${styles.button}`}
      {...props}
    >
      {children}
    </button>
  );
};