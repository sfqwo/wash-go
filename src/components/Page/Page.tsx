import type { HTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";

import styles from './Page.module.scss';

export const Page = ({ children, className, ...rest }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  const clsxRoot = clsx(styles.root, className);

  return (
    <div className={clsxRoot} {...rest}>{children}</div>
  );
}