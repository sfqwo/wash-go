import clsx from "clsx";

import styles from "./Button.module.scss";
import type { IButtonProps } from "./types";

export default function Button({ children, variant = "primary", className, ...props }: IButtonProps) {
  const clsxRoot = clsx(styles.root, className, styles[variant]);
  return (
    <button className={clsxRoot} {...props}>
      {children}
    </button>
  );
}
