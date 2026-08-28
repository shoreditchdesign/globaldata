import { useState, type ReactNode } from "react";

import styles from "./Overview.module.css";

type OverviewShellProps = {
  badge: ReactNode;
  children?: ReactNode;
  code: string;
  description: ReactNode;
  preview: ReactNode;
  previewActions?: ReactNode;
  previewClassName?: string;
  previewFlush?: boolean;
  previewFullWidth?: boolean;
  previewWide?: boolean;
  title: string;
};

export function OverviewShell({
  badge,
  children,
  code,
  description,
  preview,
  previewActions,
  previewClassName,
  previewFlush = false,
  previewFullWidth = false,
  previewWide = false,
  title,
}: OverviewShellProps) {
  const [view, setView] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  async function handleCopyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={styles.canvas}>
      <div className={styles.page}>
        <section
          className={`${styles.hero} ${
            previewFullWidth ? styles.heroFullPreview : ""
          }`.trim()}
        >
          <div className={styles.heroCopy}>
            <div className={styles.heroBadge}>{badge}</div>
            <p className={styles.eyebrow}>Component</p>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.usageBlock}>
              <h2 className={styles.sectionTitle}>Usage</h2>
              <p className={styles.description}>{description}</p>
            </div>
          </div>

          <div className={styles.previewCard}>
            <div className={styles.previewHeader}>
              <h2 className={styles.previewTitle}>
                {view === "preview" ? "Live preview" : "Code preview"}
              </h2>
              <div className={styles.previewActions}>
                {view === "preview" ? previewActions : null}
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
              } ${previewFlush ? styles.previewBodyFlush : ""}`.trim()}
            >
              <div
                aria-hidden={view !== "preview"}
                inert={view !== "preview"}
                className={`${styles.previewFrame} ${
                  view === "preview" ? styles.previewFrameActive : ""
                } ${previewFlush ? styles.previewFrameFlush : ""} ${
                  previewClassName ?? ""
                }`.trim()}
              >
                <div
                  className={`${styles.previewFrameInner} ${
                    previewWide ? styles.previewFrameInnerWide : ""
                  } ${previewFlush ? styles.previewFrameInnerFlush : ""}`.trim()}
                >
                  {view === "preview" ? preview : null}
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
                  <code>{code}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {children ? <div className={styles.rows}>{children}</div> : null}
      </div>
    </div>
  );
}

type OverviewShowcaseRowProps = {
  children: ReactNode;
  description: string;
  icon: ReactNode;
  iconClassName?: string;
  title: string;
};

export function OverviewShowcaseRow({
  children,
  description,
  icon,
  iconClassName,
  title,
}: OverviewShowcaseRowProps) {
  return (
    <section className={styles.showcaseRow}>
      <div className={styles.showcaseIntro}>
        <div className={`${styles.showcaseIcon} ${iconClassName ?? ""}`.trim()}>
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

export function OverviewDemo({ children }: { children: ReactNode }) {
  return <div className={styles.demo}>{children}</div>;
}

export function OverviewStateItem({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className={styles.stateItem}>
      <p className={styles.stateLabel}>{label}</p>
      {children}
    </div>
  );
}
