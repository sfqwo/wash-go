import styles from "./PageTitle.module.scss";
import type { IPageTitleProps } from "./types";

export const PageTitle = ({ title, subtitle }: IPageTitleProps) => (
  <div className={styles.root}>
    <h1 className={styles.title}>{title}</h1>
    <p className={styles.subtitle}>
      {subtitle}
    </p>
  </div>
); 