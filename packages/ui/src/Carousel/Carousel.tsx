import { useMemo, useState, type ReactNode } from "react";
import clsx from "clsx";

import { CarouselCard } from "../CarouselCard/CarouselCard";
import styles from "./Carousel.module.css";

const PREVIEW_COUNT = 3;

export type CarouselItem = {
  actionLabel?: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  id: string;
  media?: ReactNode;
  title: ReactNode;
};

export type CarouselProps = {
  ariaLabel?: string;
  className?: string;
  initialIndex?: number;
  items: CarouselItem[];
};

function clampIndex(index: number, count: number) {
  if (count <= 0) {
    return 0;
  }

  return Math.min(Math.max(0, index), count - 1);
}

function previewEntries(items: CarouselItem[], activeIndex: number) {
  const others = items
    .map((item, index) => ({ index, item }))
    .filter(({ index }) => index !== activeIndex);

  return [
    ...others.filter(({ index }) => index > activeIndex),
    ...others.filter(({ index }) => index < activeIndex),
  ].slice(0, PREVIEW_COUNT);
}

function ChevronIcon({ direction }: { direction: "down" | "up" }) {
  return (
    <svg
      aria-hidden="true"
      className={clsx(styles.icon, direction === "up" && styles.iconUp)}
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

export function Carousel({
  ariaLabel = "Carousel",
  className,
  initialIndex = 0,
  items,
}: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(() =>
    clampIndex(initialIndex, items.length),
  );
  const currentIndex = clampIndex(activeIndex, items.length);
  const activeItem = items[currentIndex];
  const previews = useMemo(
    () => previewEntries(items, currentIndex),
    [currentIndex, items],
  );
  const hasMedia = Boolean(activeItem?.media);
  const isFirst = currentIndex <= 0;
  const isLast = items.length === 0 || currentIndex >= items.length - 1;

  if (!activeItem) {
    return null;
  }

  return (
    <section
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      className={clsx(styles.root, className)}
      data-has-media={hasMedia ? "true" : "false"}
    >
      <div className={styles.stage}>
        {hasMedia ? (
          <div className={styles.media} key={activeItem.id}>
            {activeItem.media}
          </div>
        ) : null}

        <div aria-atomic="true" aria-live="polite" className={styles.featured}>
          <div className={styles.slide} key={activeItem.id}>
            <CarouselCard
              actionLabel={activeItem.actionLabel}
              description={activeItem.description}
              eyebrow={activeItem.eyebrow}
              title={activeItem.title}
              variant="featured"
            />
          </div>
        </div>

        {previews.length > 0 ? (
          <div className={styles.previews}>
            {previews.map(({ index, item }) => (
              <div className={styles.preview} key={item.id}>
                <CarouselCard
                  eyebrow={item.eyebrow}
                  title={item.title}
                  variant="compact"
                />
                <button
                  aria-label={`Show item ${index + 1}`}
                  className={styles.previewHit}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className={styles.controls}>
        <div
          aria-label="Slides"
          className={styles.dots}
          role="group"
        >
          {items.map((item, index) => {
            const isActive = index === currentIndex;

            return (
              <button
                aria-current={isActive ? "true" : undefined}
                aria-label={`Item ${index + 1}`}
                className={styles.dot}
                data-active={isActive ? "" : undefined}
                key={item.id}
                onClick={() => setActiveIndex(index)}
                type="button"
              />
            );
          })}
        </div>

        <div className={styles.steppers} role="group">
          <button
            aria-label="Previous item"
            className={styles.stepper}
            disabled={isFirst}
            onClick={() => setActiveIndex(currentIndex - 1)}
            type="button"
          >
            <ChevronIcon direction="up" />
          </button>
          <button
            aria-label="Next item"
            className={styles.stepper}
            disabled={isLast}
            onClick={() => setActiveIndex(currentIndex + 1)}
            type="button"
          >
            <ChevronIcon direction="down" />
          </button>
        </div>
      </div>
    </section>
  );
}
