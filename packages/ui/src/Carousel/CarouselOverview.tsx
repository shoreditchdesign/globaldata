import { Carousel } from "./Carousel";
import { carouselDemoItems } from "./carouselDemo";
import {
  OverviewShell,
  OverviewShowcaseRow,
} from "../storybook/OverviewShell";
import overviewStyles from "../storybook/Overview.module.css";
import styles from "./CarouselOverview.module.css";

const previewCode = `<Carousel
  ariaLabel="Latest insights"
  items={items}
/>`;

export function CarouselOverview() {
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
      description="Carousel is an organism that composes CarouselCard items. One item is featured; the others appear as compact previews with dots and previous/next controls."
      preview={
        <div className={styles.livePreview}>
          <Carousel items={carouselDemoItems} />
        </div>
      }
      previewFlush
      previewFullWidth
      previewWide
      title="Carousel"
    >
      <OverviewShowcaseRow
        description="Compact previews stay separate CarouselCard items. Choosing one makes it the featured slide."
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
        title="Item navigation"
      >
        <p className={styles.note}>
          Previous and next stay disabled at the ends. There is no autoplay or
          looping.
        </p>
      </OverviewShowcaseRow>
    </OverviewShell>
  );
}
