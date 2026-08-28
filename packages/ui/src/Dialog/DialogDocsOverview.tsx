import { useState, type ReactNode } from "react";

import { Button } from "../Button/Button";
import { Dialog, DialogPopup, DialogTrigger } from "./Dialog";
import styles from "./DialogDocsOverview.module.css";

const previewCode = `<Dialog>
  <DialogTrigger render={<Button />}>Open dialog</DialogTrigger>
  <DialogPopup
    title="Example dialog"
    description="A reusable dialog with a title, description, and footer."
    footer={<Button>Continue</Button>}
  >
    <p>Dialog body content goes here.</p>
  </DialogPopup>
</Dialog>`;

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

function ExampleDialog({
  children,
  description,
  footer,
  title,
  triggerLabel,
}: {
  children: ReactNode;
  description: string;
  footer?: ReactNode;
  title: string;
  triggerLabel: string;
}) {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>{triggerLabel}</DialogTrigger>
      <DialogPopup description={description} footer={footer} title={title}>
        {children}
      </DialogPopup>
    </Dialog>
  );
}

export function DialogDocsOverview() {
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
              <svg
                aria-hidden="true"
                className={styles.heroBadgeIcon}
                viewBox="0 0 24 24"
              >
                <rect x="3.5" y="5" width="17" height="14" rx="2" />
                <path d="M3.5 9h17" />
              </svg>
            </div>

            <p className={styles.eyebrow}>Component</p>
            <h1 className={styles.title}>Modal Dialog</h1>

            <div className={styles.usageBlock}>
              <h2 className={styles.sectionTitle}>Usage</h2>
              <p className={styles.description}>
                Dialogs focus the user on a task or message without leaving the
                current screen. Use a trigger to open the modal, then dismiss
                it with the close button, overlay, or Escape.
              </p>
            </div>
          </div>

          <div className={styles.previewCard}>
            <div className={styles.previewHeader}>
              <h2 className={styles.previewTitle}>
                {view === "preview" ? "Live preview" : "Code preview"}
              </h2>
              <div className={styles.previewActions}>
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
                }`}
              >
                <div className={styles.previewFrameInner}>
                  {view === "preview" ? (
                    <ExampleDialog
                      description="A reusable dialog with a title, description, and footer."
                      footer={<Button>Continue</Button>}
                      title="Example dialog"
                      triggerLabel="Open dialog"
                    >
                      <p>Dialog body content goes here.</p>
                    </ExampleDialog>
                  ) : null}
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
            description="A title, description, and body. Open from a trigger and dismiss with close, overlay, or Escape."
            icon={
              <svg
                aria-hidden="true"
                className={styles.iconSvg}
                viewBox="0 0 24 24"
              >
                <rect x="4" y="6" width="16" height="12" rx="2" />
                <path d="M8 10h8" />
                <path d="M8 13h5" />
              </svg>
            }
            iconClassName={styles.showcaseIconBasic}
            title="Basic dialog"
          >
            <div className={styles.demoButtons}>
              <ExampleDialog
                description="A focused message with a title and supporting description."
                title="Basic dialog"
                triggerLabel="Open basic dialog"
              >
                <p>Dialog body content goes here.</p>
              </ExampleDialog>
            </div>
          </ShowcaseRow>

          <ShowcaseRow
            description="Keep primary actions in the footer so the close control stays available and the task can complete."
            icon={
              <svg
                aria-hidden="true"
                className={styles.iconSvg}
                viewBox="0 0 24 24"
              >
                <rect x="4" y="5" width="16" height="14" rx="2" />
                <path d="M4 15h16" />
                <path d="M14 18h4" />
              </svg>
            }
            iconClassName={styles.showcaseIconFooter}
            title="With footer"
          >
            <div className={styles.demoButtons}>
              <ExampleDialog
                description="Footer actions sit below the body and remain visible while content stays in view."
                footer={<Button>Continue</Button>}
                title="Dialog with footer"
                triggerLabel="Open dialog with footer"
              >
                <p>Use the footer for the primary action.</p>
              </ExampleDialog>
            </div>
          </ShowcaseRow>

          <ShowcaseRow
            description="When content is taller than the viewport, the body scrolls inside the dialog. The header, close control, and footer stay in place."
            icon={
              <svg
                aria-hidden="true"
                className={styles.iconSvg}
                viewBox="0 0 24 24"
              >
                <path d="M8 7h8" />
                <path d="M8 12h8" />
                <path d="M8 17h5" />
                <path d="M17 15v5" />
                <path d="M15 18l2 2 2-2" />
              </svg>
            }
            iconClassName={styles.showcaseIconScroll}
            title="Long content"
          >
            <div className={styles.demoButtons}>
              <ExampleDialog
                description="The dialog body scrolls when the content is taller than the available space."
                footer={<Button>Continue</Button>}
                title="Long content"
                triggerLabel="Open long content"
              >
                {Array.from({ length: 16 }, (_, index) => (
                  <p key={index}>
                    Placeholder paragraph {index + 1}. This copy exists to
                    demonstrate scrolling inside the dialog.
                  </p>
                ))}
              </ExampleDialog>
            </div>
          </ShowcaseRow>
        </div>
      </div>
    </div>
  );
}
