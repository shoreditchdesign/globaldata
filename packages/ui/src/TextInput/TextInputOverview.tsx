import { HoldToShowPasswordField } from "./HoldToShowPasswordField";
import { TextInput } from "./TextInput";
import {
  OverviewDemo,
  OverviewShell,
  OverviewShowcaseRow,
} from "../storybook/OverviewShell";
import overviewStyles from "../storybook/Overview.module.css";
import styles from "./TextInputOverview.module.css";

const previewCode = `<TextInput
  label="Email"
  placeholder="Enter here..."
/>`;

function UserPrefixIcon() {
  return (
    <svg
      aria-hidden="true"
      className={styles.affixIcon}
      fill="none"
      viewBox="0 0 16 16"
    >
      <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M3.25 13.25c.35-2.35 2.2-3.75 4.75-3.75s4.4 1.4 4.75 3.75"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function SuffixActionIcon() {
  return (
    <svg
      aria-hidden="true"
      className={styles.affixIcon}
      fill="none"
      viewBox="0 0 16 16"
    >
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M1.75 8c1.5-3 3.7-4.75 6.25-4.75S13.75 5 15.25 8c-1.5 3-3.7 4.75-6.25 4.75S3.25 11 1.75 8Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}

export function TextInputOverview() {
  return (
    <OverviewShell
      badge={
        <svg
          aria-hidden="true"
          className={overviewStyles.heroBadgeIcon}
          viewBox="0 0 24 24"
        >
          <rect x="4" y="7" width="16" height="10" rx="2" />
          <path d="M7 12h6" />
        </svg>
      }
      code={previewCode}
      description="A labeled text field for forms. Prefix, suffix, hint, and error are optional slots on the public TextInput API."
      preview={
        <TextInput
          className={styles.field}
          label="Email"
          placeholder="Enter here..."
        />
      }
      previewWide
      title="Text Input"
    >
      <OverviewShowcaseRow
        description="The default field is a label plus an editable input. Prefix and suffix are optional and stay inside the control."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <rect x="4" y="7" width="16" height="10" rx="2" />
            <path d="M7 12h7" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneBrand}
        title="Default"
      >
        <OverviewDemo>
          <TextInput
            className={styles.field}
            label="Email"
            placeholder="Enter here..."
          />
        </OverviewDemo>
      </OverviewShowcaseRow>

      <OverviewShowcaseRow
        description="Pass any node as prefix — typically a small icon — without changing the input API."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <circle cx="9" cy="9" r="3" />
            <path d="M4 18c.6-2.4 2.5-4 5-4s4.4 1.6 5 4" />
            <path d="M16 8h4" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneTeal}
        title="Prefix"
      >
        <OverviewDemo>
          <TextInput
            className={styles.field}
            label="Email"
            placeholder="Enter here..."
            prefix={<UserPrefixIcon />}
          />
        </OverviewDemo>
      </OverviewShowcaseRow>

      <OverviewShowcaseRow
        description="Suffix is a slot for an action inside the field, such as a reveal control. Wire the behavior in composition."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <rect x="4" y="7" width="16" height="10" rx="2" />
            <circle cx="17" cy="12" r="1.4" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneBlue}
        title="Suffix"
      >
        <OverviewDemo>
          <TextInput
            autoComplete="current-password"
            className={styles.field}
            label="Password"
            placeholder="Enter here..."
            suffix={
              <button aria-label="Show password" type="button">
                <SuffixActionIcon />
              </button>
            }
            type="password"
          />
        </OverviewDemo>
      </OverviewShowcaseRow>

      <OverviewShowcaseRow
        description="Hint is supporting copy under the field. It is omitted when an error message is shown."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="7" />
            <path d="M12 11v4" />
            <circle cx="12" cy="8.2" r="0.6" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneBrand}
        title="Hint"
      >
        <OverviewDemo>
          <TextInput
            className={styles.field}
            hint="We'll never share your email."
            label="Email"
            placeholder="Enter here..."
          />
        </OverviewDemo>
      </OverviewShowcaseRow>

      <OverviewShowcaseRow
        description="A string error marks the field invalid and replaces hint with the message."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="7" />
            <path d="M12 8v5" />
            <circle cx="12" cy="16" r="0.6" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneTeal}
        title="Error"
      >
        <OverviewDemo>
          <TextInput
            className={styles.field}
            defaultValue="invalid"
            error="Enter a valid email"
            label="Email"
            placeholder="Enter here..."
          />
        </OverviewDemo>
      </OverviewShowcaseRow>

      <OverviewShowcaseRow
        description="Hold-to-show password is a story-level composition on TextInput suffix, not a separate public component."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <path d="M3 12c2-4 5-6 9-6s7 2 9 6c-2 4-5 6-9 6s-7-2-9-6Z" />
            <circle cx="12" cy="12" r="2.4" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneBlue}
        title="Password"
      >
        <OverviewDemo>
          <HoldToShowPasswordField
            autoComplete="current-password"
            className={styles.field}
            label="Password"
            placeholder="Enter here..."
          />
        </OverviewDemo>
      </OverviewShowcaseRow>
    </OverviewShell>
  );
}
