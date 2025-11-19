import styles from "./SectionTitle.module.scss";
import type { ISectionTitleProps } from "./types";

export const SectionTitle = ({ title, subtitle }: ISectionTitleProps) => (
  <div className={styles.root}>
    <h1 className={styles.title}>{title}</h1>
    <p className={styles.subtitle}>
      {subtitle}
    </p>
  </div>
); 