import { TextInput } from "./TextInput";
import { HoldToShowPasswordField } from "./HoldToShowPasswordField";
import styles from "./TextInputOverview.module.css";

function UserPrefixIcon() {
  return (
    <svg
      aria-hidden="true"
      className={styles.prefixIcon}
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

export function TextInputOverview() {
  return (
    <div className={styles.canvas}>
      <div className={styles.page}>
        <h1 className={styles.title}>Text Input</h1>
        <p className={styles.lead}>
          Reusable labeled input for forms. Prefix, helper, and error are
          optional. Geography Focus is a separate select-like control, shown
          here only as a visual reference.
        </p>

        <div className={styles.grid}>
          <figure className={styles.item}>
            <figcaption className={styles.caption}>Default</figcaption>
            <TextInput label="Email" placeholder="Enter here..." />
          </figure>
          <figure className={styles.item}>
            <figcaption className={styles.caption}>With prefix</figcaption>
            <TextInput
              label="Email"
              placeholder="Enter here..."
              prefix={<UserPrefixIcon />}
            />
          </figure>
          <figure className={styles.item}>
            <figcaption className={styles.caption}>Filled</figcaption>
            <TextInput
              defaultValue="user@example.com"
              label="Email"
              placeholder="Enter here..."
            />
          </figure>
          <figure className={styles.item}>
            <figcaption className={styles.caption}>Disabled</figcaption>
            <TextInput disabled label="Email" placeholder="Enter here..." />
          </figure>
          <figure className={styles.item}>
            <figcaption className={styles.caption}>Error</figcaption>
            <TextInput
              defaultValue="invalid"
              error="Enter a valid email"
              label="Email"
              placeholder="Enter here..."
            />
          </figure>
          <figure className={styles.item}>
            <figcaption className={styles.caption}>Helper text</figcaption>
            <TextInput
              hint="We'll never share your email."
              label="Email"
              placeholder="Enter here..."
            />
          </figure>
          <figure className={styles.item}>
            <figcaption className={styles.caption}>Password</figcaption>
            <HoldToShowPasswordField
              autoComplete="current-password"
              label="Password"
              placeholder="Enter here..."
            />
          </figure>
          <figure className={styles.item}>
            <figcaption className={styles.caption}>
              Geography Focus (reference, not TextInput)
            </figcaption>
            <div className={styles.geographyReference}>Geography Focus</div>
          </figure>
        </div>
      </div>
    </div>
  );
}
