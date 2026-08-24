import { useState, type ReactNode } from "react";

import { Button } from "./Button";
import styles from "./ButtonOverview.module.css";

const previewCode = `<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>`;

type ShowcaseRowProps = {
  children: ReactNode;
  description: string;
  icon: ReactNode;
  iconClassName?: string;
  title: string;
};

function ShowcaseRow({
  children,
  description,
  icon,
  iconClassName,
  title,
}: ShowcaseRowProps) {
  return (
    <section className={styles.showcaseRow}>
      <div className={styles.showcaseIntro}>
        <div
          className={`${styles.showcaseIcon} ${iconClassName ?? ""}`.trim()}
        >
          {icon}
        </div>
        <div>
          <h2 className={styles.showcaseTitle}>{title}</h2>
          <p className={styles.showcaseDescription}>{description}</p>
        </div>
      </div>

      <div className={styles.showcaseContent}>{children}</div>
    </section>
  );
}

type StateItemProps = {
  children: ReactNode;
  label: string;
};

function StateItem({ children, label }: StateItemProps) {
  return (
    <div className={styles.stateItem}>
      <p className={styles.stateLabel}>{label}</p>
      {children}
    </div>
  );
}

export function ButtonOverview() {
  const [appearance, setAppearance] = useState<"light" | "dark">("light");
  const [view, setView] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  async function handleCopyCode() {
    try {
      await navigator.clipboard.writeText(previewCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={styles.canvas}>
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeInner} />
            </div>

            <p className={styles.eyebrow}>Component</p>
            <h1 className={styles.title}>Button</h1>

            <div className={styles.usageBlock}>
              <h2 className={styles.sectionTitle}>Usage</h2>
              <p className={styles.description}>
                Buttons allow users to take actions and move through an
                interface with a single click or tap.
              </p>
            </div>
          </div>

          <div className={styles.previewCard}>
            <div className={styles.previewHeader}>
              <h2 className={styles.previewTitle}>
                {view === "preview" ? "Live preview" : "Code preview"}
              </h2>
              <div className={styles.previewActions}>
                {view === "preview" && (
                  <button
                    className={`${styles.previewAction} ${
                      appearance === "dark" ? styles.previewActionActive : ""
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
                      className={styles.previewActionIcon}
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
                )}
                <button
                  className={`${styles.previewAction} ${
                    view === "code" ? styles.previewActionActive : ""
                  }`}
                  type="button"
                  aria-label={view === "preview" ? "Show code" : "Show preview"}
                  onClick={() =>
                    setView((current) =>
                      current === "preview" ? "code" : "preview",
                    )
                  }
                >
                  <svg
                    aria-hidden="true"
                    className={styles.previewActionIcon}
                    viewBox="0 0 24 24"
                  >
                    {view === "preview" ? (
                      <>
                        <path d="M9 8L5 12L9 16" />
                        <path d="M15 8L19 12L15 16" />
                        <path d="M13 6L11 18" />
                      </>
                    ) : (
                      <>
                        <path d="M2.5 12C4.8 7.7 8 5.5 12 5.5C16 5.5 19.2 7.7 21.5 12C19.2 16.3 16 18.5 12 18.5C8 18.5 4.8 16.3 2.5 12Z" />
                        <circle cx="12" cy="12" r="2.5" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <div
              className={`${styles.previewBody} ${
                view === "code" ? styles.previewBodyCode : ""
              }`}
            >
              <div
                aria-hidden={view !== "preview"}
                inert={view !== "preview"}
                className={`${styles.previewFrame} ${
                  view === "preview" ? styles.previewFrameActive : ""
                } ${appearance === "dark" ? styles.previewFrameDark : ""}`}
              >
                <div className={styles.previewFrameInner}>
                  <Button className={styles.previewPrimary}>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                </div>
              </div>
              <div
                aria-hidden={view !== "code"}
                inert={view !== "code"}
                className={`${styles.codeBlock} ${
                  view === "code" ? styles.codeBlockActive : ""
                }`}
              >
                <div className={styles.codeBlockHeader}>
                  <button
                    className={styles.copyButton}
                    type="button"
                    onClick={handleCopyCode}
                  >
                    {copied ? "Copied" : "Copy code"}
                  </button>
                </div>
                <pre className={styles.codePre}>
                  <code>{previewCode}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.rows}>
          <ShowcaseRow
            description="Different visual styles for different levels of emphasis."
            icon={
              <svg
                aria-hidden="true"
                className={styles.iconSvg}
                viewBox="0 0 24 24"
              >
                <path d="M12 4C7.58 4 4 7.36 4 11.5C4 14.54 6.36 17 9.27 17H10.5C11.33 17 12 17.67 12 18.5C12 19.33 12.67 20 13.5 20C17.64 20 21 16.42 21 12C21 7.58 16.42 4 12 4Z" />
                <circle cx="8.2" cy="11.2" r="1" />
                <circle cx="10.7" cy="8.3" r="1" />
                <circle cx="14.2" cy="8.8" r="1" />
              </svg>
            }
            iconClassName={styles.showcaseIconVariant}
            title="Variants"
          >
            <div className={styles.demoButtons}>
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
            </div>
          </ShowcaseRow>

          <ShowcaseRow
            description="Multiple sizes to support different UI density and hierarchy."
            icon={
              <svg
                aria-hidden="true"
                className={styles.iconSvg}
                viewBox="0 0 24 24"
              >
                <path d="M9 15L4 20" />
                <path d="M4 15V20H9" />
                <path d="M15 9L20 4" />
                <path d="M15 4H20V9" />
              </svg>
            }
            iconClassName={styles.showcaseIconSize}
            title="Sizes"
          >
            <div className={styles.demoButtons}>
              <Button size="small">Small</Button>
              <Button size="medium">Medium</Button>
            </div>
          </ShowcaseRow>

          <ShowcaseRow
            description="Interactive states that communicate status and affordance."
            icon={
              <svg
                aria-hidden="true"
                className={styles.iconSvg}
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="7"
                  strokeDasharray="2.4 2.4"
                />
              </svg>
            }
            iconClassName={styles.showcaseIconState}
            title="States"
          >
            <div className={styles.statesGrid}>
              <StateItem label="Default">
                <Button>Primary</Button>
              </StateItem>
              <StateItem label="Hover">
                <Button className={styles.buttonHover}>Primary</Button>
              </StateItem>
              <StateItem label="Focus">
                <Button className={styles.buttonFocus}>Primary</Button>
              </StateItem>
              <StateItem label="Disabled">
                <Button disabled>Primary</Button>
              </StateItem>
            </div>
          </ShowcaseRow>
        </div>
      </div>
    </div>
  );
}
