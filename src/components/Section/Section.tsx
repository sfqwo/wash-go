"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import styles from "./Section.module.scss";
import type { ISection } from "./types";

export const Section = ({ className, children, as: Tag = "section", bg = "white", ...rest }: ISection) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || isVisible) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible]);

  const clsxRoot = clsx(styles.root, className, styles[bg], { [styles.rootVisible]: isVisible });

  return (
    <Tag
      ref={rootRef}
      className={clsxRoot}
      data-section-visible={isVisible}
      {...rest}
    >
      <div className={styles.content}>
        {children}
      </div>
    </Tag>
  );
};
