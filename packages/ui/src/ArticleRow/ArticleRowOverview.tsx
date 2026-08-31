import { ArticleRow } from "./ArticleRow";
import {
  OverviewShell,
  OverviewShowcaseRow,
} from "../storybook/OverviewShell";
import overviewStyles from "../storybook/Overview.module.css";
import styles from "./ArticleRowOverview.module.css";
import {
  articleRowDemoDate,
  articleRowDemoHref,
  articleRowDemoLongTitle,
  articleRowDemoSecondaryDate,
  articleRowDemoSecondaryHref,
  articleRowDemoSecondaryTitle,
  articleRowDemoTitle,
} from "./articleRowDemo";

const previewCode = `<ArticleRow
  date="12 Aug 2026"
  href="#article-pipeline"
  title="Oncology pipeline catalysts to watch in the next planning cycle"
/>`;

export function ArticleRowOverview() {
  return (
    <OverviewShell
      badge={
        <svg
          aria-hidden="true"
          className={overviewStyles.heroBadgeIcon}
          viewBox="0 0 24 24"
        >
          <path d="M5 8h14" />
          <path d="M5 12h10" />
          <path d="M5 16h12" />
        </svg>
      }
      code={previewCode}
      description="ArticleRow is a repeating title-and-date row for article lists. Pass href to make the title a semantic link; without it the title stays plain content."
      preview={
        <div className={styles.previewCard}>
          <ArticleRow
            date={articleRowDemoDate}
            href={articleRowDemoHref}
            title={articleRowDemoTitle}
          />
          <ArticleRow
            date={articleRowDemoSecondaryDate}
            href={articleRowDemoSecondaryHref}
            title={articleRowDemoSecondaryTitle}
          />
          <ArticleRow href={articleRowDemoHref} title={articleRowDemoTitle} />
        </div>
      }
      previewWide
      title="Article Row"
    >
      <OverviewShowcaseRow
        description="The title sits on the left and can wrap. The date is optional and stays on the right. Adjacent rows share a hairline separator."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <path d="M4 8h11" />
            <path d="M18 8h2" />
            <path d="M4 16h8" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneBrand}
        title="Layout"
      >
        <div className={styles.showcaseStack}>
          <ArticleRow
            date={articleRowDemoDate}
            href={articleRowDemoHref}
            title={articleRowDemoTitle}
          />
          <ArticleRow href={articleRowDemoHref} title={articleRowDemoTitle} />
        </div>
      </OverviewShowcaseRow>

      <OverviewShowcaseRow
        description="A long title uses the remaining space and wraps. The date does not shrink. Without href the title is not a link."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <path d="M4 8h16" />
            <path d="M4 12h12" />
            <path d="M4 16h9" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneTeal}
        title="Long title"
      >
        <ArticleRow date={articleRowDemoDate} title={articleRowDemoLongTitle} />
      </OverviewShowcaseRow>
    </OverviewShell>
  );
}
