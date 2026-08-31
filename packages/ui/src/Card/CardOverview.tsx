import { Card } from "./Card";
import {
  OverviewShell,
  OverviewShowcaseRow,
} from "../storybook/OverviewShell";
import overviewStyles from "../storybook/Overview.module.css";
import styles from "./CardOverview.module.css";
import {
  CardDemoIcon,
  cardDemoDate,
  cardDemoLongTitle,
  cardDemoTitle,
} from "./cardDemo";

const previewCode = `<Card
  date="26 AUG 2026"
  icon={<DocumentIcon />}
  title="Oncology Drug Development Review"
/>`;

export function CardOverview() {
  return (
    <OverviewShell
      badge={
        <svg
          aria-hidden="true"
          className={overviewStyles.heroBadgeIcon}
          viewBox="0 0 24 24"
        >
          <rect height="14" rx="2" width="16" x="4" y="5" />
          <path d="M8 9h8" />
          <path d="M8 13h5" />
        </svg>
      }
      code={previewCode}
      description="Card is a compact surface for a date, title, and optional icon. It is layout-only — no link or click behaviour in v1."
      preview={
        <div className={styles.previewCard}>
          <Card
            date={cardDemoDate}
            icon={<CardDemoIcon />}
            title={cardDemoTitle}
          />
        </div>
      }
      title="Card"
    >
      <OverviewShowcaseRow
        description="Date sits top-left. An optional icon sits top-right. The title stays at the bottom of the card."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <rect height="14" rx="2" width="16" x="4" y="5" />
            <path d="M8 15h6" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneBrand}
        title="Layout"
      >
        <div className={styles.showcaseGrid}>
          <Card
            className={styles.showcaseCard}
            date={cardDemoDate}
            icon={<CardDemoIcon />}
            title={cardDemoTitle}
          />
          <Card
            className={styles.showcaseCard}
            date={cardDemoDate}
            title={cardDemoTitle}
          />
        </div>
      </OverviewShowcaseRow>

      <OverviewShowcaseRow
        description="Long titles wrap inside the card. The card grows vertically instead of overflowing horizontally."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <path d="M5 7h14" />
            <path d="M5 12h10" />
            <path d="M5 17h7" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneTeal}
        title="Long title"
      >
        <Card
          className={styles.showcaseCard}
          date={cardDemoDate}
          icon={<CardDemoIcon />}
          title={cardDemoLongTitle}
        />
      </OverviewShowcaseRow>
    </OverviewShell>
  );
}
