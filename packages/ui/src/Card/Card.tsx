import type { ReactNode } from "react";
import clsx from "clsx";

import styles from "./Card.module.css";

export type CardProps = {
  className?: string;
  date?: string;
  icon?: ReactNode;
  title: ReactNode;
};

export function Card({ className, date, icon, title }: CardProps) {
  return (
    <article className={clsx(styles.root, className)}>
      <div className={styles.top}>
        {date ? <p className={styles.date}>{date}</p> : null}
        {icon ? (
          <span aria-hidden="true" className={styles.icon}>
            {icon}
          </span>
        ) : null}
      </div>
      <p className={styles.title}>{title}</p>
    </article>
  );
}
