import clsx from "clsx";

import type { IButtonProps } from "./types";
import styles from "./Button.module.scss";

export default function Button({ children, variant = 'primary', className, ...props }: IButtonProps) {
  const clsxRoot = clsx(styles.root, className, styles[variant]);
  return (
    <button className={clsxRoot} {...props}>
      {children}
    </button>
  );
}
