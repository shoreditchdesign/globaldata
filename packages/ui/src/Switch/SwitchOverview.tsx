import { useId } from "react";

import { Switch } from "./Switch";
import {
  OverviewDemo,
  OverviewShell,
  OverviewShowcaseRow,
  OverviewStateItem,
} from "../storybook/OverviewShell";
import overviewStyles from "../storybook/Overview.module.css";
import styles from "./SwitchOverview.module.css";

const previewCode = `<Switch aria-label="Notifications" />`;

function LabeledSwitch() {
  const id = useId();

  return (
    <div className={styles.labeled}>
      <label htmlFor={id}>Notifications</label>
      <Switch id={id} />
    </div>
  );
}

export function SwitchOverview() {
  return (
    <OverviewShell
      badge={
        <svg
          aria-hidden="true"
          className={overviewStyles.heroBadgeIcon}
          viewBox="0 0 24 24"
        >
          <rect x="4" y="8" width="16" height="8" rx="4" />
          <circle cx="16" cy="12" r="2.4" />
        </svg>
      }
      code={previewCode}
      description="A switch turns a single setting on or off. Name it with aria-label, or compose a visible label around the control — Switch itself does not add a separate label API."
      preview={<Switch aria-label="Notifications" />}
      title="Switch"
    >
      <OverviewShowcaseRow
        description="Unchecked and checked are the two values of the current API. Both are interactive unless disabled."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <rect x="4" y="8" width="16" height="8" rx="4" />
            <circle cx="10" cy="12" r="2.2" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneBrand}
        title="States"
      >
        <div className={overviewStyles.statesGrid}>
          <OverviewStateItem label="Default">
            <Switch aria-label="Notifications default" />
          </OverviewStateItem>
          <OverviewStateItem label="Checked">
            <Switch aria-label="Notifications checked" defaultChecked />
          </OverviewStateItem>
          <OverviewStateItem label="Disabled">
            <Switch aria-label="Notifications disabled" disabled />
          </OverviewStateItem>
        </div>
      </OverviewShowcaseRow>

      <OverviewShowcaseRow
        description="For a visible name, associate a native label with htmlFor. This is composition — Switch has no label prop."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <path d="M5 7h14" />
            <path d="M5 12h8" />
            <rect x="14" y="9.5" width="6" height="5" rx="2.5" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneTeal}
        title="With label"
      >
        <OverviewDemo>
          <LabeledSwitch />
        </OverviewDemo>
      </OverviewShowcaseRow>
    </OverviewShell>
  );
}
