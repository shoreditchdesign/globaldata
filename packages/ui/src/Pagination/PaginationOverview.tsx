import {
  Pagination,
  PaginationIndicators,
  PaginationNext,
  PaginationPrevious,
} from "./Pagination";
import {
  OverviewDemo,
  OverviewShell,
  OverviewShowcaseRow,
} from "../storybook/OverviewShell";
import overviewStyles from "../storybook/Overview.module.css";

const previewCode = `<Pagination count={4} defaultPage={0}>
  <PaginationPrevious />
  <PaginationIndicators />
  <PaginationNext />
</Pagination>`;

export function PaginationOverview() {
  return (
    <OverviewShell
      badge={
        <svg
          aria-hidden="true"
          className={overviewStyles.heroBadgeIcon}
          viewBox="0 0 24 24"
        >
          <circle cx="6" cy="12" r="1.4" />
          <circle cx="12" cy="12" r="1.4" />
          <circle cx="18" cy="12" r="1.4" />
        </svg>
      }
      code={previewCode}
      description="Pagination lets users move through a set of pages. Compose indicators, previous, and next from the public primitives — there is no extra business logic in the component."
      preview={
        <Pagination aria-label="Example pagination" count={4} defaultPage={0}>
          <PaginationPrevious />
          <PaginationIndicators />
          <PaginationNext />
        </Pagination>
      }
      title="Pagination"
    >
      <OverviewShowcaseRow
        description="Dot indicators jump to a specific page. The active page is exposed with aria-current."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <circle cx="6" cy="12" r="1.6" />
            <circle cx="12" cy="12" r="1.6" />
            <circle cx="18" cy="12" r="1.6" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneBrand}
        title="Indicators"
      >
        <OverviewDemo>
          <Pagination aria-label="Page indicators" count={4} defaultPage={1}>
            <PaginationIndicators />
          </Pagination>
        </OverviewDemo>
      </OverviewShowcaseRow>

      <OverviewShowcaseRow
        description="Previous and next step through pages in order. The first and last pages disable the matching control."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <path d="M14 6l-6 6 6 6" />
            <path d="M10 6l6 6-6 6" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneTeal}
        title="Previous / Next"
      >
        <OverviewDemo>
          <Pagination aria-label="Previous and next" count={4} defaultPage={1}>
            <PaginationPrevious />
            <PaginationNext />
          </Pagination>
        </OverviewDemo>
      </OverviewShowcaseRow>
    </OverviewShell>
  );
}
