import { CarouselCard } from "./CarouselCard";
import {
  OverviewShell,
  OverviewShowcaseRow,
} from "../storybook/OverviewShell";
import overviewStyles from "../storybook/Overview.module.css";
import styles from "./CarouselCardOverview.module.css";
import {
  CarouselCardDemoMedia,
  carouselCardDemoAction,
  carouselCardDemoLongAction,
  carouselCardDemoCompactAltEyebrow,
  carouselCardDemoCompactEyebrow,
  carouselCardDemoCompactLongTitle,
  carouselCardDemoCompactTitle,
  carouselCardDemoDescription,
  carouselCardDemoEyebrow,
  carouselCardDemoLongDescription,
  carouselCardDemoLongTitle,
  carouselCardDemoTitle,
} from "./carouselCardDemo";

const previewCode = `<CarouselCard
  variant="featured"
  eyebrow="NEW REPORT"
  title="Oncology Pipeline Outlook 2026"
  description={description}
  actionLabel="Access the Full Report"
  media={media}
/>`;

export function CarouselCardOverview() {
  return (
    <OverviewShell
      badge={
        <svg
          aria-hidden="true"
          className={overviewStyles.heroBadgeIcon}
          viewBox="0 0 24 24"
        >
          <rect height="12" rx="1.5" width="16" x="4" y="6" />
          <path d="M8 18h8" />
        </svg>
      }
      code={previewCode}
      description="CarouselCard is a reusable carousel item with featured and compact presentations. Eyebrow and actionLabel are slots — the card does not hardcode category labels or CTA copy. Featured cards always render a trailing arrow after the label."
      preview={
        <div className={styles.livePreview}>
          <CarouselCard
            actionLabel={carouselCardDemoAction}
            description={carouselCardDemoDescription}
            eyebrow={carouselCardDemoEyebrow}
            media={<CarouselCardDemoMedia />}
            title={carouselCardDemoTitle}
          />
        </div>
      }
      previewFlush
      previewFullWidth
      previewWide
      title="Carousel Card"
    >
      <OverviewShowcaseRow
        description="Compact cards are separate small tiles: category + title only. They grow when the title wraps."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <rect height="10" width="8" x="4" y="7" />
            <path d="M14 8h6" />
            <path d="M14 12h5" />
            <path d="M14 16h4" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneBrand}
        title="Compact column"
      >
        <div className={styles.compactColumn}>
          <CarouselCard
            className={styles.compactCard}
            eyebrow={carouselCardDemoCompactEyebrow}
            title={carouselCardDemoCompactTitle}
            variant="compact"
          />
          <CarouselCard
            className={styles.compactCard}
            eyebrow={carouselCardDemoCompactAltEyebrow}
            title={carouselCardDemoCompactLongTitle}
            variant="compact"
          />
        </div>
      </OverviewShowcaseRow>

      <div className={styles.longContentRow}>
        <OverviewShowcaseRow
          description="Featured media fills its frame with object-fit: cover. Long titles wrap and the card grows with its content so the CTA stays inside the surface."
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
          title="Long content"
        >
          <div className={styles.showcaseFeatured}>
            <CarouselCard
              actionLabel={carouselCardDemoLongAction}
              description={carouselCardDemoLongDescription}
              eyebrow={carouselCardDemoEyebrow}
              media={<CarouselCardDemoMedia />}
              title={carouselCardDemoLongTitle}
            />
          </div>
        </OverviewShowcaseRow>
      </div>
    </OverviewShell>
  );
}
