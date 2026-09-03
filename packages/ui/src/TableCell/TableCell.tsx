import type { ReactNode } from "react";
import clsx from "clsx";

import styles from "./TableCell.module.css";

export type TableCellProps = {
  children: ReactNode;
  className?: string;
  href?: string;
};

export function TableCell({ children, className, href }: TableCellProps) {
  return (
    <div className={clsx(styles.root, className)}>
      {href ? (
        <a
          className={styles.link}
          href={href}
          onClick={(event) => event.preventDefault()}
        >
          {children}
        </a>
      ) : (
        children
      )}
    </div>
  );
}
