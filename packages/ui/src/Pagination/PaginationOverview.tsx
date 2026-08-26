import {
  Pagination,
  PaginationIndicators,
  PaginationNext,
  PaginationPrevious,
} from "./Pagination";
import styles from "./PaginationOverview.module.css";

export function PaginationOverview() {
  return (
    <div className={styles.canvas}>
      <div className={styles.page}>
        <h1 className={styles.title}>Pagination</h1>
        <p className={styles.lead}>
          Two pagination patterns from the Figma catalogue: page indicators and
          previous / next controls.
        </p>

        <div className={styles.grid}>
          <figure className={styles.item}>
            <figcaption className={styles.caption}>Indicators</figcaption>
            <Pagination aria-label="Page indicators" count={4} defaultPage={1}>
              <PaginationIndicators />
            </Pagination>
          </figure>
          <figure className={styles.item}>
            <figcaption className={styles.caption}>Previous / Next</figcaption>
            <Pagination aria-label="Previous and next" count={4} defaultPage={1}>
              <PaginationPrevious />
              <PaginationNext />
            </Pagination>
          </figure>
        </div>
      </div>
    </div>
  );
}

