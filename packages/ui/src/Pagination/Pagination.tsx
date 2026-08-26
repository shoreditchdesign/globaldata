import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import clsx from "clsx";

import styles from "./Pagination.module.css";

type PaginationContextValue = {
  count: number;
  page: number;
  goTo: (page: number) => void;
};

const PaginationContext = createContext<PaginationContextValue | null>(null);

function usePaginationContext() {
  const context = useContext(PaginationContext);

  if (context == null) {
    throw new Error("Pagination components must be used within Pagination.");
  }

  return context;
}

function clampPage(page: number, count: number) {
  if (count <= 0) {
    return 0;
  }

  return Math.min(Math.max(0, page), count - 1);
}

export type PaginationProps = {
  count: number;
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  className?: string;
  children?: ReactNode;
  "aria-label"?: string;
};

export function Pagination({
  count,
  page: pageProp,
  defaultPage = 0,
  onPageChange,
  className,
  children,
  "aria-label": ariaLabel,
}: PaginationProps) {
  const [uncontrolledPage, setUncontrolledPage] = useState(() =>
    clampPage(defaultPage, count),
  );
  const isControlled = pageProp !== undefined;
  const page = clampPage(isControlled ? pageProp : uncontrolledPage, count);

  const goTo = useCallback(
    (nextPage: number) => {
      const next = clampPage(nextPage, count);

      if (next === page) {
        return;
      }

      if (!isControlled) {
        setUncontrolledPage(next);
      }

      onPageChange?.(next);
    },
    [count, isControlled, onPageChange, page],
  );

  const context = useMemo(
    () => ({ count, page, goTo }),
    [count, goTo, page],
  );

  const label =
    ariaLabel?.trim() ||
    (count > 0
      ? `Pagination, page ${page + 1} of ${count}`
      : "Pagination");

  return (
    <PaginationContext.Provider value={context}>
      <nav aria-label={label} className={clsx(styles.root, className)}>
        {children}
      </nav>
    </PaginationContext.Provider>
  );
}

export type PaginationIndicatorsProps = {
  className?: string;
};

export function PaginationIndicators({ className }: PaginationIndicatorsProps) {
  const { count, page, goTo } = usePaginationContext();

  return (
    <div
      aria-label="Pages"
      className={clsx(styles.indicators, className)}
      role="group"
    >
      {Array.from({ length: Math.max(count, 0) }, (_, index) => {
        const isActive = index === page;

        return (
          <button
            aria-current={isActive ? "true" : undefined}
            aria-label={`Page ${index + 1}`}
            className={styles.dot}
            data-active={isActive ? "" : undefined}
            key={index}
            onClick={() => goTo(index)}
            type="button"
          />
        );
      })}
    </div>
  );
}

type NavigationButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "className" | "type"
> & {
  className?: string;
};

function ArrowIcon({ direction }: { direction: "next" | "previous" }) {
  return (
    <svg
      aria-hidden="true"
      className={clsx(
        styles.icon,
        direction === "previous" && styles.iconPrevious,
      )}
      fill="none"
      focusable="false"
      viewBox="0 0 10 10"
    >
      <path
        d="M0.789795 5H8.64878"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.835"
      />
      <path
        d="M4.71948 1.07056L8.64898 5.00005L4.71948 8.92954"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.835"
      />
    </svg>
  );
}

export type PaginationPreviousProps = NavigationButtonProps;

export function PaginationPrevious({
  className,
  onClick,
  ...props
}: PaginationPreviousProps) {
  const { page, goTo } = usePaginationContext();
  const disabled = page <= 0 || props.disabled;

  return (
    <button
      {...props}
      aria-label={props["aria-label"] ?? "Previous page"}
      className={clsx(styles.button, className)}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          goTo(page - 1);
        }
      }}
      type="button"
    >
      <ArrowIcon direction="previous" />
    </button>
  );
}

export type PaginationNextProps = NavigationButtonProps;

export function PaginationNext({
  className,
  onClick,
  ...props
}: PaginationNextProps) {
  const { count, page, goTo } = usePaginationContext();
  const disabled = count <= 0 || page >= count - 1 || props.disabled;

  return (
    <button
      {...props}
      aria-label={props["aria-label"] ?? "Next page"}
      className={clsx(styles.button, styles.next, className)}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          goTo(page + 1);
        }
      }}
      type="button"
    >
      <ArrowIcon direction="next" />
    </button>
  );
}
