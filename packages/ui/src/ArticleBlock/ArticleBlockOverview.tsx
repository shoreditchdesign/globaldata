import { ArticleBlock } from "./ArticleBlock";
import {
  OverviewShell,
  OverviewShowcaseRow,
} from "../storybook/OverviewShell";
import overviewStyles from "../storybook/Overview.module.css";
import styles from "./ArticleBlockOverview.module.css";
import {
  curatedCompanyListTabs,
  latestDealsTabs,
  recommendedForYouTabs,
} from "./articleBlockDemo";

const previewCode = `<ArticleBlock
  actionHref="#recommended"
  actionLabel="View more"
  infoLabel="About this recommendation"
  tabs={recommendedForYouTabs}
  title="Recommended for you"
/>`;

export function ArticleBlockOverview() {
  return (
    <OverviewShell
      badge={
        <svg
          aria-hidden="true"
          className={overviewStyles.heroBadgeIcon}
          viewBox="0 0 24 24"
        >
          <path d="M5 7h9" />
          <path d="M5 12h14" />
          <path d="M5 17h11" />
        </svg>
      }
      code={previewCode}
      description="ArticleBlock composes a header, Tabs, and ArticleRow lists. The organism owns layout and the action arrow; Tabs and ArticleRow keep their own behaviour."
      preview={
        <div className={styles.livePreview}>
          <ArticleBlock
            actionHref="#recommended"
            actionLabel="View more"
            infoLabel="About this recommendation"
            tabs={recommendedForYouTabs}
            title="Recommended for you"
          />
        </div>
      }
      previewFlush
      previewFullWidth
      previewWide
      title="Article Block"
    >
      <OverviewShowcaseRow
        description="Latest Deals keeps the same chrome and uses View all. Switching a tab replaces the ArticleRow list."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <path d="M4 8h16" />
            <path d="M4 12h10" />
            <path d="M4 16h13" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneBrand}
        title="Latest Deals"
      >
        <ArticleBlock
          actionHref="#latest-deals"
          actionLabel="View all"
          tabs={latestDealsTabs}
          title="Latest Deals"
        />
      </OverviewShowcaseRow>

      <OverviewShowcaseRow
        description="Curated Company Lists omits dates. ArticleRow still renders titles and separators."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <path d="M6 7h12" />
            <path d="M6 12h12" />
            <path d="M6 17h8" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneTeal}
        title="Without dates"
      >
        <ArticleBlock
          actionHref="#curated-lists"
          actionLabel="View all"
          tabs={curatedCompanyListTabs}
          title="Curated Company Lists"
        />
      </OverviewShowcaseRow>
    </OverviewShell>
  );
}
