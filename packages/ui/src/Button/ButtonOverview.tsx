import { useState } from "react";

import { Button } from "./Button";
import {
  OverviewDemo,
  OverviewShell,
  OverviewShowcaseRow,
  OverviewStateItem,
} from "../storybook/OverviewShell";
import overviewStyles from "../storybook/Overview.module.css";
import styles from "./ButtonOverview.module.css";

const previewCode = `<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>`;

export function ButtonOverview() {
  const [appearance, setAppearance] = useState<"light" | "dark">("light");

  return (
    <OverviewShell
      badge={<span className={styles.heroBadgeInner} />}
      code={previewCode}
      description="Buttons allow users to take actions and move through an interface with a single click or tap."
      preview={
        <>
          <Button className={styles.previewPrimary}>Primary</Button>
          <Button variant="secondary">Secondary</Button>
        </>
      }
      previewActions={
        <button
          className={`${overviewStyles.previewAction} ${
            appearance === "dark" ? overviewStyles.previewActionActive : ""
          }`}
          type="button"
          aria-label={
            appearance === "light"
              ? "Switch to dark preview"
              : "Switch to light preview"
          }
          onClick={() =>
            setAppearance((current) =>
              current === "light" ? "dark" : "light",
            )
          }
        >
          <svg
            aria-hidden="true"
            className={overviewStyles.previewActionIcon}
            viewBox="0 0 24 24"
          >
            {appearance === "light" ? (
              <>
                <circle cx="12" cy="12" r="4.2" />
                <path d="M12 2.5V5" />
                <path d="M12 19V21.5" />
                <path d="M2.5 12H5" />
                <path d="M19 12H21.5" />
                <path d="M5.4 5.4L7.1 7.1" />
                <path d="M16.9 16.9L18.6 18.6" />
                <path d="M16.9 7.1L18.6 5.4" />
                <path d="M5.4 18.6L7.1 16.9" />
              </>
            ) : (
              <path d="M18 14.5A6.5 6.5 0 0 1 9.5 6A7 7 0 1 0 18 14.5Z" />
            )}
          </svg>
        </button>
      }
      previewClassName={appearance === "dark" ? styles.previewFrameDark : undefined}
      title="Button"
    >
      <OverviewShowcaseRow
        description="Different visual styles for different levels of emphasis."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <path d="M12 4C7.58 4 4 7.36 4 11.5C4 14.54 6.36 17 9.27 17H10.5C11.33 17 12 17.67 12 18.5C12 19.33 12.67 20 13.5 20C17.64 20 21 16.42 21 12C21 7.58 16.42 4 12 4Z" />
            <circle cx="8.2" cy="11.2" r="1" />
            <circle cx="10.7" cy="8.3" r="1" />
            <circle cx="14.2" cy="8.8" r="1" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneBrand}
        title="Variants"
      >
        <OverviewDemo>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
        </OverviewDemo>
      </OverviewShowcaseRow>

      <OverviewShowcaseRow
        description="Multiple sizes to support different UI density and hierarchy."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <path d="M9 15L4 20" />
            <path d="M4 15V20H9" />
            <path d="M15 9L20 4" />
            <path d="M15 4H20V9" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneTeal}
        title="Sizes"
      >
        <OverviewDemo>
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
        </OverviewDemo>
      </OverviewShowcaseRow>

      <OverviewShowcaseRow
        description="Interactive states that communicate status and affordance."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="7" strokeDasharray="2.4 2.4" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneBlue}
        title="States"
      >
        <div className={overviewStyles.statesGrid}>
          <OverviewStateItem label="Default">
            <Button>Primary</Button>
          </OverviewStateItem>
          <OverviewStateItem label="Hover">
            <Button className={styles.buttonHover}>Primary</Button>
          </OverviewStateItem>
          <OverviewStateItem label="Focus">
            <Button className={styles.buttonFocus}>Primary</Button>
          </OverviewStateItem>
          <OverviewStateItem label="Disabled">
            <Button disabled>Primary</Button>
          </OverviewStateItem>
        </div>
      </OverviewShowcaseRow>
    </OverviewShell>
  );
}
