import type { ReactNode } from "react";
import clsx from "clsx";

import styles from "./HeaderCell.module.css";

export type HeaderCellSort = "asc" | "desc" | null;

export type HeaderCellProps = {
  children: ReactNode;
  className?: string;
  onSortChange?: (sort: HeaderCellSort) => void;
  sortable?: boolean;
  sortDirection?: HeaderCellSort;
};

function nextSort(current: HeaderCellSort): HeaderCellSort {
  if (current === "asc") {
    return "desc";
  }

  if (current === "desc") {
    return null;
  }

  return "asc";
}

function SortIcon({ direction }: { direction: HeaderCellSort }) {
  return (
    <svg
      aria-hidden="true"
      className={clsx(
        styles.sortIcon,
        direction === "desc" && styles.sortIconDesc,
        direction == null && styles.sortIconIdle,
      )}
      fill="none"
      focusable="false"
      viewBox="0 0 10 10"
    >
      <path
        d="M5 1.25V8.75M5 1.25L2.25 4M5 1.25L7.75 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.9"
      />
    </svg>
  );
}

export function HeaderCell({
  children,
  className,
  onSortChange,
  sortable = false,
  sortDirection = null,
}: HeaderCellProps) {
  const ariaSort = sortable
    ? sortDirection === "asc"
      ? "ascending"
      : sortDirection === "desc"
        ? "descending"
        : "none"
    : undefined;

  if (!sortable) {
    return (
      <div
        aria-sort={ariaSort}
        className={clsx(styles.root, className)}
        role="columnheader"
      >
        <span className={styles.label}>{children}</span>
      </div>
    );
  }

  return (
    <div
      aria-sort={ariaSort}
      className={clsx(styles.root, className)}
      role="columnheader"
    >
      <button
        className={styles.sortButton}
        onClick={() => onSortChange?.(nextSort(sortDirection))}
        type="button"
      >
        <span className={styles.label}>{children}</span>
        <SortIcon direction={sortDirection} />
      </button>
    </div>
  );
}
