import { NavigationBar } from "./NavigationBar";
import {
  OverviewShell,
  OverviewShowcaseRow,
} from "../storybook/OverviewShell";
import overviewStyles from "../storybook/Overview.module.css";
import styles from "./NavigationBarOverview.module.css";
import {
  NavigationBarDemoLogo,
  navigationBarDemoItems,
  navigationBarDemoUserHref,
  navigationBarDemoUserLabel,
} from "./navigationBarDemo";

const previewCode = `<NavigationBar
  items={items}
  logo={<Logo />}
  userHref="#account"
  userLabel="Austin"
/>`;

export function NavigationBarOverview() {
  return (
    <div className={styles.overviewRoot}>
      <OverviewShell
      badge={
        <svg
          aria-hidden="true"
          className={overviewStyles.heroBadgeIcon}
          viewBox="0 0 24 24"
        >
          <path d="M4 7h16" />
          <path d="M4 12h10" />
          <path d="M4 17h16" />
        </svg>
      }
      code={previewCode}
      description="NavigationBar is a reusable top-nav organism. Menu items, badges, mega-menu groups, and the user label come from props — nothing is hardcoded to a product or person."
      preview={
        <div className={styles.livePreview}>
          <NavigationBar
            items={navigationBarDemoItems}
            logo={<NavigationBarDemoLogo />}
            userHref={navigationBarDemoUserHref}
            userLabel={navigationBarDemoUserLabel}
          />
        </div>
      }
      previewFlush
      previewFullWidth
      previewWide
      title="Navigation Bar"
    >
      <OverviewShowcaseRow
        description="Items with megaMenu open a full-width panel. Click the trigger to toggle. Hover versus click is not finalized until live-site confirmation."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <rect height="6" width="16" x="4" y="5" />
            <path d="M4 15h6" />
            <path d="M4 19h10" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneBrand}
        title="Mega menu"
      >
        <div className={styles.livePreview}>
          <NavigationBar
            defaultOpenId="companies"
            items={navigationBarDemoItems}
            logo={<NavigationBarDemoLogo />}
            userHref={navigationBarDemoUserHref}
            userLabel={navigationBarDemoUserLabel}
          />
        </div>
      </OverviewShowcaseRow>
      </OverviewShell>
    </div>
  );
}
