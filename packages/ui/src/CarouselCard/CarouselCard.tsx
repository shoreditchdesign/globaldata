import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

import styles from "./CarouselCard.module.css";

const carouselCardVariants = cva(styles.root, {
  variants: {
    variant: {
      featured: styles.featured,
      compact: styles.compact,
    },
  },
  defaultVariants: {
    variant: "featured",
  },
});

export type CarouselCardProps = {
  actionLabel?: ReactNode;
  className?: string;
  description?: ReactNode;
  eyebrow?: ReactNode;
  media?: ReactNode;
  title: ReactNode;
} & VariantProps<typeof carouselCardVariants>;

export function CarouselCard({
  actionLabel,
  className,
  description,
  eyebrow,
  media,
  title,
  variant = "featured",
}: CarouselCardProps) {
  const isCompact = variant === "compact";

  return (
    <article
      className={clsx(carouselCardVariants({ variant }), className)}
      data-variant={variant}
    >
      {!isCompact && media ? (
        <div className={styles.media}>{media}</div>
      ) : null}
      <div className={styles.content}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <h3 className={styles.title}>{title}</h3>
        {!isCompact && description ? (
          <p className={styles.description}>{description}</p>
        ) : null}
        {!isCompact && actionLabel ? (
          <div className={styles.action}>
            <span className={styles.actionLabel}>{actionLabel}</span>
            <span aria-hidden="true" className={styles.actionArrow}>
              →
            </span>
          </div>
        ) : null}
      </div>
    </article>
  );
}
