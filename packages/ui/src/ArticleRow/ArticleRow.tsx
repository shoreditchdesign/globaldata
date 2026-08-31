import type { ReactNode } from "react";
import clsx from "clsx";

import styles from "./ArticleRow.module.css";

export type ArticleRowProps = {
  className?: string;
  date?: ReactNode;
  href?: string;
  title: ReactNode;
};

export function ArticleRow({ className, date, href, title }: ArticleRowProps) {
  return (
    <article className={clsx(styles.root, className)}>
      {href ? (
        <a className={styles.title} href={href}>
          {title}
        </a>
      ) : (
        <p className={styles.title}>{title}</p>
      )}
      {date ? <p className={styles.date}>{date}</p> : null}
    </article>
  );
}
