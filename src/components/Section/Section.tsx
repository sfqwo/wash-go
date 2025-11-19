import styles from './Section.module.scss';
import clsx from "clsx";
import { ISection } from "./types";

export const Section = ({ className, children, as: Tag = 'section', bg = 'white', ...rest }: ISection) => {
  const clsxRoot = clsx(styles.root, className, styles[bg]);

  return (
  <Tag className={clsxRoot} {...rest}>
    <div className={styles.content}>
      {children}
    </div>
  </Tag>
);
}