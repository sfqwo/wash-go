import clsx from "clsx";
import type { HTMLAttributes, PropsWithChildren } from "react";

import styles from "./Page.module.scss";

export const Page = ({ children, className, ...rest }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  const clsxRoot = clsx(styles.root, className);

  return (
    <div className={clsxRoot} {...rest}>{children}</div>
  );
};